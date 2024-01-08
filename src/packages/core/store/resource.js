/**
 * 管理整个编辑器的所需资源，修改模块请更新文档
 *
 * @link https://zh794p7mtp.feishu.cn/wiki/GNiSwBERCit1sdkRE4ncafPxnOc
 *
 */

import { loadRemote } from 'remote:glide_components/Remote'

function loadResourceDefinition(resource) {
  return loadRemote(resource.path).then(({ default: _, ...module }) => {
    return {
      type: resource.type,
      scope: resource.scope,
      name: resource.name,
      module,
    }
  })
}

function loadResourceDefinitions(resources) {
  let counter = 0
  const result = []

  return new Promise((resolve) => {
    resources.forEach((resource) => {
      counter++
      loadResourceDefinition(resource)
        .then((definition) => {
          result.push(definition)
        })
        .finally(() => {
          counter--
          if (counter <= 0) {
            resolve(result)
          }
        })
    })
  })
}

/**
 * 注册资源
 *
 * @param {Resource} resource 资源
 *
 * @returns {Void}
 */
function registerResource(resource, operator) {
  const state = operator.get()
  const isExist = state.resources.some((item) => item.name === resource.name)
  if (isExist) {
    return
  }

  operator.set((state) => {
    state.resources.push(resource)
  })
}

/**
 * 批量注册资源
 *
 * @param {Array<Resource>} resources 资源列表
 *
 * @returns {Void}
 */
function registerResources(resources, operator) {
  const state = operator.get()
  resources.forEach((resource) => {
    state.registerResource(resource)
  })
}

/**
 * 加载所有资源定义
 *
 * @returns {Void}
 */
async function loadResources(_, operator) {
  const state = operator.get()
  const resources = state.resources.filter((resource) => {
    return !!resource.path
  })
  if (!resources.length) {
    return
  }

  const resourceDefinitions = await loadResourceDefinitions(resources)
  operator.set((state) => {
    state.resourceDefinitions = resourceDefinitions
  })
}

/**
 * 加载指定名字的资源定义
 *
 * @param {String} name 资源名称
 *
 * @returns {Void}
 */
async function loadResourceByName(name, operator) {
  const state = operator.get()
  const isLoaded = state.resourceDefinitions.some((resourceDefinition) => {
    return resourceDefinition.name === name
  })
  if (isLoaded) {
    return
  }

  const resource = state.resources.find((resource) => resource.name === name)
  if (!resource) {
    return
  }

  const resourceDefinition = await loadResourceDefinition(resource)
  operator.set((state) => {
    state.resourceDefinitions.push(resourceDefinition)
  })
}

/**
 * 加载指定类型的资源定义
 *
 * @param {String} type 资源类型
 *
 * @returns {Void}
 */
async function loadResourceByType(type, operator) {
  const state = operator.get()
  const resources = state.resources.filter((resource) => {
    if (resource.type !== type) {
      return false
    }

    const isLoaded = state.resourceDefinitions.some((resourceDefinition) => {
      return resourceDefinition.name === resource.name
    })

    return !isLoaded
  })

  if (!resources.length) {
    return
  }

  const resourceDefinitions = await loadResourceDefinitions(resources)
  operator.set((state) => {
    state.resourceDefinitions.push(...resourceDefinitions)
  })
}

/**
 * 加载指定域的资源定义
 *
 * @param {String} payload.type 资源类型
 * @param {String} payload.scope 资源域
 *
 * @returns {Void}
 */
async function loadResourceByScope(payload, operator) {
  const { type, scope } = payload
  const state = operator.get()
  const resources = state.resources.filter((resource) => {
    if (resource.type !== type || resource.scope !== scope) {
      return false
    }

    const isLoaded = state.resourceDefinitions.some((resourceDefinition) => {
      return resourceDefinition.name === resource.name
    })

    return !isLoaded
  })

  if (!resources.length) {
    return
  }

  const resourceDefinitions = await loadResourceDefinitions(resources)
  operator.set((state) => {
    state.resourceDefinitions.push(...resourceDefinitions)
  })
}

function resource(actionCreator) {
  return {
    // 资源列表 Resource
    resources: [],
    // 资源定义
    resourceDefinitions: [],

    registerResource: actionCreator(registerResource),
    registerResources: actionCreator(registerResources),
    loadResources: actionCreator(loadResources),
    loadResourceByName: actionCreator(loadResourceByName),
    loadResourceByType: actionCreator(loadResourceByType),
    loadResourceByScope: actionCreator(loadResourceByScope),
  }
}

export default resource
