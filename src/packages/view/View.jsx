import React from 'react'
import { Remote } from 'remote:glide_components/Remote'

function View({ node, componentPathMap }) {
  function renderNode() {
    if (!node) {
      return null
    }

    return <Remote $$path={componentPathMap[node.name]}></Remote>
  }

  return renderNode(node)
}

View.defaultProps = {
  // 组件路径映射表
  componentPathMap: {},
}

export default View
