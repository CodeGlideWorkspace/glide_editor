import React from 'react'
import { Remote } from 'remote:glide_components/Remote'

import useAction from './useAction'

function View({ node, scripts, componentMap, componentPathMap }) {
  const action = useAction({ scripts })

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

  // 动态渲染真实组件
  function renderNode(n) {
    if (!n) {
      return null
    }

    const component = componentMap[n.name]
    if (!component) {
      return null
    }

    const hasApiDefinitions = !!component.config.apiDefinitions?.length
    const refs = {}
    if (hasApiDefinitions) {
      refs.ref = (el) => action.register(n.code, el)
    }

    return (
      <Remote
        $$path={componentPathMap[n.name]}
        key={n.code}
        // 按需注册ref
        {...refs}
        // 渲染组件属性
        {...n.configValue}
        {...renderSlots(n.slots)}
        // 渲染注册动作，内部会管理各个组件的互相调用关系
        {...action.render(n.code, n.actions, { eventDefinitions: component.config.eventDefinitions })}
      >
        {renderChildren(n.children)}
      </Remote>
    )
  }

  return renderNode(node)
}

View.defaultProps = {
  // 组件路径映射表
  componentPathMap: {},
  // 用户自定义脚本
  scripts: [],
  // 获取的远程组件定义映射表
  componentMap: [],
}

export default View
