/**
 * 获取资源
 *
 * @param {String} name 资源名字
 *
 * @returns Resource | undefined
 */
export function resourceSelector(name) {
  return function (state) {
    return state.resources.find((resource) => resource.name === name)
  }
}

/**
 * 获取指定类型的资源列表，不包含域下资源
 *
 * @param {String} type 资源类型
 *
 * @returns {Resource[]}
 */
export function resourcesSelectorByType(type) {
  return function (state) {
    return state.resources.filter((resource) => resource.type === type && !resource.scope)
  }
}

/**
 * 获取指定域的资源列表
 *
 * @param {String} payload.type 资源类型
 * @param {String} payload.scope 资源域
 *
 * @returns {Resource[]}
 */
export function resourcesSelectorByScope(payload) {
  const { type, scope } = payload
  return function (state) {
    return state.resources.filter((resource) => resource.type === type && resource.scope === scope)
  }
}

/**
 * 获取资源配置定义
 *
 * @param {String} name 资源名称
 *
 * @returns ResourceDefinition | undefined
 */
export function resourceDefinitionSelector(name) {
  return function (state) {
    return state.resourceDefinitions.find((resourceDefinition) => resourceDefinition.name === name)
  }
}

/**
 * 获取指定类型的资源定义
 *
 * @param {String} type 资源类型
 *
 * @returns {ResourceDefinition[]}
 */
export function resourceDefinitionsSelectorByType(type) {
  return function (state) {
    return state.resourceDefinitions.filter((resourceDefinition) => resourceDefinition.type === type)
  }
}

/**
 * 获取指定域的资源定义
 *
 * @param {String} payload.type 资源类型
 * @param {String} payload.scope 资源域
 *
 * @returns {ResourceDefinition[]}
 */
export function resourceDefinitionsSelectorByScope(payload) {
  return function (state) {
    return state.resourceDefinitions.filter(
      (resourceDefinition) => resourceDefinition.type === payload.type && resourceDefinition.scope === payload.scope,
    )
  }
}
