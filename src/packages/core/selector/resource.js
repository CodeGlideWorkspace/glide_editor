/**
 * 获取资源图谱
 *
 * @param {String} type 资源类型
 *
 * @returns Object<{ name: resource }>
 */
export function resourcesSelector(type) {
  return function (state) {
    return state.resources.filter((resource) => resource.type === type)
  }
}

/**
 * 获取资源配置定义
 *
 * @param {String} name 资源名称
 *
 * @returns ResourceDefinition
 */
export function resourceDefinitionSelector(name) {
  return function (state) {
    const resourceDefinition = state.resourceDefinitions.find((resourceDefinition) => resourceDefinition.name === name)
    if (resourceDefinition) {
      return resourceDefinition.module
    }
  }
}

/**
 * 获取一个种类的资源定义
 *
 * @param {String} type 资源类型
 *
 * @returns {Array<ResourceDefinition>}
 */
export function resourceDefinitionsSelector(type) {
  return function (state) {
    return state.resourceDefinitions
      .filter((resourceDefinition) => resourceDefinition.type === type)
      .map((resourceDefinition) => resourceDefinition.module)
  }
}
