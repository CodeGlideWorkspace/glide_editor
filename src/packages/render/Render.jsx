import React from 'react'
import { Remote } from 'remote:glide_components/Remote'

import Box from './Box'

function Render({ node, configs, materials, renderContainer, renderProps, renderPlaceholder }) {
  const nodeConfigMap = configs.reduce((result, config) => {
    result[config.name] = config
    return result
  }, {})
  const materialMap = materials.reduce((result, material) => {
    result[material.name] = material
    return result
  }, {})

  // 渲染插槽组件
  function renderSlots(slots) {
    if (!slots) {
      return {}
    }

    return Object.keys(slots).reduce((result, slotName) => {
      result[slotName] = renderChildren(slots[slotName])
      return result
    }, {})
  }

  // 渲染子组件
  function renderChildren(children) {
    if (!children?.length) {
      return null
    }

    return <>{children.map((child) => renderNode(child))}</>
  }

  function renderRemote({ node: n, config }, children) {
    const material = materialMap[n.name]
    if (!material) {
      return null
    }

    return renderContainer(
      { node: n, config },
      <Remote
        $$path={{ path: material.path, exportName: material.exportName }}
        code={n.code}
        {...n.props}
        {...renderProps(n)}
        {...renderSlots(n.slots)}
      >
        {children}
      </Remote>,
    )
  }

  function renderNode(n) {
    if (!n) {
      return null
    }

    const config = nodeConfigMap[n.name]
    if (!config) {
      return null
    }

    // 严格布局模式渲染
    if (config.strictMode) {
      return renderRemote({ node: n, config }, <Box style={n.style}>{renderChildren(n.children)}</Box>)
    }

    // 普通模式布局渲染
    return <Box style={n.style}>{renderRemote({ node: n, config }, renderChildren(n.children))}</Box>
  }

  return renderNode(node)
}

Render.defaultProps = {
  configs: [],
  materials: [],
  renderContainer: (option, children) => <>{children}</>,
  renderPlaceholder: (option) => null,
  renderProps: () => ({}),
}

export default Render
