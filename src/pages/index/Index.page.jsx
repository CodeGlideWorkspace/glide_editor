import React from 'react'

import styles from './Index.module.less'
import { LibraryProvider } from '@/packages/library'
import { EditorProvider } from '@/packages/editor'
import { DndContainer } from 'remote:glide_components/Dnd'

import { ConfigPanel, SettingProvider } from '@/packages/setting'
import { Module } from 'remote:glide_components/Module'
import { Col, Row } from 'remote:glide_components/Grid'

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
        <Row>
          <Col span={6}>
            <LibraryProvider></LibraryProvider>
          </Col>
          <Col span={12}>
            <EditorProvider />
          </Col>
          <Col span={6}>
            <SettingProvider>
              <div className={styles.setting}>
                <Module title="配置演示">
                  <ConfigPanel configDefinition={configDefinition}></ConfigPanel>
                </Module>
              </div>
            </SettingProvider>
          </Col>
        </Row>
      </DndContainer>
    </div>
  )
}
