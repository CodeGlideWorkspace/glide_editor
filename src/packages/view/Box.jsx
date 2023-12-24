import React from 'react'

import styles from './Box.module.less'

function Box({ value, children }) {
  const { width, height, margin, padding } = value

  const style = {}
  if (width.value) {
    style.width = `${width.value}${width.unit}`
  }

  if (height.value) {
    style.height = `${height.value}${height.unit}`
  }

  style.margin = Array.from({ length: 4 })
    .map((_, index) => {
      return `${margin[index] || 0}px`
    })
    .join(' ')

  style.padding = Array.from({ length: 4 })
    .map((_, index) => {
      return `${padding[index] || 0}px`
    })
    .join(' ')

  return (
    <div className={styles.box} style={style}>
      {children}
    </div>
  )
}

Box.defaultProps = {
  value: {
    width: {
      value: undefined,
      unit: 'px',
    },
    height: {
      value: undefined,
      unit: 'px',
    },
    margin: [],
    padding: [],
  },
}

export default Box
