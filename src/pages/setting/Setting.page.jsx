import React from 'react'
import { ConfigPanel, SettingProvider } from '@/packages/setting'
import { Card } from 'remote:glide_components/Card'

import styles from './Setting.module.less'

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

function Setting() {
  return (
    <SettingProvider>
      <div className={styles.setting}>
        <Card title="配置演示">
          <ConfigPanel configDefinition={configDefinition}></ConfigPanel>
        </Card>
      </div>
    </SettingProvider>
  )
}

export default Setting
