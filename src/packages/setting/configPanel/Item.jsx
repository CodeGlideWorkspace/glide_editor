import React, { useContext } from 'react'
import { FormItem } from 'remote:glide_components/Form'
import { Remote } from 'remote:glide_components/Remote'

import { SettingContext } from '../SettingProvider'
import builtinItemMap from '../items'

function Item({ itemDefinition }) {
  const { itemPathMap } = useContext(SettingContext)
  const verticalLabelCol = { span: 24 }
  const horizontalLabelCol = { span: 8 }
  const hasDependencies = itemDefinition.dependencies?.length > 0

  function renderHidden() {
    return (
      <FormItem name={itemDefinition.name} hidden noStyle>
        <div />
      </FormItem>
    )
  }

  function renderItem() {
    // 隐藏域
    if (itemDefinition.node === 'hidden') {
      return renderHidden()
    }

    const Component = builtinItemMap[itemDefinition.node]
    return (
      <FormItem
        labelCol={itemDefinition.layout === 'vertical' ? verticalLabelCol : horizontalLabelCol}
        label={itemDefinition.label}
        name={itemDefinition.name}
        tooltip={itemDefinition.tip}
        required={itemDefinition.required}
        description={itemDefinition.description}
        validators={itemDefinition.validators}
        dependencies={itemDefinition.dependencies}
      >
        {Component ? (
          <Component {...itemDefinition.props} />
        ) : (
          <Remote $$path={itemPathMap[itemDefinition.node]?.componentPath} {...itemDefinition.props} />
        )}
      </FormItem>
    )
  }

  if (hasDependencies) {
    return (
      <FormItem shouldUpdate noStyle>
        {(form) => {
          const hidden =
            itemDefinition.visible && itemDefinition.visible(form.getValue(itemDefinition.name), form) === false
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
