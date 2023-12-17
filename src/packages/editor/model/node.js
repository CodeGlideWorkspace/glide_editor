/**
 * 基础节点操作模型
 */

import { uuid, findTree } from 'remote:glide_components/utils'

function findNode(node, id) {
  return findTree(node, (n) => n.id === id)
}

function findParentNode(node, id) {
  return findTree(node, (n) => {
    return n.children.some((child) => child.id === id)
  })
}

/**
 * 获取节点
 *
 * @param {String} id 节点ID
 *
 * @returns {Node} 返回节点信息
 */
function getNode(id, operator) {
  return findNode(operator.get().node, id)
}

/**
 * 获取父节点
 *
 * @param {String} id 节点ID
 *
 * @returns {Node} 返回节点信息
 */
function getParentNode(id, operator) {
  return findParentNode(operator.get().node, id)
}

/**
 * 在尾部添加节点
 *
 * @param {Node} payload.node 节点信息
 * @param {?String} payload.parentId 可选，父节点ID，不传则添加到根节点上
 *
 * @returns {void}
 */
function appendNode(payload, operator) {
  const { node, parentId } = payload
  operator.set((state) => {
    const parentNode = findNode(state.node, parentId) || state.node
    parentNode.children.push(node)
  })
}

/**
 * 在首部添加节点
 *
 * @param {Node} payload.node 节点信息
 * @param {?String} payload.parentId 可选，父节点ID，不传则添加到根节点上
 *
 * @returns {void}
 */
function prependNode(payload, operator) {
  const { node, parentId } = payload
  operator.set((state) => {
    const parentNode = findNode(state.node, parentId) || state.node
    parentNode.children.unshift(node)
  })
}

/**
 * 插入节点
 *
 * @param {Node} payload.node 节点信息
 * @param {?String} payload.parentId 可选，父节点ID，不传则添加到根节点上
 * @param {Number} payload.index 插入位置
 *
 * @returns {void}
 */
function insertNode(payload, operator) {
  const { node, parentId, index } = payload
  operator.set((state) => {
    const parentNode = findNode(state.node, parentId) || state.node
    parentNode.children.splice(index, 0, node)
  })
}

/**
 * 删除节点
 *
 * @param {String} id 节点id
 *
 * @returns {void}
 */
function removeNode(id, operator) {
  operator.set((state) => {
    const parentNode = findParentNode(state.node, id)
    if (!parentNode) {
      return
    }
    const index = parentNode.children.findIndex((child) => child.id === id)
    parentNode.children.splice(index, 1)
  })
}

/**
 * 更新节点信息
 *
 * @param {Node} node 节点信息
 *
 * @returns {void}
 */
function updateNode(node, operator) {
  operator.set((state) => {
    const parentNode = findParentNode(state.node, node.id)
    if (!parentNode) {
      return
    }

    const index = parentNode.children.findIndex((child) => child.id === node.id)
    parentNode.children.splice(index, 1, node)
  })
}

/**
 * 移动节点
 *
 * @param {String} payload.id 移动的节点ID
 * @param {String} payload.targetId 移动到的目标节点ID
 * @param {String} payload.direction 移动的方向 before | after
 *
 * @returns {void}
 */
function moveNode(payload, operator) {
  const { id, targetId, direction } = payload
  const state = operator.get()
  const moveNode = state.getNode(id)
  const parentNode = state.getParentNode(targetId)
  const index = parentNode.children.findIndex((child) => child.id === targetId)

  state.removeNode(id)
  state.insertNode({ node: moveNode, parentId: parentNode.id, index: direction === 'before' ? index : index + 1 })
}

function node(actionCreator) {
  return {
    // 存储页面节点树
    node: {
      id: uuid(),
      children: [],
    },

    getNode: actionCreator(getNode),
    getParentNode: actionCreator(getParentNode),
    appendNode: actionCreator(appendNode),
    prependNode: actionCreator(prependNode),
    insertNode: actionCreator(insertNode),
    removeNode: actionCreator(removeNode),
    updateNode: actionCreator(updateNode),
    moveNode: actionCreator(moveNode),
  }
}

export default node
