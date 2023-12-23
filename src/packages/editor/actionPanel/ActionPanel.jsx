import React, { forwardRef, useImperativeHandle } from 'react'
import { Form, useForm } from 'remote:glide_components/Form'

import Actions from './Actions'

const ActionPanel = forwardRef(function ActionPanel({ node, eventDefinitions, onChange }, ref) {
  const form = useForm()
  useImperativeHandle(ref, () => form)

  function handleChange(_, values) {
    onChange(values?.actions)
  }

  return (
    <Form form={form} layout="horizontal" initialValues={{}} onChange={handleChange}>
      <Actions name="actions" node={node} events={eventDefinitions} />
    </Form>
  )
})

ActionPanel.defaultProps = {
  eventDefinitions: [],
  apiDefinitions: [],
  onChange() {},
}

export default ActionPanel
