import React, { forwardRef, useImperativeHandle } from 'react'
import { Form, useForm } from 'remote:glide_components/Form'

import Events from './Events'
import useBehavior from './useBehavior'

function BehaviorPanel(props, ref) {
  const form = useForm()
  const { eventOptions, apiOptions, componentOptions, scriptOptions } = useBehavior(props)

  useImperativeHandle(ref, () => form)

  return (
    <Form form={form} layout="horizontal" initialValues={{}} onChange={props.onChange}>
      <Events
        name="events"
        eventOptions={eventOptions}
        apiOptions={apiOptions}
        componentOptions={componentOptions}
        scriptOptions={scriptOptions}
      />
    </Form>
  )
}

export default forwardRef(BehaviorPanel)
