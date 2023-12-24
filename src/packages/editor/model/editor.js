import { createStore, createAction, withSelector } from 'remote:glide_components/store'

import node from './node'
import resource from './resource'

import { nodeSelector } from '../selector/node'

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
    state.selectCode = code
  })
}

/**
 * 取消选择节点
 *
 * @returns {Void}
 */
function unselectNode(_, operator) {
  operator.set((state) => {
    state.selectCode = undefined
  })
}

/**
 * 创建组件节点类型
 *
 * @param {String} name 节点名称
 *
 * @returns {Node} 返回节点信息
 */
function createEditorNode(name, operator) {
  const state = operator.get()
  const node = state.createNode(name)
  // 组件命名
  node.config.ref = name
  // 组件配置值
  node.config.property = {}
  // 组件样式值
  node.config.style = {}
  // 组件动作配置
  node.config.actions = []
  // 组件css盒模型
  node.config.cssBox = {
    width: {
      value: undefined,
      unit: 'px',
    },
    height: {
      value: undefined,
      unit: 'px',
    },
    margin: [],
    padding: [],
  }

  return node
}

/**
 * 初始化编辑器
 *
 * @returns {Void}
 */
function initialEditor(_, operator) {
  const state = operator.get()
  const node = state.createEditorNode('Page')

  state.setNode(node)
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
function appendEditorNode(payload, operator) {
  const state = operator.get()

  // TODO 真实调用插入前，需要做一些而外的检测

  state.appendNode(payload)
}

/**
 * 更新节点配置信息
 *
 * @param {String} payload.code 节点code
 * @param {String} payload.key 节点配置键名
 * @param {Any} payload.value 节点配置值
 *
 * @returns {void}
 */
function updateEditorNode(payload, operator) {
  const { code, key, value } = payload
  const state = operator.get()
  state.updateNode({ code, key, value })
}

/**
 * 更新节点批量配置信息
 *
 * @param {String} payload.code 节点code
 * @param {Object} payload.config 节点配置
 *
 * @returns {void}
 */
function batchUpdateEditorNode(payload, operator) {
  const { code, config = {} } = payload
  const state = operator.get()

  Object.keys(config).forEach((key) => {
    const value = config[key]
    state.updateNode({ code, key, value })
  })
}

function editor(set, get) {
  const actionCreator = createAction(set, get)

  return {
    // 当前选择的节点id
    selectCode: undefined,

    selectNode: actionCreator(selectNode),
    unselectNode: actionCreator(unselectNode),
    createEditorNode: actionCreator(createEditorNode),
    initialEditor: actionCreator(initialEditor),
    appendEditorNode: actionCreator(appendEditorNode),
    batchUpdateEditorNode: actionCreator(batchUpdateEditorNode),
    updateEditorNode: actionCreator(updateEditorNode),

    ...node(actionCreator),
    ...resource(actionCreator),
  }
}

const useEditor = withSelector(createStore(editor))

export default useEditor
