import React from 'react'
import { ConfigPanel, SettingProvider } from '@/packages/setting'
import { Card } from 'remote:glide_components/Card'

import styles from './Setting.module.less'

const configDefinitions = [
  {
    label: '输入框',
    name: 'text3',
    node: 'input',
    description: '这里是长长的描述信息啊啊',
    tip: '提示信息',
    defaultValue: '',
    validates: [],
    direction: 'horizontal',
    props: {},
  },
  {
    label: '基本信息',
    name: 'base',
    children: [
      {
        label: '文本域',
        name: 'text',
        node: 'textarea',
        description: '这里是长长的描述信息啊啊',
        tip: '提示信息',
        defaultValue: '',
        validates: [],
        direction: 'vertical',
        props: {},
      },
      {
        label: '数值输入框',
        name: 'text2',
        node: 'number',
        description: '这里是长长的描述信息啊啊',
        tip: '提示信息',
        defaultValue: '',
        validates: [],
        direction: 'horizontal',
        props: {},
      },
      {
        label: '开关',
        name: 'switch1',
        node: 'switch',
        description: '这里是长长的描述信息啊啊',
        tip: '提示信息',
        defaultValue: '',
        validates: [],
        direction: 'horizontal',
        props: {},
      },
    ],
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
          <ConfigPanel configDefinitions={configDefinitions}></ConfigPanel>
        </Card>
      </div>
    </SettingProvider>
  )
}

export default Setting
