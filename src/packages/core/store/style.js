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
function setStyle(payload, operator) {
  const { code, key, value } = payload

  operator.set((state) => {
    const node = nodeSelector(code)(state)
    node.style[key] = value
  })
}

function style(actionCreator) {
  return {
    setStyle: actionCreator(setStyle),
  }
}

export default style
