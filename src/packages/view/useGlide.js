import { useRef } from 'react'
import { Scheduler, isFunction, isString } from 'remote:glide_components/utils'
import { useMount } from 'remote:glide_components/hooks'

class GlideCode {
  // 调度器实例
  scheduler = new Scheduler()

  render(code, dependencies) {
    // 存储事件句柄
    const handlers = {}
    // 是否已经加载
    const isLoaded = {}

    return {
      /**
       * 组件注册依赖订阅方法
       *
       * @param {String} name 事件名称，可以不传，默认为load，支持load | update
       * @param {Function} handler 事件句柄
       *
       * @returns {Void}
       */
      subscribe: (name, handler) => {
        const eventName = isString(name) ? name : 'load'
        const eventHandler = isFunction(name) ? name : handler

        if (!isFunction(eventHandler)) {
          return
        }

        if (!['load', 'update'].includes(eventName)) {
          throw new Error(`无效的订阅名称: ${eventName}，支持load | update`)
        }

        handlers[eventName] = eventHandler
        if (this.scheduler.has(code)) {
          return
        }
        this.scheduler.subscribe(
          code,
          (params) => {
            if (isLoaded[code] && isFunction(handlers.update)) {
              return handlers.update(params)
            }

            isLoaded[code] = true
            return handlers.load(params)
          },
          dependencies,
        )
      },
      /**
       * 组件注销依赖订阅方法
       */
      unsubscribe: (name) => {
        delete handlers[name]
        const count = Object.keys(handlers).length
        if (!count) {
          this.scheduler.unsubscribe(code)
        }
      },
      /**
       * 发布组件更新
       *
       * @param {Object} params 更新参数
       *
       * @returns {Void}
       */
      publish: (params) => {
        this.scheduler.publish(code, params)
      },
    }
  }
}

export default function useGlide() {
  const glide = useRef(null)

  useMount(() => {
    glide.current.scheduler.publish()
  })

  if (!glide.current) {
    glide.current = new GlideCode()
  }

  return glide.current
}
