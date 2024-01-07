import React from 'react'
import { Form, FormItem, useForm } from 'remote:glide_components/Form'
import { Collapse, CollapsePanel } from 'remote:glide_components/Collapse'
import { Select } from 'remote:glide_components/FormBase'
import { useEditor, nodesSelector } from 'remote:glide_editor/core'

import Actions from './Actions'

import styles from './ActionPanel.module.less'

function ActionPanel({ node }) {
  const nodes = useEditor(nodesSelector)
  const setConfig = useEditor.use.setConfig()
  const form = useForm()

  function handleChange(_, { actions, dependencies }) {
    setConfig({
      code: node?.code,
      key: 'actions',
      value: actions,
    })
    setConfig({
      code: node?.code,
      key: 'dependencies',
      value: dependencies,
    })
  }

  const nodeOptions = nodes.map((node) => {
    return { label: node.ref, value: node.code }
  })

  return (
    <Form
      form={form}
      layout="horizontal"
      initialValues={{ actions: node?.config?.actions, dependencies: node?.config?.dependencies }}
      onChange={handleChange}
    >
      <Collapse className={styles.collapse} ghost defaultValue={['depend', 'action']}>
        <CollapsePanel name="depend" title="依赖">
          <FormItem label="组件" name="dependencies" labelCol={{ span: 8 }}>
            <Select multiple data={nodeOptions}></Select>
          </FormItem>
        </CollapsePanel>
        <CollapsePanel name="action" title="动作">
          <Actions node={node} name="actions" />
        </CollapsePanel>
      </Collapse>
    </Form>
  )
}

export default ActionPanel
