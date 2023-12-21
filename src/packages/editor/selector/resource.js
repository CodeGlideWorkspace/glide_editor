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
  }, [])
}
