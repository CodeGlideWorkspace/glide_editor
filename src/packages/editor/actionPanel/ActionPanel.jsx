import React, { forwardRef, useImperativeHandle } from 'react'
import { Form, useForm } from 'remote:glide_components/Form'

import Actions from './Actions'

function ActionPanel({ eventDefinitions, methodDefinitions, components, scripts, onChange }, ref) {
  const form = useForm()
  useImperativeHandle(ref, () => form)

  return (
    <Form form={form} layout="horizontal" initialValues={{}} onChange={onChange}>
      <Actions
        name="actions"
        events={eventDefinitions}
        methods={methodDefinitions}
        components={components}
        scripts={scripts}
      />
    </Form>
  )
}

export default forwardRef(ActionPanel)
