import React from 'react'
import { isFunction } from 'remote:glide_components/utils'
import { Droppable, Draggable } from 'remote:glide_components/Dnd'
import useEditor from '../model/editor'
import { componentSelector } from '../selector/resource'
import Toolbar from './components/Toolbar'
const roleEnum = {
  LIB: 'library',
  VIEW: 'view',
}

export default function DraggableComponent({ item = {}, children }) {
  const createEditorNode = useEditor.use.createEditorNode()
  const appendEditorNode = useEditor.use.appendEditorNode()

  const canDrag = (source, target) => {
    const { allowDrag = () => true } = componentSelector(useEditor.getState)
    return allowDrag(source, target)
  }
  const canDrop = (source, target) => {
    const targetComponent = componentSelector(target.data.name)(useEditor.getState())
    const sourceComponent = componentSelector(source.data.name)(useEditor.getState())
    // TODO 默认逻辑 layout 不能放组件内
    let result = true
    if (isFunction(sourceComponent?.allowDropIn)) {
      result = sourceComponent.allowDropIn(source, target)
    }

    if (result && isFunction(targetComponent?.allowDrop)) {
      result = targetComponent.allowDrop(source, target)
    }

    return result
  }
  const handleDrag = () => {
    // console.log('handleDrag', ...arguments)
  }
  const handleDrop = (source = {}, target, state, monitor) => {
    const { role, data: { name } = {} } = source
    if (roleEnum.LIB === role) {
      console.log('handleDrop.library', source, target, state, monitor)
      // 新加
      appendEditorNode({ node: createEditorNode(name), parentCode: target.data.code })
    } else if (roleEnum.VIEW === role) {
      // 移动
      console.log('handleDrop.view', source, target, state, monitor)
      // appendEditorNode({ node: createEditorNode(name) })
    }
  }
  const { droppable = true } = item

  if (!droppable) {
    // 仅drag
    return (
      <Draggable item={item} canDrag={canDrag} onDrag={handleDrag}>
        {children}
      </Draggable>
    )
  }

  return (
    <Draggable item={item} canDrag={canDrag} onDrag={handleDrag}>
      <Droppable item={item} canDrop={canDrop} onDrop={handleDrop}>
        {children}
      </Droppable>
      <Toolbar />
    </Draggable>
  )
}
