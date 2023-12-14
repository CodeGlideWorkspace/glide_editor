import React, { useRef } from 'react'
import { SettingProvider, useDemo, ConfigPanel, BehaviorPanel } from '@/packages/editor'
import { Module } from 'remote:glide_components/Module'
import { Tab, TabPanel } from 'remote:glide_components/Tab'

import styles from './SettingPanel.module.less'

function SettingPanel() {
  const configRef = useRef(null)
  const behaviorRef = useRef(null)

  const demo = useDemo((state) => {
    return {
      state: {
        configDefinitions: state.configDefinitions,
        eventDefinitions: state.eventDefinitions,
        apiDefinitions: state.apiDefinitions,
        behaviors: state.behaviors,
        components: state.components,
        scripts: state.scripts,
      },
      operator: {
        updateConfig: state.updateConfig,
        updateConfigAsync: state.updateConfigAsync,
      },
    }
  })

  function handleConfigChange(values) {
    demo.operator.updateConfig(values)
    demo.operator.updateConfigAsync(
      Object.keys(values).reduce((result, key) => {
        result[key] = values[key] ? `async_${values[key]}` : values[key]
        return result
      }, {}),
    )
  }

  function handleBehaviorsChange(value) {
    console.log(value, '...')
  }

  function handleSubmit() {
    configRef.current?.submit()
    behaviorRef.current?.submit()
  }

  return (
    <Module
      className={styles.panel}
      bordered={false}
      bodyStyle={{ padding: '0' }}
      title="组件名称"
      action={<div onClick={handleSubmit}>提交试试</div>}
    >
      <SettingProvider>
        <Tab className={styles.tab}>
          <TabPanel name="property" title="属性">
            <ConfigPanel
              ref={configRef}
              configDefinitions={demo.state.configDefinitions}
              onChange={handleConfigChange}
            />
          </TabPanel>
          <TabPanel name="style" title="样式">
            样式面板
          </TabPanel>
          <TabPanel name="data" title="数据">
            数据面板
          </TabPanel>
          <TabPanel name="action" title="动作">
            <BehaviorPanel
              ref={behaviorRef}
              eventDefinitions={demo.state.eventDefinitions}
              apiDefinitions={demo.state.apiDefinitions}
              components={demo.state.components}
              scripts={demo.state.scripts}
              onChange={handleBehaviorsChange}
            />
          </TabPanel>
          <TabPanel name="senior" title="高级">
            高级面板
          </TabPanel>
        </Tab>
      </SettingProvider>
    </Module>
  )
}

export default SettingPanel
