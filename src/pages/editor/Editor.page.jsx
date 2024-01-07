import React from 'react'
import { Layout, Header, Footer, Content, Sider } from 'remote:glide_components/Layout'
import { Editable, useEditor, componentPathMapSelector, componentMapSelector, LibraryProvider } from '@/packages/editor'
import { View } from '@/packages/view'
import { DndProvider } from 'remote:glide_components/Dnd'

import { useMount } from 'remote:glide_components/hooks'
import SettingPanel from './components/settingPanel/SettingPanel'
import Toolbar from './components/toolbar/Toolbar'

import styles from './Editor.module.less'
import { Draggable, Empty } from '../../packages/editor'

function Editor() {
  const componentPathMap = useEditor(componentPathMapSelector)
  const componentMap = useEditor(componentMapSelector)
  const node = useEditor.use.node()
  const initialEditor = useEditor.use.initialEditor()
  const createEditorNode = useEditor.use.createEditorNode()
  const appendEditorNode = useEditor.use.appendEditorNode()
  const scripts = useEditor.use.scripts()

  useMount(() => {
    // 初始化编辑器
    initialEditor()
  })

  function handleAdd() {
    appendEditorNode({ node: createEditorNode('BizTable') })
  }

  return (
    <Editable>
      <DndProvider>
        <Layout className={styles.editor}>
          <Header>
            <button onClick={handleAdd}>添加一个组件</button>
          </Header>
          <Layout className={styles.container}>
            <Sider className={styles.left} collapsible width={260} collapsedWidth={40}>
              <LibraryProvider />
            </Sider>
            <Content className={styles.content}>
              <Layout>
                <Header style={{ height: '38px', lineHeight: '38px' }}>
                  <Toolbar />
                </Header>
                <Content className={styles.scroll}>
                  <View
                    node={node}
                    wrapper={({ node, children }) => {
                      return <Draggable item={{ data: node, role: 'view' }}>{children}</Draggable>
                    }}
                    empty={({ component }) => <Empty component={component}></Empty>}
                    scripts={scripts}
                    componentMap={componentMap}
                    componentPathMap={componentPathMap}
                  />
                </Content>
              </Layout>
            </Content>
            <Sider className={styles.right} width={320}>
              <SettingPanel />
            </Sider>
          </Layout>
          <Footer>状态栏</Footer>
        </Layout>
      </DndProvider>
    </Editable>
  )
}

export default Editor
