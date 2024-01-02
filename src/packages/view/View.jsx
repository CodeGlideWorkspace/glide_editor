import React from 'react'
import { Remote } from 'remote:glide_components/Remote'

import Box from './Box'
import Controller from './Controller'
import useAction from './useAction'
import useGlide from './useGlide'

function View({ node, scripts, componentMap, componentPathMap }) {
  const action = useAction({ scripts })
  const glide = useGlide({ node })

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

  // 渲染真实的远程组件
  function renderRemote(n, component, render) {
    const hasApiDefinitions = !!component.config.apiDefinitions?.length
    const refs = {}
    if (hasApiDefinitions) {
      refs.ref = (el) => {
        action.register(n.code, el)
      }
    }

    return (
      <Controller key={n.code} node={n} glide={glide}>
        <Remote
          $$path={componentPathMap[n.name]}
          code={n.code}
          // 传递到组件的上下文
          glide={glide.render(n.code, n.config.dependencies)}
          // 按需注册ref
          {...refs}
          // 渲染组件属性
          {...n.config.property}
          // 渲染样式属性
          {...n.config.style}
          {...renderSlots(n.slots)}
          // 渲染注册动作，内部会管理各个组件的互相调用关系
          {...action.render(n.code, n.config.actions, { eventDefinitions: component.config.eventDefinitions })}
        >
          {render()}
        </Remote>
      </Controller>
    )
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

    // 严格布局模式渲染
    if (component.config.strictMode) {
      return renderRemote(n, component, () => {
        return <Box value={n.config.cssBox}>{renderChildren(n.children)}</Box>
      })
    }

    // 普通模式布局渲染
    return (
      <Box value={n.config.cssBox}>
        {renderRemote(n, component, () => {
          return renderChildren(n.children)
        })}
      </Box>
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
