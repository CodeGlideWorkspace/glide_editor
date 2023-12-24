import React from 'react'
import { ConfigPanel, ActionPanel, useEditor, selectNodeSelector, componentSelector } from '@/packages/editor'
import { Module } from 'remote:glide_components/Module'
import { Tab, TabPanel } from 'remote:glide_components/Tab'

import { componentInfoComponentDefinitions } from './config'

import styles from './SettingPanel.module.less'

function SettingPanel() {
  // 获取当前选择的组件节点
  const selectNode = useEditor(selectNodeSelector)
  // 获取当前选择的组件定义
  const selectComponent = useEditor(componentSelector(selectNode?.name))

  const updateNodeConfig = useEditor.use.updateNodeConfig()
  const updateNodeActions = useEditor.use.updateNodeActions()
  const updateNodeStyle = useEditor.use.updateNodeStyle()
  const updateEditorNode = useEditor.use.updateEditorNode()

  function handleInfoChange(value) {
    updateEditorNode({ code: selectNode.code, config: value })
  }

  function handleConfigChange(value) {
    updateNodeConfig({ code: selectNode.code, value })
  }

  function handleActionChange(value) {
    updateNodeActions({ code: selectNode.code, value })
  }

  function handleStyleChange(value) {
    updateNodeStyle({ code: selectNode.code, value })
  }

  return (
    <Module className={styles.panel} bordered={false} bodyStyle={{ padding: '0' }} title="组件名称">
      <Tab className={styles.tab}>
        <TabPanel name="property" title="属性">
          <ConfigPanel
            collapsible={false}
            configDefinitions={componentInfoComponentDefinitions}
            onChange={handleInfoChange}
          />
          <ConfigPanel
            initialValues={selectNode.configValue}
            configDefinitions={selectComponent?.config?.configDefinitions}
            onChange={handleConfigChange}
          />
        </TabPanel>
        <TabPanel name="style" title="样式">
          <ConfigPanel configDefinitions={selectComponent?.config?.styleDefinitions} onChange={handleStyleChange} />
        </TabPanel>
        <TabPanel name="data" title="数据">
          数据面板
        </TabPanel>
        <TabPanel name="action" title="动作">
          <ActionPanel
            node={selectNode}
            initialValues={selectNode?.actions}
            eventDefinitions={selectComponent?.config?.eventDefinitions}
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
