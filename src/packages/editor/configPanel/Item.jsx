import React, { useContext, useState } from 'react'
import { FormItem } from 'remote:glide_components/Form'
import { Remote } from 'remote:glide_components/Remote'
import { useMount } from 'remote:glide_components/hooks'
import { isFunction } from 'remote:glide_components/utils'

import { SchedulerContext } from './useScheduler'
import useEditor from '../model/editor'
import { itemPathMapSelector } from '../selector/resource'

function Item({ itemDefinition }) {
  const itemPathMap = useEditor(itemPathMapSelector)
  const { scheduler } = useContext(SchedulerContext)
  const [loading, setLoading] = useState(false)

  const isAsync = isFunction(itemDefinition.hooks?.load)
  const [data, setData] = useState([])

  useMount(() => {
    // 注册组件更新事件，当组件依赖更新时，会触发此事件
    scheduler.subscribe(
      itemDefinition.name,
      async (form) => {
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
  })

  const verticalLabelCol = { span: 24 }
  const horizontalLabelCol = { span: 8 }
  const hasDependencies = !!itemDefinition.dependencies?.length

  function handleChange(value) {
    scheduler.change(itemDefinition.name)
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
      return renderHidden()
    }

    return (
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
          $$path={itemPathMap[itemDefinition.node]}
          {...itemDefinition.props}
          {...(isAsync ? { data } : {})}
          loading={loading}
          onChange={handleChange}
        />
      </FormItem>
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
