import React from 'react'
import { Layout, Header, Footer, Content, Sider } from 'remote:glide_components/Layout'
import { useEditor, EditorProvider } from '@/packages/editor'
import { View } from '@/packages/view'

import SettingPanel from './components/settingPanel/SettingPanel'
import Toolbar from './components/toolbar/Toolbar'

import styles from './Editor.module.less'

function Editor() {
  const scripts = useEditor.use.scripts()

  return (
    <EditorProvider>
      <Layout className={styles.editor}>
        <Header>顶部Header区域</Header>
        <Layout className={styles.container}>
          <Sider className={styles.left} collapsible width={260} collapsedWidth={40}>
            <div>左侧面板区域</div>
          </Sider>
          <Content className={styles.content}>
            <Layout>
              <Header style={{ height: '38px', lineHeight: '38px' }}>
                <Toolbar />
              </Header>
              <Content className={styles.scroll}>
                <View scripts={scripts} />
              </Content>
            </Layout>
          </Content>
          <Sider className={styles.right} width={320}>
            <SettingPanel />
          </Sider>
        </Layout>
        <Footer>状态栏</Footer>
      </Layout>
    </EditorProvider>
  )
}

export default Editor
