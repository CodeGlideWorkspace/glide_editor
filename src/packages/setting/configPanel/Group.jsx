import React, { Fragment } from 'react'

import Item from './Item'

function Group({ groupDefinition }) {
  return (
    <Fragment>
      {groupDefinition.children?.map((itemDefinition) => {
        return <Item key={itemDefinition.name} itemDefinition={itemDefinition} />
      })}
    </Fragment>
  )
}

export default Group
