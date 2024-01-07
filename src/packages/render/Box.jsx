import React from 'react'

import styles from './Box.module.less'

function Box({ style, children }) {
  return (
    <div className={styles.box} style={style}>
      {children}
    </div>
  )
}

export default Box
