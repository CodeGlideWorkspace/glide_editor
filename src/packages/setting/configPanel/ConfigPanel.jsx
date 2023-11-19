import React from 'react'

import useConfigPanel from './useConfigPanel'
import Group from './Group'
import Item from './Item'

import styles from './ConfigPanel.module.less'

function ConfigPanel(props) {
  const { groupDefinitions, itemDefinitions } = useConfigPanel(props)

  return (
    <div className={styles.panel}>
      <Item itemDefinitions={itemDefinitions} />
      <div className={styles.divide} />
      <Group groupDefinitions={groupDefinitions} />
    </div>
  )
}

export default ConfigPanel
