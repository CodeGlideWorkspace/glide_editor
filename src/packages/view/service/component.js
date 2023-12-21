import { loadRemote } from 'remote:glide_components/Remote'

/**
 * 加载远程组件
 *
 * @param {ComponentPath} componentPaths 远程组件路径列表
 *
 * @returns
 */
export function fetchComponents(componentPaths) {
  return new Promise((resolve) => {
    let count = 0
    const result = []
    componentPaths.forEach((item) => {
      count++
      loadRemote(item.path)
        .then(({ default: _, ...module }) => {
          result.push(module)
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
