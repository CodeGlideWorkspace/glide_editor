import React, { forwardRef, useImperativeHandle } from 'react'
import { Form, useForm } from 'remote:glide_components/Form'
import { Collapse, CollapsePanel } from 'remote:glide_components/Collapse'
import { useMount } from 'remote:glide_components/hooks'

import useConfig from './useConfig'
import { useScheduler, SchedulerContext } from './useScheduler'
import Group from './Group'

import styles from './ConfigPanel.module.less'

function ConfigPanel(props, ref) {
  const { groupDefinitions, initialValues } = useConfig(props)
  const form = useForm()
  const scheduler = useScheduler(form)

  useMount(() => {
    scheduler.start()
  })

  useImperativeHandle(ref, () => form)

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
                className={styles.panel}
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

export default forwardRef(ConfigPanel)
