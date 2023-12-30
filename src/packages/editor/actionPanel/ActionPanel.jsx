import React, { forwardRef, useImperativeHandle } from 'react'
import { Form, FormItem, useForm } from 'remote:glide_components/Form'
import { Collapse, CollapsePanel } from 'remote:glide_components/Collapse'
import { Select } from 'remote:glide_components/FormBase'

import Actions from './Actions'

import useEditor from '../model/editor'
import { componentOptionsSelector } from '../selector/editor'

import styles from './ActionPanel.module.less'

const ActionPanel = forwardRef(function ActionPanel({ node, eventDefinitions, value, onChange }, ref) {
  const componentOptions = useEditor(componentOptionsSelector)
  const form = useForm()
  useImperativeHandle(ref, () => form)

  function handleChange(_, values) {
    onChange(values)
  }

  return (
    <Form form={form} layout="horizontal" initialValues={value} onChange={handleChange}>
      <Collapse className={styles.collapse} ghost defaultValue={['depend', 'action']}>
        <CollapsePanel name="depend" title="依赖">
          <FormItem label="组件" name="dependencies" labelCol={{ span: 8 }}>
            <Select multiple data={componentOptions}></Select>
          </FormItem>
        </CollapsePanel>
        <CollapsePanel name="action" title="动作">
          <Actions name="actions" node={node} value={value.actions} events={eventDefinitions} />
        </CollapsePanel>
      </Collapse>
    </Form>
  )
})

ActionPanel.defaultProps = {
  eventDefinitions: [],
  apiDefinitions: [],
  onChange() {},
}

export default ActionPanel
