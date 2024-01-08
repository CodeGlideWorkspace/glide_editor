import React, { useState, useRef, useEffect } from 'react'
import { Layout, Content, Sider } from 'remote:glide_components/Layout'
import { Remote } from 'remote:glide_components/Remote'
import { useEditor, resourcesSelectorByType } from 'remote:glide_editor/core'
import { classNames } from 'remote:glide_components/utils'
import { QuestionCircleOutlined } from 'remote:glide_components/Icon'

import styles from './Plugin.module.less'

function Plugin({ collapsed }) {
  const [name, setName] = useState()
  const timer = useRef(null)
  const plugins = useEditor(resourcesSelectorByType('plugin'))

  // 当前高亮的名字
  const currentName = name || plugins[0]?.name
  const currentPlugin = plugins.find((item) => item.name === currentName)
  const hoverPlugin = plugins.find((item) => item.name === name)

  useEffect(() => {
    if (collapsed) {
      setName('')
    }
  }, [collapsed])

  function renderHeaders() {
    return (
      <div className={styles.plugins}>
        {plugins.map((plugin, index) => {
          return (
            <div
              key={plugin.name}
              className={classNames(styles.item, {
                [styles.active]: collapsed ? name === plugin.name : currentName === plugin.name,
              })}
              onClick={() => {
                if (collapsed) {
                  return
                }
                setName(plugin.name)
              }}
              onMouseEnter={() => {
                if (!collapsed) {
                  return
                }
                if (timer.current) {
                  clearTimeout(timer.current)
                  timer.current = null
                }
                setName(plugin.name)
              }}
              onMouseLeave={() => {
                if (!collapsed) {
                  return
                }
                timer.current = setTimeout(() => {
                  setName('')
                }, 100)
              }}
            >
              {plugin.icon}
            </div>
          )
        })}
      </div>
    )
  }

  function renderTools() {
    return (
      <div className={styles.tool}>
        <div className={styles.item}>
          <QuestionCircleOutlined />
        </div>
      </div>
    )
  }

  function renderContent(plugin) {
    return (
      <div className={styles.static}>
        <Remote $$path={{ path: plugin.path, exportName: plugin.exportName }} />
      </div>
    )
  }

  function renderFloatContent(plugin) {
    if (!plugin) {
      return null
    }

    return (
      <div
        className={styles.float}
        onMouseEnter={() => {
          if (!collapsed) {
            return
          }

          if (timer.current) {
            clearTimeout(timer.current)
            timer.current = null
          }
        }}
        onMouseLeave={() => {
          if (!collapsed) {
            return
          }

          setName('')
        }}
      >
        {renderContent(plugin)}
      </div>
    )
  }

  return (
    <Layout className={styles.plugin}>
      <Sider className={styles.side} width={41}>
        <div className={styles.header}>
          {renderHeaders()}
          {renderTools()}
        </div>
      </Sider>
      <Content className={styles.content}>
        {collapsed ? renderFloatContent(hoverPlugin) : renderContent(currentPlugin)}
      </Content>
    </Layout>
  )
}

export default Plugin
