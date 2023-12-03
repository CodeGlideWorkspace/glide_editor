import React from 'react'
import { Layout, Header, Footer, Content, Sider } from 'remote:glide_components/Layout'
import { useDemo } from '@/packages/editor'
import SettingPanel from './components/settingPanel/SettingPanel'

import styles from './Editor.module.less'

function Editor() {
  const values = useDemo((state) => state.configValue)

  return (
    <Layout className={styles.editor}>
      <Header>顶部Header区域</Header>
      <Layout className={styles.container}>
        <Sider className={styles.left} collapsible width={260} collapsedWidth={40}>
          <div>左侧面板区域</div>
        </Sider>
        <Content className={styles.content}>
          <code>{JSON.stringify(values)}</code>
        </Content>
        <Sider className={styles.right} width={320}>
          <SettingPanel />
        </Sider>
      </Layout>
      <Footer>状态栏</Footer>
    </Layout>
  )
}

export default Editor
