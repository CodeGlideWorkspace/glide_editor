import React from 'react'
import { FormItem, FormList } from 'remote:glide_components/Form'
import { Select } from 'remote:glide_components/FormBase'
import { ApiOutlined, PlusOutlined, MinusOutlined } from 'remote:glide_components/Icon'
import {
  useEditor,
  nodeSelector,
  nodesSelector,
  resourcesSelector,
  resourceDefinitionSelector,
} from 'remote:glide_editor/core'

import styles from './Methods.module.less'

function Methods({ parentName, name: listName }) {
  const nodes = useEditor(nodesSelector)
  const scripts = useEditor(resourcesSelector('paramAdapter'))

  const nextParentName = [...parentName, ...listName]

  const nodeOptions = nodes.map((node) => {
    return { label: node.ref, value: node.code }
  })
  const scriptOptions = scripts.map((script) => {
    return { label: script.title, value: script.name }
  })

  return (
    <FormList name={listName}>
      {(methods, operator) => {
        return (
          <>
            {methods.map(({ key, name, ...method }) => {
              return (
                <div key={key} className={styles.method}>
                  <div className={styles.component}>
                    <ApiOutlined className={styles.icon} />
                    <FormItem className={styles.item} required {...method} name={[name, 'componentCode']}>
                      <Select style={{ width: '168px' }} placeholder="触发组件" data={nodeOptions} />
                    </FormItem>
                    <div className={styles.operator}>
                      <MinusOutlined className={styles.delete} onClick={() => operator.remove(name)} />
                      <PlusOutlined className={styles.add} onClick={() => operator.add({}, name + 1)} />
                    </div>
                  </div>
                  <div className={styles.content}>
                    <FormItem className={styles.item} {...method} name={[name, 'scriptName']}>
                      <Select style={{ width: '80px' }} placeholder="转换脚本" data={scriptOptions} />
                    </FormItem>
                    <FormItem dependencies={[[...nextParentName, name, 'componentCode']]} noStyle>
                      {(form) => {
                        const state = useEditor.getState()
                        // 获取所选组件的api选项
                        const selectNodeCode = form.getValue([...nextParentName, name, 'componentCode'])
                        const selectNode = nodeSelector(selectNodeCode)(state)
                        const selectNodeDefinition = resourceDefinitionSelector(selectNode?.name)(state)

                        let apiOptions = []
                        if (selectNodeDefinition?.config?.apiDefinitions) {
                          apiOptions = selectNodeDefinition.config.apiDefinitions.map((item) => {
                            return { label: item.title, value: item.name }
                          })
                        }

                        return (
                          <FormItem className={styles.item} required {...method} name={[name, 'apiName']}>
                            <Select style={{ width: '80px' }} placeholder="方法" data={apiOptions} />
                          </FormItem>
                        )
                      }}
                    </FormItem>
                  </div>
                </div>
              )
            })}
            {!methods.length && (
              <div className={styles.create} onClick={() => operator.add({})}>
                <PlusOutlined />
                添加
              </div>
            )}
          </>
        )
      }}
    </FormList>
  )
}

export default Methods
