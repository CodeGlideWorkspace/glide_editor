import React from 'react'
import { Layout, Header, Footer, Content, Sider } from 'remote:glide_components/Layout'
import { Editable, useEditor, componentPathMapSelector, componentMapSelector } from '@/packages/editor'
import { View } from '@/packages/view'
import { useMount } from 'remote:glide_components/hooks'

import SettingPanel from './components/settingPanel/SettingPanel'
import Toolbar from './components/toolbar/Toolbar'

import styles from './Editor.module.less'

function Editor() {
  const componentPathMap = useEditor(componentPathMapSelector)
  const componentMap = useEditor(componentMapSelector)
  const node = useEditor.use.node()
  const createPageNode = useEditor.use.createPageNode()
  const createNode = useEditor.use.createNode()
  const appendNode = useEditor.use.appendNode()
  const scripts = useEditor.use.scripts()

  useMount(() => {
    // 初始化一个空页面
    createPageNode()
  })

  function handleAdd() {
    appendNode({ node: createNode('BizTable') })
  }

  return (
    <Editable>
      <Layout className={styles.editor}>
        <Header>
          <button onClick={handleAdd}>添加一个组件</button>
        </Header>
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
                <View node={node} scripts={scripts} componentMap={componentMap} componentPathMap={componentPathMap} />
              </Content>
            </Layout>
          </Content>
          <Sider className={styles.right} width={320}>
            <SettingPanel />
          </Sider>
        </Layout>
        <Footer>状态栏</Footer>
      </Layout>
    </Editable>
  )
}

export default Editor
