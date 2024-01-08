import { findTree, reduceTree } from 'remote:glide_components/utils'

export function findParentNode(node, code) {
  let matchedSlotName
  const matchedNode = findTree(node, (n) => {
    // 在插槽中查找子节点
    const isMatched = Object.keys(n.slots || {}).some((slotName) => {
      const isExist = n.slots[slotName]?.some((child) => child.code === code)
      if (isExist) {
        matchedSlotName = slotName
      }
      return isExist
    })

    // 在插槽中未找到，则到子节点中查找
    return isMatched || n.children?.some((child) => child.code === code)
  })

  if (!matchedNode) {
    return {}
  }

  return { node: matchedNode, slotName: matchedSlotName }
}

/**
 * 获取节点信息
 *
 * @param {String} code 节点code
 *
 * @returns {Node} 节点信息
 */
export function nodeSelector(code) {
  return function (state) {
    return findTree(state.node, (item) => item.code === code)
  }
}

/**
 * 获取父节点信息
 *
 * @param {String} code 节点code
 *
 * @returns {Node} 父节点信息
 */
export function parentNodeSelector(code) {
  return function (state) {
    const { node } = findParentNode(state.node, code)
    return node
  }
}

/**
 * 获取选中的组件
 *
 * @returns {Node} 选中的组件
 */
export function selectNodeSelector(state) {
  return nodeSelector(state.selectCode)(state) || state.node
}

/**
 * 获取当前编辑器的所有节点
 *
 * @returns {Array<Node>} 节点列表
 */
export function nodesSelector(state) {
  return reduceTree(
    state.node,
    (result, node) => {
      result.push(node)
      return result
    },
    [],
  )
}
