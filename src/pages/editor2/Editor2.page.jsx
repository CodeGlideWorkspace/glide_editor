import React, { useState } from 'react'
import { Layout, Header, Footer, Content, Sider } from 'remote:glide_components/Layout'
import { useEditor, resourceDefinitionsSelectorByType, resourcesSelectorByType } from 'remote:glide_editor/core'
import { useAction, useScheduler, SchedulerController } from 'remote:glide_editor/ActionPanel'
import { Plugin } from 'remote:glide_editor/Plugin'
import { Setting } from 'remote:glide_editor/Setting'
import { Render } from 'remote:glide_editor/Render'
import { Toolbar } from 'remote:glide_editor/Toolbar'

import './register'

import styles from './Editor2.module.less'

function Editor() {
  const scheduler = useScheduler()
  const node = useEditor((state) => state.node)
  const nodeDefinitions = useEditor(resourceDefinitionsSelectorByType('material'))
  const materials = useEditor(resourcesSelectorByType('material'))
  const scripts = useEditor(resourcesSelectorByType('script'))
  const action = useAction({ scripts })
  const [collapsed, setCollapsed] = useState(false)

  const nodeConfigs = nodeDefinitions.map((definition) => definition.module.config)

  function handleCollapse(value) {
    setCollapsed(value)
  }

  function renderComponentProps({ node: n, config }) {
    const isExist = !!config?.apiDefinitions?.length
    const refs = {}
    if (isExist) {
      refs.ref = (el) => {
        action.register(n.code, el)
      }
    }

    return {
      glide: scheduler.render(n),
      ...refs,
      ...action.render(n, config),
    }
  }

  function renderComponentContainer({ node: n, config }, component) {
    // 包裹调度器控制器组件
    return (
      <SchedulerController key={node.code} node={node} scheduler={scheduler}>
        {component}
      </SchedulerController>
    )
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
              <Render
                node={node}
                configs={nodeConfigs}
                materials={materials}
                renderProps={renderComponentProps}
                renderContainer={renderComponentContainer}
              />
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
