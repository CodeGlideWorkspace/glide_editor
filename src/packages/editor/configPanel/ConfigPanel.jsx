import React, { forwardRef, useImperativeHandle } from 'react'
import { Form, useForm } from 'remote:glide_components/Form'
import { Collapse, CollapsePanel } from 'remote:glide_components/Collapse'
import { useMount } from 'remote:glide_components/hooks'

import useConfig from './useConfig'
import { useScheduler, SchedulerContext } from './useScheduler'
import Group from './Group'

import styles from './ConfigPanel.module.less'

const ConfigPanel = forwardRef(function ConfigPanel(props, ref) {
  const { groupDefinitions, initialValues } = useConfig(props)
  const form = useForm()
  const scheduler = useScheduler()

  useMount(() => {
    scheduler.publish()
  })

  useImperativeHandle(ref, () => form)

  const defaultCollapseValues = groupDefinitions.map((group) => group.name)

  function handleChange(_, values) {
    props.onChange(values)
  }

  return (
    <SchedulerContext.Provider value={{ scheduler, form }}>
      <Form form={form} layout="horizontal" labelAlign="left" initialValues={initialValues} onChange={handleChange}>
        <Collapse className={styles.collapse} ghost defaultValue={defaultCollapseValues}>
          {groupDefinitions.map((group) => {
            return (
              <CollapsePanel key={group.name} name={group.name} title={group.label} {...group.props}>
                <Group groupDefinition={group} />
              </CollapsePanel>
            )
          })}
        </Collapse>
      </Form>
    </SchedulerContext.Provider>
  )
})

ConfigPanel.defaultProps = {
  configDefinitions: [],
  onChange() {},
}

export default ConfigPanel
