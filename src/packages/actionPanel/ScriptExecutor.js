/**
 * 值返回
 */
function result(...params) {
  return params
}

class ScriptExecutor {
  /**
   * 创建JS函数模版
   *
   * @param {Array<String>} paramNames 脚本参数命名列表
   *
   * @returns {String}
   */
  createTemplate(paramNames) {
    return `
    export default function execute(${paramNames.join(', ')}) {
      // result的参数会作为后续执行过程的参数
      return result()
    }
    `
  }

  /**
   * 创建用户脚本
   *
   * @param {Script} script 脚本对象
   * @param {Object<any>} context 脚本执行上下文
   * @param {Array<String>} paramNames 脚本参数命名列表
   *
   * @returns {Function}
   */
  createFunc(script, context, paramNames = []) {
    if (!script) {
      return
    }

    const currentParamNames = paramNames.slice()
    currentParamNames.unshift('global')

    // 创建脚本执行器
    // eslint-disable-next-line no-new-func
    return new Function(
      currentParamNames.join(','),
      `
      var context = new Proxy(global, {
        get(target, prop) {
          if (prop in target) {
            return target[prop]
          }
          return undefined
        }
      })
      with (context) {
        ${script.data.target}
      }
      `,
    )
  }

  /**
   * 用户脚本执行函数
   *
   * @param {Script} script 脚本对象
   * @param {Object<any>} context 脚本执行上下文
   * @param {Array<String>} paramNames 脚本参数命名列表
   * @param {Array<any>} params 脚本执行参数
   *
   * @returns {Array<any>}
   */
  execute(script, context, paramNames, params) {
    const func = this.createFunc(script, context, paramNames)
    if (!func) {
      return params
    }
    return func({ context, result }, ...params)
  }
}

export default ScriptExecutor
