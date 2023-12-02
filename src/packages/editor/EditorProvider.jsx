import React from 'react'

import { Col } from 'remote:glide_components/Col'
import { Row } from 'remote:glide_components/Row'
import { Module } from 'remote:glide_components/Module'

// import { Droppable, Draggable } from 'remote:glide_components/Dnd'
import styles from './EditorProvider.module.less'
function EditorProvider(params) {
  // const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
  return (
    <div className={styles.container}>
      <Row>
        <Col span={12}>
          <Module title="module">111</Module>
        </Col>
        <Col span={12}>
          <Module title="module">222</Module>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Module title="module">111</Module>
        </Col>
        <Col span={12}>
          <Module title="module">222</Module>
        </Col>
      </Row>
      <Row>
        <Col span={24}>请拖入组件</Col>
      </Row>
    </div>
  )
}
export default EditorProvider
