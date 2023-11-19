import React from 'react'
import { Collapse, CollapsePanel } from 'remote:glide_components/Collapse'
import { theme } from 'remote:glide_components/ConfigProvider'

import Item from './Item'

function Group({ groupDefinitions }) {
  const { token } = theme.useToken()
  const defaultActiveKey = groupDefinitions.map((group) => group.name)

  const collapsePanelStyle = {
    background: token.colorFillAlter,
    marginBottom: token.margin,
  }

  return (
    <Collapse bordered={false} ghost defaultActiveKey={defaultActiveKey}>
      {groupDefinitions.map((group) => {
        return (
          <CollapsePanel key={group.name} style={collapsePanelStyle} title={group.label} {...group.props}>
            <Item itemDefinitions={group.children} />
          </CollapsePanel>
        )
      })}
    </Collapse>
  )
}

export default Group
