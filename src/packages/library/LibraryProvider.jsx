import React from 'react'

import styles from './LibraryProvider.module.less'
import { Button } from 'remote:glide_components/Button'
import { Draggable } from 'remote:glide_components/Dnd'
function LibraryProvider(params) {
  return (
    <div className={styles.container}>
      <Draggable type="button">
        <Button type="primary">Module</Button>
      </Draggable>
    </div>
  )
}
export default LibraryProvider
