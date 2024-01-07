import { nodeSelector } from '../selector/document'

/**
 * 设置组件属性
 *
 * @param {String} payload.code 组件编码
 * @param {String} payload.key 属性键名
 * @param {Any} payload.value 属性值
 *
 * @returns {Void}
 */
function setProp(payload, operator) {
  const { code, key, value } = payload

  operator.set((state) => {
    const node = nodeSelector(code)(state)
    node.props[key] = value
  })
}

function props(actionCreator) {
  return {
    setProp: actionCreator(setProp),
  }
}

export default props
