import React from 'react'
import { ConfigPanel, ActionPanel, BoxPanel, useEditor, selectNodeSelector, componentSelector } from '@/packages/editor'
import { Module } from 'remote:glide_components/Module'
import { Tab, TabPanel } from 'remote:glide_components/Tab'

import { componentInfoComponentDefinitions } from './config'

import styles from './SettingPanel.module.less'

function SettingPanel() {
  // 获取当前选择的组件节点
  const selectNode = useEditor(selectNodeSelector)
  // 获取当前选择的组件定义
  const selectComponent = useEditor(componentSelector(selectNode?.name))

  const updateEditorNode = useEditor.use.updateEditorNode()
  const batchUpdateEditorNode = useEditor.use.batchUpdateEditorNode()

  function handleInfoChange(value) {
    batchUpdateEditorNode({ code: selectNode.code, config: value })
  }

  function handleConfigChange(value) {
    updateEditorNode({ code: selectNode.code, key: 'property', value })
  }

  function handleActionChange(value) {
    updateEditorNode({ code: selectNode.code, key: 'actions', value: value?.actions })
    updateEditorNode({ code: selectNode.code, key: 'dependencies', value: value?.dependencies })
  }

  function handleStyleChange(value) {
    updateEditorNode({ code: selectNode.code, key: 'style', value })
  }

  function handleBoxChange(value) {
    updateEditorNode({ code: selectNode.code, key: 'cssBox', value })
  }

  return (
    <Module
      className={styles.panel}
      bordered={false}
      bodyStyle={{ padding: '0' }}
      title={selectComponent?.config?.title || '配置'}
    >
      <Tab className={styles.tab}>
        <TabPanel name="property" title="属性">
          <ConfigPanel
            value={selectNode?.config}
            configDefinitions={componentInfoComponentDefinitions}
            onChange={handleInfoChange}
          />
          <ConfigPanel
            value={selectNode?.config?.property}
            configDefinitions={selectComponent?.config?.configDefinitions}
            onChange={handleConfigChange}
          />
        </TabPanel>
        <TabPanel name="style" title="样式">
          <ConfigPanel
            value={selectNode?.config?.style}
            configDefinitions={selectComponent?.config?.styleDefinitions}
            onChange={handleStyleChange}
          />
          <BoxPanel value={selectNode?.config?.cssBox} onChange={handleBoxChange} />
        </TabPanel>
        <TabPanel name="data" title="数据">
          数据面板
        </TabPanel>
        <TabPanel name="action" title="交互">
          <ActionPanel
            value={{ actions: selectNode?.config?.actions, dependencies: selectNode?.config?.dependencies }}
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
