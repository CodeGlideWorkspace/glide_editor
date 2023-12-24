import { createStore, createAction, withSelector } from 'remote:glide_components/store'

import node from './node'
import config from './config'
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
  node.ref = name
  node.configValue = {}
  node.styleValue = {}
  node.actions = []

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
 * 更新节点基本信息
 *
 * @param {String} payload.code 节点code
 * @param {String} payload.config 节点配置
 *
 * @returns {void}
 */
function updateEditorNode(payload, operator) {
  const state = operator.get()
  state.updateNode(payload)
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
    updateEditorNode: actionCreator(updateEditorNode),

    ...node(actionCreator),
    ...config(actionCreator),
    ...resource(actionCreator),
  }
}

const useEditor = withSelector(createStore(editor))

export default useEditor
