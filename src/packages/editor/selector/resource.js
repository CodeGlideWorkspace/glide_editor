import { nodeSelector } from './node'

/**
 * 获取配置项映射表
 */
export function itemPathMapSelector(state) {
  return state.items.reduce((result, item) => {
    result[item.name] = item
    return result
  }, {})
}

/**
 * 获取脚本选项
 */
export function scriptOptionsSelector(state) {
  return state.scripts.reduce((result, item) => {
    result.push({ label: item.title, value: item.name })
    return result
  }, [])
}

/**
 * 获取组件映射表
 */
export function componentPathMapSelector(state) {
  return state.componentPaths.reduce((result, item) => {
    result[item.name] = item
    return result
  }, {})
}

/**
 * 获取组件定义
 *
 * @param {String} name 组件名称
 *
 * @returns {Component} 组件定义
 */
export function componentSelector(name) {
  return function (state) {
    return state.components.find((item) => {
      return item?.config?.name === name
    })
  }
}

/**
 * 通过组件编码获取组件定义
 *
 * @param {String} code 组件编码
 *
 * @returns {Component} 组件定义
 */
export function componentSelectorByCode(code) {
  return function (state) {
    const node = nodeSelector(code)(state)
    if (!node) {
      return
    }

    return componentSelector(node.name)(state)
  }
}

/**
 * 获取组件定义映射表
 */
export function componentMapSelector(state) {
  return state.components.reduce((result, item) => {
    if (!item?.config) {
      return result
    }

    result[item.config.name] = item

    return result
  }, {})
}
