import React from 'react'

import styles from './ComponentPanel.module.less'

const renderItem = (item, index) => {
  return (
    <div key={index} className={styles.item}>
      <div className={styles.itemTitle}>{item.label}</div>
      <div className={styles.itemContent}>
        {item.children.map((child, index) => {
          return (
            <div key={index} className={styles.itemContentItem}>
              <img src={child.url} alt="" />
              <span>{child.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ComponentPanel({ configDefinition }) {
  return (
    <div style={styles.divide}>
      {configDefinition.map((item, index) => {
        return renderItem(item, index)
      })}
    </div>
  )
}
export default ComponentPanel
