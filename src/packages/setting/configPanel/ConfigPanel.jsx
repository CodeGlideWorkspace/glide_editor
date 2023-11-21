import React from 'react'

import useConfigPanel from './useConfigPanel'
import Group from './Group'

import styles from './ConfigPanel.module.less'

function ConfigPanel(props) {
  const { groupDefinitions } = useConfigPanel(props)

  return (
    <div className={styles.panel}>
      <Group groupDefinitions={groupDefinitions} />
    </div>
  )
}

export default ConfigPanel
