import { useRef, useEffect } from 'react'

import ScriptExecutor from './ScriptExecutor'

/**
 * 方法结构定义
 *
 * @type {Object} Method
 *
 * @property {String} componentCode 组件名称
 * @property {String} scriptCode 挂载的转换脚本名称
 * @property {String} methodCode 行为名称
 *
 * 动作结构定义
 *
 * @type {Object} Action
 *
 * @property {String} eventCode 事件名称
 * @property {Array<Action>} methods 方法列表
 */

class Action {
  /**
   * 组件实例存储
   *
   * @type {Object<{ [name]: Ref }>}
   */
  refs = {}

  /**
   * 脚本对象列表
   */
  scripts = []

  /**
   * 存储事件定义
   */

  /**
   * 脚本执行器
   */
  scriptExecutor = new ScriptExecutor()

  setScripts(scripts) {
    this.scripts = scripts
  }

  getScript(scriptCode) {
    return this.scripts.find((script) => script.code === scriptCode)
  }

  /**
   * 创建多个行为事件
   *
   * @param {String} name 组件的命名，组件唯一标识
   * @param {Array<Method>} methods 方法列表
   */
  createEvent(name, methods) {
    return (...params) => {
      methods.forEach(({ componentCode, scriptCode, methodCode }) => {
        const ref = this.refs[componentCode]
        if (!ref) {
          return
        }

        const method = ref[methodCode]
        if (!method) {
          return
        }

        const script = this.getScript(scriptCode)
        method(...this.scriptExecutor.execute(script, {}, params))
      })
    }
  }

  /**
   * 合成行为事件，输出对应的渲染属性
   *
   * @param {String} name 组件的命名，组件唯一标识
   * @param {Array<Action>} actions 行为列表
   *
   * @returns {Object<{ [eventCode]: Handle }>}
   */
  render(name, actions = []) {
    return actions.reduce((props, action) => {
      const { eventCode, methods } = action
      props[eventCode] = this.createEvent(name, methods)
      return props
    }, {})
  }

  /**
   * 行为注册事件
   *
   * @param {String} name 组件的命名，组件唯一标识
   * @param {Ref} ref 组件的实例引用
   * @param {Array<Action>} actions 行为列表
   *
   * @returns {Object<{ [eventName]: Handle }>}
   */
  register(name, ref) {
    this.refs[name] = ref
  }
}

export default function useAction({ scripts }) {
  const action = useRef(null)

  if (!action.current) {
    action.current = new Action()
  }

  useEffect(() => {
    action.current.setScripts(scripts)
  }, [scripts])

  return action.current
}
