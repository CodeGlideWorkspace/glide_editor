/**
 * 基础节点操作模型
 *
 * @type Node 节点对象
 *
 * @property {String} code 节点编码
 * @property {String} name 节点名称
 * @property {String} ref 节点引用名称
 * @property {String} alias 节点别名
 * @property {Object} configValue 节点配置值
 * @property {Object} styleValue 节点样式值
 * @property {Array<Action>} actions 节点动作配置
 * @property {Object{ [slotName]: Array<Node> }} slots 节点插槽子节点
 * @property {Array<Node>} children 子节点列表
 *
 */

import { uuid } from 'remote:glide_components/utils'
import { nodeSelector, findParentNode } from '../selector/node'

/**
 * 创建基本节点类型
 *
 * @param {String} name 节点名称
 *
 * @returns {Node} 返回节点信息
 */
function createNode(name = '', operator) {
  return {
    code: `${name.replace(/^\$\$/, '')}_${uuid()}`,
    name,
    // 插槽子节点
    slots: {},
    // 子节点
    children: [],
    // 存储其他配置信息
    config: {},
  }
}

/**
 * 更新节点基本信息
 *
 * @param {String} payload.code 节点code
 * @param {String} payload.key 节点配置键名
 * @param {Any} payload.value 节点配置值
 *
 * @returns {void}
 */
function updateNode(payload, operator) {
  const { code, key, value } = payload
  operator.set((state) => {
    const node = nodeSelector(code)(state)
    if (!node) {
      return
    }

    node.config[key] = value
  })
}

/**
 * 在尾部添加节点
 *
 * @param {Node} payload.node 节点信息
 * @param {?String} payload.slotName 可选，插槽名字，不传则放置于子节点
 * @param {?String} payload.parentCode 可选，父节点code，不传则添加到根节点上
 *
 * @returns {void}
 */
function appendNode(payload, operator) {
  const { node, parentCode, slotName } = payload
  operator.set((state) => {
    const parentNode = nodeSelector(parentCode)(state) || state.node
    if (!slotName) {
      parentNode.children.push(node)
      return
    }

    if (!parentNode.slots[slotName]) {
      parentNode.slots[slotName] = []
    }
    parentNode.slots[slotName].push(node)
  })
}

/**
 * 在首部添加节点
 *
 * @param {Node} payload.node 节点信息
 * @param {?String} payload.slotName 可选，插槽名字，不传则放置于子节点
 * @param {?String} payload.parentCode 可选，父节点code，不传则添加到根节点上
 *
 * @returns {void}
 */
function prependNode(payload, operator) {
  const { node, parentCode, slotName } = payload
  operator.set((state) => {
    const parentNode = nodeSelector(parentCode)(state) || state.node
    if (!slotName) {
      parentNode.children.unshift(node)
      return
    }
    if (!parentNode.slots[slotName]) {
      parentNode.slots[slotName] = []
    }
    parentNode.slots[slotName].unshift(node)
  })
}

/**
 * 插入节点
 *
 * @param {Node} payload.node 节点信息
 * @param {?String} payload.slotName 可选，插槽名字，不传则放置于子节点
 * @param {?String} payload.parentCode 可选，父节点code，不传则添加到根节点上
 * @param {Number} payload.index 插入位置
 *
 * @returns {void}
 */
function insertNode(payload, operator) {
  const { node, parentCode, slotName, index } = payload
  operator.set((state) => {
    const parentNode = nodeSelector(parentCode)(state) || state.node
    if (!slotName) {
      parentNode.children.splice(index, 0, node)
      return
    }
    if (!parentNode.slots[slotName]) {
      parentNode.slots[slotName] = []
    }
    parentNode.slots[slotName].splice(index, 0, node)
  })
}

/**
 * 删除节点
 *
 * @param {String} code 节点code
 *
 * @returns {void}
 */
function removeNode(code, operator) {
  operator.set((state) => {
    const { node: parentNode, slotName } = findParentNode(state.node, code) || {}
    if (!parentNode) {
      return
    }

    if (!slotName) {
      const index = parentNode.children.findIndex((child) => child.code === code)
      parentNode.children.splice(index, 1)
      return
    }

    if (!parentNode.slots[slotName]) {
      parentNode.slots[slotName] = []
    }

    const slotIndex = parentNode.slots[slotName].findIndex((child) => child.code === code)
    parentNode.slots[slotName].splice(slotIndex, 1)
  })
}

/**
 * 更新节点信息
 *
 * @param {Node} node 节点信息
 *
 * @returns {void}
 */
function setNode(node, operator) {
  operator.set((state) => {
    const { node: parentNode, slotName } = findParentNode(state.node, node.code) || {}
    if (!parentNode) {
      state.node = node
      return
    }

    if (!slotName) {
      const index = parentNode.children.findIndex((child) => child.code === node.code)
      parentNode.children.splice(index, 1, node)
      return
    }

    if (!parentNode.slots[slotName]) {
      parentNode.slots[slotName] = []
    }

    const slotIndex = parentNode.slots[slotName].findIndex((child) => child.id === node.id)
    parentNode.slots[slotName].splice(slotIndex, 1, node)
  })
}

/**
 * 移动节点
 *
 * @param {String} payload.code 移动的节点code
 * @param {String} payload.targetCode 移动到的目标节点code
 * @param {String} payload.direction 移动的方向 before | after
 *
 * @returns {void}
 */
function moveNode(payload, operator) {
  const { code, targetCode, direction } = payload
  const state = operator.get()
  const moveNode = nodeSelector(code)(state)
  const { node: parentNode, slotName } = findParentNode(state.node, targetCode) || {}
  if (!parentNode) {
    return
  }

  if (!slotName) {
    const index = parentNode.children.findIndex((child) => child.code === targetCode)
    state.removeNode(code)
    state.insertNode({ node: moveNode, parentCode: parentNode.code, index: direction === 'before' ? index : index + 1 })
    return
  }

  if (!parentNode.slots[slotName]) {
    parentNode.slots[slotName] = []
  }

  const slotIndex = parentNode.slots[slotName].findIndex((child) => child.code === targetCode)
  state.removeNode(code)
  state.insertNode({
    node: moveNode,
    parentCode: parentNode.code,
    slotName,
    index: direction === 'before' ? slotIndex : slotIndex + 1,
  })
}

function node(actionCreator) {
  return {
    // 节点结构
    node: undefined,

    createNode: actionCreator(createNode),
    setNode: actionCreator(setNode),
    updateNode: actionCreator(updateNode),
    appendNode: actionCreator(appendNode),
    prependNode: actionCreator(prependNode),
    insertNode: actionCreator(insertNode),
    removeNode: actionCreator(removeNode),
    moveNode: actionCreator(moveNode),
  }
}

export default node
