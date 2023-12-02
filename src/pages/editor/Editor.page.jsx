import React from 'react'
import { Layout, Header, Footer, Content, Sider } from 'remote:glide_components/Layout'

import SettingPanel from './components/settingPanel/SettingPanel'

import styles from './Editor.module.less'

function Editor() {
  return (
    <Layout className={styles.editor}>
      <Header>顶部Header区域</Header>
      <Layout className={styles.container}>
        <Sider className={styles.left} collapsible width={260} collapsedWidth={40}>
          <div>左侧面板区域</div>
        </Sider>
        <Content className={styles.content}>
          <div>正文内容区域</div>
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
