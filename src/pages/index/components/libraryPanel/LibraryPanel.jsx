import React from 'react'
import { Module } from 'remote:glide_components/Module'
import ComponentPanel from './ComponentPanel'
import styles from './LibraryPanel.module.less'
import { configDefinition } from './config'

function LibraryPanel() {
  return (
    <div>
      <div className={styles.library}>
        <Module title="组件库">
          <ComponentPanel configDefinition={configDefinition}></ComponentPanel>
        </Module>
      </div>
    </div>
  )
}
export default LibraryPanel
