import React from 'react'

import Item from './Item'

function Group({ groupDefinition }) {
  return (
    <>
      {groupDefinition.children?.map((itemDefinition) => {
        return <Item key={itemDefinition.name} itemDefinition={itemDefinition} />
      })}
    </>
  )
}

export default Group
