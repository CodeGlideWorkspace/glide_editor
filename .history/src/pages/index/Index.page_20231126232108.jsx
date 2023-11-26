import React from 'react'

import styles from './Index.module.less'
import { SettingProvider } from '@/packages/setting'
export default function Index() {
  return (
    <div className={styles.container}>
        <SettingProvider>Setting</SettingProvider>
    </div>
  )
}
