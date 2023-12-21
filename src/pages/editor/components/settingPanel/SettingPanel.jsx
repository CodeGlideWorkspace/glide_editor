import React, { useRef } from 'react'
import { ConfigPanel, ActionPanel, useEditor, selectNodeSelector, componentSelector } from '@/packages/editor'
import { Module } from 'remote:glide_components/Module'
import { Tab, TabPanel } from 'remote:glide_components/Tab'

import styles from './SettingPanel.module.less'

function SettingPanel() {
  const configRef = useRef(null)
  const actionRef = useRef(null)

  // 获取当前选择的组件节点
  const selectNode = useEditor(selectNodeSelector)
  // 获取当前选择的组件定义
  const selectComponent = useEditor(componentSelector(selectNode?.name))
  const updateConfig = useEditor.use.updateConfig()
  const updateActions = useEditor.use.updateActions()

  function handleConfigChange(value) {
    updateConfig({ code: selectNode?.code, value })
  }

  function handleActionChange(value) {
    updateActions({ code: selectNode?.code, value })
  }

  return (
    <Module className={styles.panel} bordered={false} bodyStyle={{ padding: '0' }} title="组件名称">
      <Tab className={styles.tab}>
        <TabPanel name="property" title="属性">
          <ConfigPanel
            ref={configRef}
            configDefinitions={selectComponent?.config?.configDefinitions}
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
          <ActionPanel
            ref={actionRef}
            eventDefinitions={selectComponent?.config?.eventDefinitions}
            apiDefinitions={selectComponent?.config?.apiDefinitions}
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
