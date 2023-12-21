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
 * 创建空页面
 *
 * @returns {Void}
 */
function createPageNode(_, operator) {
  const state = operator.get()
  const node = state.createNode('Page')
  state.setNode(node)
}

function editor(set, get) {
  const actionCreator = createAction(set, get)

  return {
    // 当前选择的节点id
    selectCode: undefined,

    selectNode: actionCreator(selectNode),
    unselectNode: actionCreator(unselectNode),
    createPageNode: actionCreator(createPageNode),

    ...node(actionCreator),
    ...config(actionCreator),
    ...resource(actionCreator),
  }
}

const useEditor = withSelector(createStore(editor))

export default useEditor
