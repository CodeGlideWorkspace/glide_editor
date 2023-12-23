import { reduceTree } from 'remote:glide_components/utils'

import { nodeSelector } from './node'

/**
 * 获取组件选项
 *
 * @returns {Array<{ label, value }>} 组件选项
 */
export function componentOptionsSelector(state) {
  if (!state.node) {
    return []
  }

  return reduceTree(
    state.node,
    (result, item) => {
      result.push({ label: item.alias || item.ref, value: item.code })
      return result
    },
    [],
  )
}

/**
 * 获取选中的组件
 *
 * @returns {Node} 选中的组件
 */
export function selectNodeSelector(state) {
  return nodeSelector(state.selectCode)(state) || state.node
}
