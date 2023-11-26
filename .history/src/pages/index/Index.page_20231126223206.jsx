import React from 'react'

import styles from './Index.module.less'
import { LibraryProvider } from '@/packages/library'
import { EditorProvider } from '@/packages/editor'
export default function Index() {
  return (
    <div className={styles.container}>
      <LibraryProvider />
      <EditorProvider />
      <div>Setting</div>
    </div>
  )
}
