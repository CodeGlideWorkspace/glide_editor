import React from 'react'
import { Form, useForm } from 'remote:glide_components/Form'
import { Collapse, CollapsePanel } from 'remote:glide_components/Collapse'
import { theme } from 'remote:glide_components/ConfigProvider'

import useConfigPanel from './useConfigPanel'
import Group from './Group'

import styles from './ConfigPanel.module.less'

function ConfigPanel(props) {
  const { groupDefinitions } = useConfigPanel(props)
  const form = useForm()
  const { token } = theme.useToken()

  const collapsePanelStyle = {
    background: token.colorFillAlter,
    marginBottom: token.margin,
  }

  const defaultValue = groupDefinitions.map((group) => group.name)

  return (
    <div className={styles.panel}>
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
    </div>
  )
}

export default ConfigPanel
