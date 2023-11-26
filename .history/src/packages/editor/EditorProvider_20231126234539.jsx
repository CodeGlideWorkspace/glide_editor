import React from 'react'

// import { Col } from 'remote:glide_components/Col'
// import { Row } from 'remote:glide_components/Row'

import { Droppable, Draggable } from 'remote:glide_components/Dnd'
function EditorProvider(params) {
  return (
    <div>
      <Droppable id="drop-001" accept="demo-001" style={{ textAlign: 'start' }}>
        <Draggable id="drag-001" type="demo-001" style={{ position: 'relative' }}>
          <div>Editor</div>
        </Draggable>
      </Droppable>
    </div>
  )
}
export default EditorProvider
