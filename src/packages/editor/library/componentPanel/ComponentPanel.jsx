import React from 'react'

import { Collapse, CollapsePanel } from 'remote:glide_components/Collapse'
import Draggable from '../../draggable/Draggable'

import styles from './ComponentPanel.module.less'

const renderItem = (item, index) => {
  return (
    <CollapsePanel key={item.name} name={item.name} title={item.title} className={styles.item}>
      <div className={styles.itemContent}>
        {item.children.map((child, index) => {
          return (
            <Draggable key={child.name} item={{ data: child, role: 'library', droppable: false }}>
              <div key={index} className={styles.itemContentItem}>
                <img src={child.icon} alt="" />
                <span>{child.title}</span>
              </div>
            </Draggable>
          )
        })}
      </div>
    </CollapsePanel>
  )
}

function ComponentPanel({ options }) {
  const defaultValue = options.map((item) => item.name)
  console.log('defaultValue', defaultValue)
  return (
    <Collapse bordered={false} ghost className={styles.divide} defaultValue={defaultValue}>
      {options.map((item, index) => {
        return renderItem(item, index)
      })}
    </Collapse>
  )
}
export default ComponentPanel
