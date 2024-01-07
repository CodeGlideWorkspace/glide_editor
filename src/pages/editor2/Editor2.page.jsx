import React, { useState } from 'react'
import { Layout, Header, Footer, Content, Sider } from 'remote:glide_components/Layout'
import { useEditor, resourceDefinitionsSelector, resourcesSelector } from 'remote:glide_editor/core'
import { Plugin } from 'remote:glide_editor/Plugin'
import { Setting } from 'remote:glide_editor/Setting'
import { Render } from 'remote:glide_editor/Render'
import { Toolbar } from 'remote:glide_editor/Toolbar'

import './register'

import styles from './Editor2.module.less'

function Editor() {
  const node = useEditor((state) => state.node)
  const nodeDefinitions = useEditor(resourceDefinitionsSelector('material'))
  const materials = useEditor(resourcesSelector('material'))
  const nodeConfigs = nodeDefinitions.map((definition) => definition.config)
  const [collapsed, setCollapsed] = useState(false)

  function handleCollapse(value) {
    setCollapsed(value)
  }

  return (
    <Layout className={styles.editor}>
      <Header className={styles.header}>
        <div className={styles.logo}>Code Glide</div>
        <div className={styles.action}>
          <button>预览</button>
          <button>保存</button>
          <button>另存为</button>
        </div>
      </Header>
      <Layout className={styles.container}>
        <Sider className={styles.left} collapsible width={260} collapsedWidth={41} onCollapse={handleCollapse}>
          <Plugin collapsed={collapsed} />
        </Sider>
        <Content className={styles.content}>
          <Layout>
            <Header style={{ height: '38px', lineHeight: '38px' }}>
              <Toolbar />
            </Header>
            <Content className={styles.scroll}>
              <Render node={node} configs={nodeConfigs} materials={materials} />
            </Content>
          </Layout>
        </Content>
        <Sider className={styles.right} width={320}>
          <Setting />
        </Sider>
      </Layout>
      <Footer>状态栏</Footer>
    </Layout>
  )
}

export default Editor
