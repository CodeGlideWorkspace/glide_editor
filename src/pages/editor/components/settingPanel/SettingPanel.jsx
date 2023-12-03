import React from 'react'
import { Setting, SettingProvider } from '@/packages/editor'
import { Module } from 'remote:glide_components/Module'
import { Tab, TabPanel } from 'remote:glide_components/Tab'

import styles from './SettingPanel.module.less'

const configDefinitions = [
  {
    label: '输入框',
    name: 'text3',
    node: 'input',
    description: '这里是长长的描述信息啊啊',
    tip: '提示信息',
    defaultValue: '',
    validators: [],
    layout: 'horizontal',
    props: {},
  },
  {
    label: '基本信息',
    name: 'base',
    children: [
      {
        label: '文本域',
        name: 'text',
        node: 'input',
        description: '这里是长长的描述信息啊啊',
        tip: '提示信息',
        defaultValue: '',
        validators: [
          (value, form) => {
            console.log(form.getValues(), '...')
            return '校验失败'
          },
        ],
        /**
         * 检测是否显示
         */
        visible(value, form) {
          const text3 = form.getValue('text3')
          if (text3 === '1') {
            return false
          }
        },
        layout: 'vertical',
        required: true,
        dependencies: ['text3'],
        props: {
          type: 'textarea',
        },
      },
      {
        label: '数值输入框',
        name: 'text2',
        node: 'number',
        description: '这里是长长的描述信息啊啊',
        tip: '提示信息',
        defaultValue: '',
        validators: [],
        layout: 'horizontal',
        props: {},
      },
      {
        label: '开关',
        name: 'switch1',
        node: 'switch',
        description: '这里是长长的描述信息啊啊',
        tip: '提示信息',
        defaultValue: '',
        validators: [],
        layout: 'horizontal',
        props: {},
      },
    ],
  },
  {
    label: '高级配置',
    name: 'senior',
    children: [
      {
        name: 'hidden',
        node: 'hidden',
        defaultValue: 'hidden data',
      },
    ],
  },
]

function SettingPanel() {
  return (
    <Module className={styles.panel} bordered={false} bodyStyle={{ padding: '0 16px 16px' }} title="组件名称">
      <SettingProvider>
        <Tab>
          <TabPanel name="property" title="属性">
            <Setting configDefinitions={configDefinitions} />
          </TabPanel>
          <TabPanel name="style" title="样式">
            样式面板
          </TabPanel>
          <TabPanel name="data" title="数据">
            数据面板
          </TabPanel>
          <TabPanel name="action" title="动作">
            动作面板
          </TabPanel>
          <TabPanel name="senior" title="高级">
            高级面板
          </TabPanel>
        </Tab>
      </SettingProvider>
    </Module>
  )
}

export default SettingPanel
