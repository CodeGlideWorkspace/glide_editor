import React from 'react'

import styles from './Index.module.less'
import { LibraryProvider } from '@/packages/library'
import { EditorProvider } from '@/packages/editor'
import { DndContainer } from 'remote:glide_components/Dnd'

import { ConfigPanel, SettingProvider } from '@/packages/setting'
import { Card } from 'remote:glide_components/Card'

const configDefinition = [
  {
    label: '基本信息',
    name: 'base',
    children: [],
  },
  {
    label: '高级配置',
    name: 'senior',
    children: [],
  },
]

export default function Index() {
  return (
    <div className={styles.container}>
      <DndContainer>
        <LibraryProvider />
        <EditorProvider />
        <SettingProvider>
          <div className={styles.setting}>
            <Card title="配置演示">
              <ConfigPanel configDefinition={configDefinition}></ConfigPanel>
            </Card>
          </div>
        </SettingProvider>
      </DndContainer>
    </div>
  )
}
