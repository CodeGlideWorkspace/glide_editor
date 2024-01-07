import React from 'react'
import { LeftOutlined, RightOutlined, DownOutlined, UpOutlined, DeleteOutlined } from 'remote:glide_components/Icon'
import { Divider } from 'remote:glide_components/Base'

import styles from './Toolbar.module.less'

function Toolbar() {
  return (
    <div className={styles.toolbar}>
      <div className={styles.group}>
        <div className={styles.item}>
          <LeftOutlined />
        </div>
        <div className={styles.item}>
          <RightOutlined />
        </div>
        <div className={styles.item}>
          <UpOutlined />
        </div>
        <div className={styles.item}>
          <DownOutlined />
        </div>
      </div>
      <Divider layout="vertical" />
      <div className={styles.item}>
        <DeleteOutlined />
      </div>
    </div>
  )
}

export default Toolbar
