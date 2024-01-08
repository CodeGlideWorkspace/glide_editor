import React, { useContext, useState } from 'react'
import { FormItem } from 'remote:glide_components/Form'
import { Remote } from 'remote:glide_components/Remote'
import { isFunction } from 'remote:glide_components/utils'
import { useEditor, resourcesSelectorByType } from 'remote:glide_editor/core'

import { SchedulerContext } from './useScheduler'
import LifeCycle from './LifeCycle'

function Item({ itemDefinition }) {
  const setters = useEditor(resourcesSelectorByType('setter'))
  const setterMap = setters.reduce((result, setter) => {
    result[setter.name] = { path: setter.path, exportName: setter.exportName }
    return result
  }, {})

  const { form, scheduler } = useContext(SchedulerContext)
  const [loading, setLoading] = useState(false)

  const isAsync = isFunction(itemDefinition.hooks?.load)
  const [data, setData] = useState([])

  function handleMount() {
    // 注册组件更新事件，当组件依赖更新时，会触发此事件
    scheduler.subscribe(
      itemDefinition.name,
      async () => {
        if (!isAsync) {
          return
        }
        setLoading(true)
        const result = await itemDefinition.hooks.load(form).catch((error) => {
          setLoading(false)
          throw error
        })
        setLoading(false)
        setData(result || [])
      },
      itemDefinition.dependencies,
    )
  }

  function handleUnmount() {
    scheduler.unsubscribe(itemDefinition.name)
  }

  const verticalLabelCol = { span: 24 }
  const horizontalLabelCol = { span: 8 }
  const hasDependencies = !!itemDefinition.dependencies?.length

  function handleChange(value) {
    scheduler.publish(itemDefinition.name)
  }

  function renderHidden() {
    return (
      <FormItem name={itemDefinition.name} hidden noStyle>
        <div />
      </FormItem>
    )
  }

  function renderItem() {
    // 隐藏域
    if (itemDefinition.node === 'Hidden') {
      return (
        <LifeCycle onMount={handleMount} onUnmount={handleUnmount}>
          {renderHidden()}
        </LifeCycle>
      )
    }

    return (
      <LifeCycle onMount={handleMount} onUnmount={handleUnmount}>
        <FormItem
          labelCol={itemDefinition.layout === 'vertical' ? verticalLabelCol : horizontalLabelCol}
          label={itemDefinition.label}
          name={itemDefinition.name}
          tooltip={itemDefinition.tip}
          required={itemDefinition.required}
          description={itemDefinition.description}
          dependencies={itemDefinition.dependencies}
          validators={itemDefinition.hooks?.validators}
        >
          <Remote
            $$path={setterMap[itemDefinition.node]}
            {...itemDefinition.props}
            {...(isAsync ? { data } : {})}
            loading={loading}
            onChange={handleChange}
          />
        </FormItem>
      </LifeCycle>
    )
  }

  if (hasDependencies) {
    return (
      <FormItem dependencies={itemDefinition.dependencies} noStyle>
        {(form) => {
          const hidden =
            itemDefinition.hooks?.visible &&
            itemDefinition.hooks.visible(form.getValue(itemDefinition.name), form) === false
          if (hidden) {
            return null
          }

          return renderItem()
        }}
      </FormItem>
    )
  }

  return <FormItem noStyle>{renderItem()}</FormItem>
}

export default Item
