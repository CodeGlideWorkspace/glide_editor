/**
 * 编辑器Schema相关API
 *
 * @link https://zh794p7mtp.feishu.cn/wiki/Qc1kwjP4IifUzNklKEKcH5MTnWc
 *
 */

import { uuid, isArray } from 'remote:glide_components/utils'
import { nodeSelector, findParentNode } from '../selector/document'

/**
 * 节点定义
 *
 * @type Node
 *
 * @property {String} code 节点编码
 * @property {String} name 节点组件名称
 * @property {String} ref 节点名称
 * @property {Object} props 节点属性值
 * @property {Object} style 节点样式值
 * @property {Object} config 节点其他配置
 * @property {{ [slotName]: Array<Node> }} slots 节点插槽子节点
 * @property {Array<Node>} children 子节点列表
 *
 */

function createCode(name) {
  return `${name.replace(/^\$\$/, '')}_${uuid()}`
}

/**
 * 创建节点
 *
 * @returns {Node}
 */
function createNode(name) {
  const ref = name.replace(/^\$\$/, '')
  const code = createCode(`${ref}_${uuid()}`)

  return {
    code,
    name,
    ref,
    // 存储属性值
    props: {},
    // 存储样式值
    style: {},
    // 存储其他配置
    config: {},
    // 插槽子节点
    slots: {},
    // 子节点
    children: [],
  }
}

/**
 * 选择节点
 *
 * @param {String} code 节点code
 *
 * @returns {Void}
 */
function selectNode(code, operator) {
  const state = operator.get()
  const node = nodeSelector(code)(state)
  if (!node) {
    return
  }

  operator.set((state) => {
    state.selectNodeCode = code
  })
}

/**
 * 取消选择节点
 *
 * @returns {Void}
 */
function unselectNode(_, operator) {
  operator.set((state) => {
    state.selectNodeCode = null
  })
}

/**
 * 更新节点信息
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

    node[key] = value
  })
}

/**
 * 追加节点到尾部
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
      if (!isArray(parentNode.children)) {
        parentNode.children = []
      }
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
 * 追加节点到头部
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
      if (!isArray(parentNode.children)) {
        parentNode.children = []
      }
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
 * 追加节点到指定位置
 *
 * @param {Node} payload.node 节点信息
 * @param {?String} payload.slotName 可选，插槽名字，不传则放置于子节点
 * @param {?String} payload.parentCode 可选，父节点code，不传则添加到根节点上
 * @param {Number} payload.index 插入位置
 *
 * @returns {void}
 */
function appendNodeTo(payload, operator) {
  const { node, parentCode, slotName, index } = payload
  operator.set((state) => {
    const parentNode = nodeSelector(parentCode)(state) || state.node
    if (!slotName) {
      if (!isArray(parentNode.children)) {
        parentNode.children = []
      }
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
    const { node: parentNode, slotName } = findParentNode(state.node, code)
    if (!parentNode) {
      return
    }

    if (!slotName) {
      const index = parentNode.children.findIndex((child) => child.code === code)
      parentNode.children.splice(index, 1)
      return
    }

    const slotIndex = parentNode.slots[slotName].findIndex((child) => child.code === code)
    parentNode.slots[slotName].splice(slotIndex, 1)
  })
}

/**
 * 替换节点
 *
 * @param {Node} node 节点信息
 *
 * @returns {void}
 */
function replaceNode(node, operator) {
  operator.set((state) => {
    const { node: parentNode, slotName } = findParentNode(state.node, node.code)
    if (!parentNode) {
      return
    }

    if (!slotName) {
      const index = parentNode.children.findIndex((child) => child.code === node.code)
      parentNode.children.splice(index, 1, node)
      return
    }

    const slotIndex = parentNode.slots[slotName].findIndex((child) => child.id === node.id)
    parentNode.slots[slotName].splice(slotIndex, 1, node)
  })
}

/**
 * 插入到相邻节点
 *
 * @param {String} payload.node 节点信息
 * @param {String} payload.targetCode 目标节点code
 * @param {String} payload.direction 方向 before | after
 */
function insertNode(payload, operator) {
  const { node, targetCode, direction } = payload
  const state = operator.get()
  const { node: parentNode, slotName } = findParentNode(state.node, targetCode)
  if (!parentNode) {
    return
  }

  if (!slotName) {
    const index = parentNode.children.findIndex((child) => child.code === targetCode)
    state.appendNodeTo({
      node,
      parentCode: parentNode.code,
      index: direction === 'before' ? index : index + 1,
    })
    return
  }

  const slotIndex = parentNode.slots[slotName].findIndex((child) => child.code === targetCode)
  state.appendNodeTo({
    node,
    parentCode: parentNode.code,
    slotName,
    index: direction === 'before' ? slotIndex : slotIndex + 1,
  })
}

/**
 * 插入到目标节点之前
 *
 * @param {String} payload.node 节点信息
 * @param {String} payload.targetCode 目标节点code
 */
function insertNodeBefore(payload, operator) {
  const { node, targetCode } = payload
  const state = operator.get()
  state.insertNode({ node, targetCode, direction: 'before' })
}

/**
 * 插入到目标节点之后
 *
 * @param {String} payload.node 节点信息
 * @param {String} payload.targetCode 目标节点code
 */
function insertNodeAfter(payload, operator) {
  const { node, targetCode } = payload
  const state = operator.get()
  state.insertNode({ node, targetCode, direction: 'before' })
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
  state.removeNode(code)
  const { node: parentNode, slotName } = findParentNode(state.node, targetCode)
  if (!parentNode) {
    return
  }

  if (!slotName) {
    const index = parentNode.children.findIndex((child) => child.code === targetCode)
    state.appendNodeTo({
      node: moveNode,
      parentCode: parentNode.code,
      index: direction === 'before' ? index : index + 1,
    })
    return
  }

  const slotIndex = parentNode.slots[slotName].findIndex((child) => child.code === targetCode)
  state.appendNodeTo({
    node: moveNode,
    parentCode: parentNode.code,
    slotName,
    index: direction === 'before' ? slotIndex : slotIndex + 1,
  })
}

/**
 * 移动节点到目标节点之前
 *
 * @param {String} payload.code 移动的节点code
 * @param {String} payload.targetCode 移动到的目标节点code
 */
function moveNodeBefore(payload, operator) {
  const { code, targetCode } = payload
  const state = operator.get()
  state.moveNode({ code, targetCode, direction: 'before' })
}

/**
 * 移动节点到目标节点之后
 *
 * @param {String} payload.code 移动的节点code
 * @param {String} payload.targetCode 移动到的目标节点code
 */
function moveNodeAfter(payload, operator) {
  const { code, targetCode } = payload
  const state = operator.get()
  state.moveNode({ code, targetCode, direction: 'after' })
}

function document(actionCreator) {
  return {
    // 存储文档结构
    node: createNode('Document'),
    // 当前选择的节点编码
    selectNodeCode: null,

    selectNode: actionCreator(selectNode),
    unselectNode: actionCreator(unselectNode),
    createNode: actionCreator(createNode),
    replaceNode: actionCreator(replaceNode),
    updateNode: actionCreator(updateNode),
    appendNode: actionCreator(appendNode),
    prependNode: actionCreator(prependNode),
    appendNodeTo: actionCreator(appendNodeTo),
    insertNode: actionCreator(insertNode),
    insertNodeBefore: actionCreator(insertNodeBefore),
    insertNodeAfter: actionCreator(insertNodeAfter),
    removeNode: actionCreator(removeNode),
    moveNode: actionCreator(moveNode),
    moveNodeBefore: actionCreator(moveNodeBefore),
    moveNodeAfter: actionCreator(moveNodeAfter),
  }
}

export default document
