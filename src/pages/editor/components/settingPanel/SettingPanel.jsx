import React from 'react'
import { Setting, SettingProvider, useShadowDemo } from '@/packages/editor'
import { Module } from 'remote:glide_components/Module'
import { Tab, TabPanel } from 'remote:glide_components/Tab'

import styles from './SettingPanel.module.less'

function SettingPanel() {
  const demo = useShadowDemo((state) => {
    return {
      state: {
        configDefinitions: state.configDefinitions,
      },
      operator: {
        updateConfig: state.updateConfig,
        updateConfigAsync: state.updateConfigAsync,
      },
    }
  })

  function handleChange(values) {
    demo.operator.updateConfig(values)
    demo.operator.updateConfigAsync(
      Object.keys(values).reduce((result, key) => {
        result[key] = values[key] ? `async_${values[key]}` : values[key]
        return result
      }, {}),
    )
  }

  return (
    <Module className={styles.panel} bordered={false} bodyStyle={{ padding: '0 16px 16px' }} title="组件名称">
      <SettingProvider>
        <Tab>
          <TabPanel name="property" title="属性">
            <Setting configDefinitions={demo.state.configDefinitions} onChange={handleChange} />
          </TabPanel>
          <TabPanel name="style" title="样式">
            样式面板
          </TabPanel>
          <TabPanel name="data" title="数据">
            数据面板
          </TabPanel>
          <TabPanel name="action" title="动作">
            动作面板
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
