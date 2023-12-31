import React from 'react'

import { Collapse, CollapsePanel } from 'remote:glide_components/Collapse'
import { Row, Col } from 'remote:glide_components/Grid'
import { Draggable } from 'remote:glide_components/Dnd'
import styles from './ComponentPanel.module.less'

function ComponentPanel({ configDefinition }) {
  const libraryItem = ({ title, component, url }) => {
    const handleDrag = (item, monitor) => {
      console.log(item, monitor)
    }
    const style = {
      display: 'inline-block',
    }
    return (
      <div className={styles.container}>
        <Draggable onDrag={handleDrag} style={style} type={component} name={title}>
          <img alt="图片" src={url} className={styles.img} />
          <div className={styles.title}>{title}</div>
        </Draggable>
      </div>
    )
  }

  const renderItems = ({ title, name, data }) => {
    const hasData = data.length > 0
    return (
      <CollapsePanel title={title} name={name} key={name}>
        <Row>
          {hasData
            ? data.map((item) => (
                <Col span={12} key={item.component}>
                  {libraryItem(item)}
                </Col>
              ))
            : '暂无数据'}
        </Row>
      </CollapsePanel>
    )
  }
  return (
    <Collapse defaultValue={['base', 'layout', 'biz']}>{configDefinition.map((item) => renderItems(item))}</Collapse>
  )
}
export default ComponentPanel
