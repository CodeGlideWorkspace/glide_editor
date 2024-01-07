import React from 'react'
import { Form, useForm } from 'remote:glide_components/Form'
import { Empty } from 'remote:glide_components/Base'
import { Collapse, CollapsePanel } from 'remote:glide_components/Collapse'
import { useMount } from 'remote:glide_components/hooks'
import { useEditor } from 'remote:glide_editor/core'

import useConfig from './useConfig'
import { useScheduler, SchedulerContext } from './useScheduler'
import Group from './Group'

import styles from './PropPanel.module.less'

function PropPanel({ node }) {
  const setProp = useEditor.use.setProp()
  const { groupDefinitions, initialValues } = useConfig(node)
  const form = useForm()
  const scheduler = useScheduler()

  useMount(() => {
    scheduler.publish()
  })

  const defaultCollapseValues = groupDefinitions.map((group) => group.name)

  function handleFieldsChange(fields) {
    fields.forEach((field) => {
      if (field.validated && !field.errors.length) {
        setProp({
          code: node?.code,
          key: field.name,
          value: field.value,
        })
      }
    })
  }

  return (
    <SchedulerContext.Provider value={{ scheduler, form }}>
      <Form
        form={form}
        layout="horizontal"
        labelAlign="left"
        initialValues={initialValues}
        onFieldsChange={handleFieldsChange}
      >
        {groupDefinitions.length ? (
          <Collapse className={styles.collapse} ghost defaultValue={defaultCollapseValues}>
            {groupDefinitions.map((group) => {
              return (
                <CollapsePanel key={group.name} name={group.name} title={group.label} {...group.props}>
                  <Group groupDefinition={group} />
                </CollapsePanel>
              )
            })}
          </Collapse>
        ) : (
          <Empty description="暂不配置" />
        )}
      </Form>
    </SchedulerContext.Provider>
  )
}

export default PropPanel
