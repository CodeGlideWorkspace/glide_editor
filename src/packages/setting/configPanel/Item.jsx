import React, { useContext } from 'react'
import { Form, FormItem } from 'remote:glide_components/Form'
import { Remote } from 'remote:glide_components/Remote'

import { SettingContext } from '../SettingProvider'
import builtinItemMap from '../items'

function Item({ itemDefinitions }) {
  const { itemPathMap } = useContext(SettingContext)

  const verticalLabelCol = { span: 24 }
  const horizontalLabelCol = { span: 8 }

  return (
    <Form labelAlign="left" labelWrap>
      {itemDefinitions.map((item) => {
        const Component = builtinItemMap[item.node]

        return (
          <FormItem
            key={item.name}
            labelCol={item.direction === 'vertical' ? verticalLabelCol : horizontalLabelCol}
            label={item.label}
            name={item.name}
            tooltip={item.tip}
            help={item.description}
          >
            {Component ? (
              <Component {...item.props} />
            ) : (
              <Remote $$path={itemPathMap[item.node]?.componentPath} props={item.props} />
            )}
          </FormItem>
        )
      })}
    </Form>
  )
}

export default Item
