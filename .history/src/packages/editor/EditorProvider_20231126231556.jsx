import React from 'react'

import { Col } from 'remote:glide_components/Col'
import { Row } from 'remote:glide_components/Row'

import { Droppable, Draggable } from 'remote:glide_components/Dnd'
function EditorProvider(params) {
  return (
    <div>
      <Droppable>
        <Draggable>
          <div>Editor</div>
        </Draggable>
      </Droppable>
    </div>
  )
}
export default EditorProvider
