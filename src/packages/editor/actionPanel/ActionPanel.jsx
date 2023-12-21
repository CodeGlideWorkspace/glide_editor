import React, { forwardRef, useImperativeHandle } from 'react'
import { Form, useForm } from 'remote:glide_components/Form'

import Actions from './Actions'

const ActionPanel = forwardRef(function ActionPanel({ eventDefinitions, apiDefinitions, onChange }, ref) {
  const form = useForm()
  useImperativeHandle(ref, () => form)

  return (
    <Form form={form} layout="horizontal" initialValues={{}} onChange={onChange}>
      <Actions name="actions" events={eventDefinitions} apis={apiDefinitions} />
    </Form>
  )
})

ActionPanel.defaultProps = {
  eventDefinitions: [],
  apiDefinitions: [],
}

export default ActionPanel
