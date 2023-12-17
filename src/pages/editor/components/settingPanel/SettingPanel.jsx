import React, { useRef } from 'react'
import { useDemo, useEditor, ConfigPanel, ActionPanel } from '@/packages/editor'
import { Module } from 'remote:glide_components/Module'
import { Tab, TabPanel } from 'remote:glide_components/Tab'

import styles from './SettingPanel.module.less'

function SettingPanel() {
  const configRef = useRef(null)
  const actionRef = useRef(null)

  const configDefinitions = useDemo.use.configDefinitions()
  const eventDefinitions = useDemo.use.eventDefinitions()
  const methodDefinitions = useDemo.use.methodDefinitions()
  const components = useDemo.use.components()
  const scripts = useEditor.use.scripts()

  const updateConfig = useDemo.use.updateConfig()
  const updateConfigAsync = useDemo.use.updateConfigAsync()

  function handleConfigChange(values) {
    updateConfig(values)
    updateConfigAsync(
      Object.keys(values).reduce((result, key) => {
        result[key] = values[key] ? `async_${values[key]}` : values[key]
        return result
      }, {}),
    )
  }

  function handleActionChange(value) {
    console.log(value, '...')
  }

  return (
    <Module className={styles.panel} bordered={false} bodyStyle={{ padding: '0' }} title="组件名称">
      <Tab className={styles.tab}>
        <TabPanel name="property" title="属性">
          <ConfigPanel ref={configRef} configDefinitions={configDefinitions} onChange={handleConfigChange} />
        </TabPanel>
        <TabPanel name="style" title="样式">
          样式面板
        </TabPanel>
        <TabPanel name="data" title="数据">
          数据面板
        </TabPanel>
        <TabPanel name="action" title="动作">
          <ActionPanel
            ref={actionRef}
            eventDefinitions={eventDefinitions}
            methodDefinitions={methodDefinitions}
            components={components}
            scripts={scripts}
            onChange={handleActionChange}
          />
        </TabPanel>
        <TabPanel name="senior" title="高级">
          高级面板
        </TabPanel>
      </Tab>
    </Module>
  )
}

export default SettingPanel
