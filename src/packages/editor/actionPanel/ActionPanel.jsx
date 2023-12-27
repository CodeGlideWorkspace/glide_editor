import React, { forwardRef, useImperativeHandle } from 'react'
import { Form, useForm } from 'remote:glide_components/Form'
import { Collapse, CollapsePanel } from 'remote:glide_components/Collapse'

import Actions from './Actions'

import styles from './ActionPanel.module.less'

const ActionPanel = forwardRef(function ActionPanel({ node, eventDefinitions, initialValues, onChange }, ref) {
  const form = useForm()
  useImperativeHandle(ref, () => form)

  function handleChange(_, values) {
    onChange(values?.actions)
  }

  return (
    <Collapse className={styles.collapse} ghost defaultValue={['action']}>
      <CollapsePanel name="action" title="事件">
        <Form form={form} layout="horizontal" initialValues={{ actions: initialValues }} onChange={handleChange}>
          <Actions name="actions" node={node} value={initialValues} events={eventDefinitions} />
        </Form>
      </CollapsePanel>
    </Collapse>
  )
})

ActionPanel.defaultProps = {
  eventDefinitions: [],
  apiDefinitions: [],
  onChange() {},
}

export default ActionPanel
