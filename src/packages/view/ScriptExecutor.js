/**
 * 值返回
 */
function result(...params) {
  return params
}

class ScriptExecutor {
  getParamNames(params) {
    return Object.keys(params).reduce((result, name) => {
      result.push(name)
      return result
    }, [])
  }

  // TODO 实现逻辑
  createTSTemplate() {}

  /**
   * 创建JS函数模版
   *
   * @param {Array<any>} params 脚本执行参数
   *
   * @returns {String}
   */
  createJSTemplate(params) {
    const paramNames = this.getParamNames(params)
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
   * @param {Array<any>} params 脚本执行参数
   *
   * @returns {Function}
   */
  createFunc(script, context, params) {
    const paramNames = this.getParamNames(params)
    paramNames.unshift('global')

    // 创建脚本执行器
    // eslint-disable-next-line no-new-func
    return new Function(
      paramNames.join(','),
      `
      with (global) {
        ${script.target}
      }
      `,
    )
  }

  /**
   * 用户脚本执行函数
   *
   * @param {Script} script 脚本对象
   * @param {Object<any>} context 脚本执行上下文
   * @param {Array<any>} params 脚本执行参数
   *
   * @returns {Array<any>}
   */
  execute(script, context, params) {
    const func = this.createFunc(script, context, params)
    if (!func) {
      return params
    }
    return func({ context, result }, ...params)
  }
}

export default ScriptExecutor
