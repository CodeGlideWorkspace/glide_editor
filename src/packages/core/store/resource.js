import { loadRemote } from 'remote:glide_components/Remote'

import { resourcesSelector } from '../selector/resource'

/**
 * 加载资源定义
 *
 * @param {Array<Resource>} resources 资源列表
 *
 * @returns {Promise<void>}
 */
export function loadResourceDefinitions(resources) {
  return new Promise((resolve) => {
    let count = 0
    const result = []
    resources.forEach((item) => {
      if (!item.path) {
        return
      }

      count++
      loadRemote(item.path)
        .then(({ default: _, ...module }) => {
          result.push({
            type: item.type,
            name: item.name,
            module,
          })
        })
        .finally(() => {
          count--
          if (count <= 0) {
            resolve(result)
          }
        })
    })
  })
}

/**
 * 资源定义
 *
 * @type Resource
 *
 * @property {String} type 资源类型
 * @property {String} name 资源名称
 * @property {?ReactElement} Icon 资源图标
 * @property {?String} title 资源标题
 * @property {?String} description 资源描述
 * @property {?String} tip 资源提示信息
 * @property {?String} path 资源路径
 * @property {?String} exportName 资源导出名称
 * @property {?Any} data 资源数据
 *
 */

/**
 * 注册资源
 *
 * @param {Resource} resource 资源
 *
 * @returns {Void}
 */
function registerResource(resource, operator) {
  const resources = resourcesSelector(resource.type)(operator.get())
  const isExist = resources.some((item) => item.name === resource.name)
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
 * 加载资源定义
 *
 * @param {String} type 资源类型
 *
 * @returns {Void}
 */
async function loadResource(type, operator) {
  const resources = resourcesSelector(type)(operator.get())
  if (!resources.length) {
    return
  }

  const resourceDefinitions = await loadResourceDefinitions(resources)
  operator.set((state) => {
    state.resourceDefinitions = resourceDefinitions
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
    loadResource: actionCreator(loadResource),
  }
}

export default resource
