import { createStore, createAction, withSelector } from 'remote:glide_components/store'

import node from './node'
import script from './script'

/**
 * 获取选择的节点
 *
 * @returns {Node}
 */
function getSelectNode(_, operator) {
  const state = operator.get()
  return state.getNode(state.selectId) || state.node
}

/**
 * 选择节点
 *
 * @param {String} id 节点ID
 *
 * @returns {void}
 */
function selectNode(id, operator) {
  const state = operator.get()
  const node = state.getNode(id)
  if (!node) {
    return
  }

  operator.set((state) => {
    state.selectId = id
  })
}

/**
 * 取消选择节点
 *
 * @returns {void}
 */
function unselectNode(_, operator) {
  operator.set((state) => {
    state.selectId = null
  })
}

function editor(set, get) {
  const actionCreator = createAction(set, get)
  return {
    // 当前选择的节点id
    selectId: null,

    selectNode: actionCreator(selectNode),
    unselectNode: actionCreator(unselectNode),
    getSelectNode: actionCreator(getSelectNode),

    ...node(actionCreator),
    ...script(actionCreator),
  }
}

const useEditor = withSelector(createStore(editor))

export default useEditor
