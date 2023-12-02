import React from 'react'
import { Form, useForm } from 'remote:glide_components/Form'
import { Collapse, CollapsePanel } from 'remote:glide_components/Collapse'
import { theme } from 'remote:glide_components/ConfigProvider'

import useSetting from './useSetting'
import Group from './Group'

function Setting(props) {
  const { groupDefinitions } = useSetting(props)
  const form = useForm()
  const { token } = theme.useToken()

  const collapsePanelStyle = {
    background: token.colorFillAlter,
    marginBottom: token.margin,
  }

  const defaultValue = groupDefinitions.map((group) => group.name)

  return (
    <Form form={form} layout="horizontal" labelAlign="left" onChange={props.onChange}>
      <Collapse ghost defaultValue={defaultValue}>
        {groupDefinitions.map((group) => {
          return (
            <CollapsePanel
              key={group.name}
              name={group.name}
              style={collapsePanelStyle}
              title={group.label}
              {...group.props}
            >
              <Group groupDefinition={group} />
            </CollapsePanel>
          )
        })}
      </Collapse>
    </Form>
  )
}

export default Setting
