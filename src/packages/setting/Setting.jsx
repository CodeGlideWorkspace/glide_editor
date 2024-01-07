import React from 'react'
import { Module } from 'remote:glide_components/Module'
import { Remote } from 'remote:glide_components/Remote'
import { Tab, TabPanel } from 'remote:glide_components/Tab'
import { useEditor, resourcesSelector, selectNodeSelector } from 'remote:glide_editor/core'

import styles from './Setting.module.less'

function Setting() {
  const selectNode = useEditor(selectNodeSelector)
  const panels = useEditor(resourcesSelector('panel'))
  const userPanels = useEditor(resourcesSelector(selectNode.name))

  return (
    <Module className={styles.panel} bordered={false} bodyStyle={{ padding: '0' }} title="配置面板">
      <Tab className={styles.tab}>
        {panels.concat(userPanels).map((panel) => {
          return (
            <TabPanel key={panel.name} name={panel.name} title={panel.title}>
              <Remote $$path={{ path: panel.path, exportName: panel.exportName }} node={selectNode} />
            </TabPanel>
          )
        })}
      </Tab>
    </Module>
  )
}

export default Setting
