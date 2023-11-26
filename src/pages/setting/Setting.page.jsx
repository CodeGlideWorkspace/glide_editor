import React from 'react'
import { ConfigPanel, SettingProvider } from '@/packages/setting'
import { Module } from 'remote:glide_components/Module'

import styles from './Setting.module.less'

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

function handleChange(values) {
  console.log('Config Change...', values)
}

function Setting() {
  return (
    <SettingProvider>
      <div className={styles.setting}>
        <Module title="配置演示">
          <ConfigPanel configDefinitions={configDefinitions} onChange={handleChange}></ConfigPanel>
        </Module>
      </div>
    </SettingProvider>
  )
}

export default Setting
