import { useRef, useEffect } from 'react'

import ScriptExecutor from './ScriptExecutor'

class Action {
  /**
   * 组件实例存储
   *
   * @type {Object<{ [code]: Ref }>}
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

  getScript(scriptName) {
    if (!scriptName) {
      return
    }

    return this.scripts.find((script) => script.name === scriptName)
  }

  /**
   * 创建多个行为事件
   *
   * @param {String} code 组件的唯一编码
   * @param {Array<Method>} actions 方法列表
   * @param {EventDefinition} eventDefinition 事件定义
   */
  createEvent(code, actions, eventDefinition) {
    return (...params) => {
      actions.forEach(({ componentCode, scriptName, apiName }) => {
        const ref = this.refs[componentCode]
        if (!ref) {
          return
        }

        const method = ref[apiName]
        if (!method) {
          return
        }

        const script = this.getScript(scriptName)
        const result = this.scriptExecutor.execute(script, {}, eventDefinition.paramNames, params)
        method(...result)
      })
    }
  }

  /**
   * 合成行为事件，输出对应的渲染属性
   *
   * @param {String} code 组件的唯一编码
   * @param {Array<Action>} actions 行为列表
   * @param {Array<EventDefinition>} options.eventDefinitions 事件定义
   *
   * @returns {Object<{ [eventName]: Handle }>}
   */
  render(code, actions = [], options = {}) {
    const { eventDefinitions } = options

    return actions.reduce((props, action) => {
      const { eventName, actions } = action
      const eventDefinition = eventDefinitions.find((item) => item.name === eventName)
      if (!eventDefinition) {
        return props
      }

      props[eventName] = this.createEvent(code, actions, eventDefinition)
      return props
    }, {})
  }

  /**
   * 行为注册事件
   *
   * @param {String} code 组件的唯一编码
   * @param {Ref} ref 组件的实例引用
   * @param {Array<Action>} actions 行为列表
   *
   * @returns {Object<{ [eventName]: Handle }>}
   */
  register(code, ref) {
    this.refs[code] = ref
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
