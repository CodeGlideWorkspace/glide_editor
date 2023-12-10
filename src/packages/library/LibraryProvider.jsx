import React from 'react'
import { Module } from 'remote:glide_components/Module'
import ComponentPanel from './componentPanel/ComponentPanel'
import styles from './LibraryProvider.module.less'

const configDefinition = [
  {
    label: '基础组件',
    name: 'base',
    children: [
      {
        label: '按钮',
        name: 'Button',
        url: 'https://gw.alipayobjects.com/zos/rmsportal/ndmJrAzNqTcQcMTojXKw.png',
      },
      {
        label: '分割线',
        name: 'Divider',
        url: 'https://gw.alipayobjects.com/zos/rmsportal/ndmJrAzNqTcQcMTojXKw.png',
      },
    ],
  },
  {
    label: '布局组件',
    name: 'layout',
    children: [
      {
        label: '行',
        name: 'Row',
        url: 'https://gw.alipayobjects.com/zos/rmsportal/ndmJrAzNqTcQcMTojXKw.png',
      },
      {
        label: '列',
        name: 'Col',
        url: 'https://gw.alipayobjects.com/zos/rmsportal/ndmJrAzNqTcQcMTojXKw.png',
      },
    ],
  },
  {
    label: '业务组件',
    name: 'businessComponent',
    children: [
      {
        label: '基础表格',
        name: 'BaseTable',
        url: 'https://gw.alipayobjects.com/zos/rmsportal/ndmJrAzNqTcQcMTojXKw.png',
      },
    ],
  },
]
function LibraryProvider({ children }) {
  return (
    <div>
      <div className={styles.library}>
        <Module title="组件库">
          <ComponentPanel configDefinition={configDefinition}></ComponentPanel>
        </Module>
      </div>
    </div>
  )
}
export default LibraryProvider
