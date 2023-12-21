import { nodeSelector } from '../selector/node'

/**
 * 设置节点ref属性
 *
 * @param {String} payload.code 节点code
 * @param {String} payload.ref 节点ref
 *
 * @returns {void}
 */
function setRef(payload, operator) {
  const { code, ref = '' } = payload
  operator.set((state) => {
    const node = nodeSelector(code)(state)
    if (node) {
      node.ref = ref
    }
  })
}

/**
 * 设置节点别名
 *
 * @param {String} payload.code 节点code
 * @param {String} payload.alias 节点别名
 *
 * @returns {void}
 */
function setAlias(payload, operator) {
  const { code, alias = '' } = payload
  operator.set((state) => {
    const node = nodeSelector(code)(state)
    if (node) {
      node.alias = alias
    }
  })
}

/**
 * 设置节点配置信息
 *
 * @param {String} payload.code 节点code
 * @param {Object} payload.value 节点配置信息
 *
 * @returns {void}
 */
function updateConfig(payload, operator) {
  const { code, value = {} } = payload
  operator.set((state) => {
    const node = nodeSelector(code)(state)
    if (node) {
      node.configValue = value
    }
  })
}

/**
 * 设置节点样式信息
 *
 * @param {String} payload.code 节点code
 * @param {Object} payload.value 节点配置信息
 *
 * @returns {void}
 */
function updateStyle(payload, operator) {
  const { code, value = {} } = payload
  operator.set((state) => {
    const node = nodeSelector(code)(state)
    if (node) {
      node.styleValue = value
    }
  })
}

/**
 * 设置节点动作信息
 *
 * @param {String} payload.code 节点code
 * @param {Object} payload.actions 节点动作信息
 *
 * @returns {void}
 */
function updateActions(payload, operator) {
  const { code, value = [] } = payload
  operator.set((state) => {
    const node = nodeSelector(code)(state)
    if (node) {
      node.actions = value
    }
  })
}

function config(actionCreator) {
  return {
    setRef: actionCreator(setRef),
    setAlias: actionCreator(setAlias),
    updateConfig: actionCreator(updateConfig),
    updateStyle: actionCreator(updateStyle),
    updateActions: actionCreator(updateActions),
  }
}

export default config
