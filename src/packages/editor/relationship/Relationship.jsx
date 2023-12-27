import React from 'react'
import { Collapse, CollapsePanel } from 'remote:glide_components/Collapse'

import styles from './Relationship.module.less'

function Relationship() {
  return (
    <Collapse className={styles.collapse} ghost defaultValue={['relationship']}>
      <CollapsePanel name="relationship" title="依赖关系"></CollapsePanel>
    </Collapse>
  )
}

export default Relationship
