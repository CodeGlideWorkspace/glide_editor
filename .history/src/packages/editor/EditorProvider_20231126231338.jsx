import React from 'react'

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
