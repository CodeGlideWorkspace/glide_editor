import React from 'react'
import { Panel } from '@/packages/setting'

import styles from './Setting.module.less'

function Setting() {
  return (
    <div className={styles.setting}>
      <Panel></Panel>
    </div>
  )
}

export default Setting
