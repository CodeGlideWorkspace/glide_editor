import { nodeSelector } from '../selector/node'

/**
 * 设置节点配置信息
 *
 * @param {String} payload.code 节点code
 * @param {Object} payload.value 节点配置信息
 *
 * @returns {void}
 */
function updateNodeConfig(payload, operator) {
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
function updateNodeStyle(payload, operator) {
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
function updateNodeActions(payload, operator) {
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
    updateNodeConfig: actionCreator(updateNodeConfig),
    updateNodeStyle: actionCreator(updateNodeStyle),
    updateNodeActions: actionCreator(updateNodeActions),
  }
}

export default config
