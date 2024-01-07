import React from 'react'
import { FormItem, FormList } from 'remote:glide_components/Form'
import { Select } from 'remote:glide_components/FormBase'
import { PlusSquareOutlined, MinusSquareOutlined } from 'remote:glide_components/Icon'
import { useEditor, resourceDefinitionSelector } from 'remote:glide_editor/core'

import Methods from './Methods'

import styles from './Actions.module.less'

function Actions({ name: actionsName, node }) {
  const nodeDefinition = useEditor(resourceDefinitionSelector(node?.name))

  // 获取排除自身的已经配置的事件映射表
  function getExcludeEventMap(name) {
    if (!node?.config?.actions) {
      return {}
    }

    return node.config.actions.reduce((result, item, index) => {
      if (index === name) {
        return result
      }

      if (item.eventName) {
        result[item.eventName] = true
      }

      return result
    }, {})
  }

  // 获取可配置的事件名称
  function getEventOptions(excludeEventMap) {
    if (!nodeDefinition?.config?.eventDefinitions) {
      return []
    }

    return nodeDefinition.config.eventDefinitions.reduce((result, item) => {
      if (excludeEventMap[item.name]) {
        return result
      }

      result.push({ label: item.title, value: item.name })
      return result
    }, [])
  }

  return (
    <FormList name={actionsName}>
      {(actions, operator) => {
        return (
          <div className={styles.container}>
            {actions.map(({ key, name, ...action }) => {
              const excludeEventMap = getExcludeEventMap(name)
              const eventOptions = getEventOptions(excludeEventMap)

              return (
                <div key={key} className={styles.action}>
                  <FormItem className={styles.item} label="事件" required {...action} name={[name, 'eventName']}>
                    <Select placeholder="事件" style={{ width: '80%' }} data={eventOptions} />
                  </FormItem>
                  <Methods parentName={[actionsName]} name={[name, 'actions']} />
                  <div className={styles.operator}>
                    <MinusSquareOutlined className={styles.delete} onClick={() => operator.remove(name)} />
                    <PlusSquareOutlined
                      className={styles.add}
                      onClick={() => operator.add({ actions: [{}] }, name + 1)}
                    />
                  </div>
                </div>
              )
            })}
            {!actions.length && (
              <div className={styles.create} onClick={() => operator.add({ actions: [{}] })}>
                <PlusSquareOutlined />
                添加动作
              </div>
            )}
          </div>
        )
      }}
    </FormList>
  )
}

Actions.defaultProps = {
  value: [],
}

export default Actions
