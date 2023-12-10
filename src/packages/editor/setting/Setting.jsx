import React from 'react'
import { Form, useForm } from 'remote:glide_components/Form'
import { Collapse, CollapsePanel } from 'remote:glide_components/Collapse'
import { theme } from 'remote:glide_components/ConfigProvider'
import { useMount } from 'remote:glide_components/hooks'

import useSetting from './useSetting'
import { useScheduler, SchedulerContext } from './useScheduler'
import Group from './Group'

function Setting(props) {
  const { groupDefinitions, initialValues } = useSetting(props)
  const form = useForm()
  const scheduler = useScheduler(form)

  useMount(() => {
    scheduler.start()
  })

  const { token } = theme.useToken()

  const collapsePanelStyle = {
    background: token.colorFillAlter,
    marginBottom: token.margin,
  }

  const defaultCollapseValues = groupDefinitions.map((group) => group.name)

  return (
    <SchedulerContext.Provider value={{ scheduler }}>
      <Form form={form} layout="horizontal" labelAlign="left" initialValues={initialValues} onChange={props.onChange}>
        <Collapse ghost defaultValue={defaultCollapseValues}>
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
    </SchedulerContext.Provider>
  )
}

export default Setting
