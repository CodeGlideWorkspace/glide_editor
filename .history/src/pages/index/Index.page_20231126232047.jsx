import React from 'react'

import styles from './Index.module.less'
import { LibraryProvider } from '@/pacK/editor'
import { SettingProvider } from '@/packages/setting'
import { DndContainer } from 'remote:glide_components/Dnd'
export default function Index() {
  return (
    <div className={styles.container}>
      <DndContainer>
        <SettingProvider>Setting</SettingProvider>
      </DndContainer>
    </div>
  )
}
