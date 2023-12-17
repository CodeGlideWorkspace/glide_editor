import React from 'react'
import { FormItem, FormList } from 'remote:glide_components/Form'
import { Select } from 'remote:glide_components/FormBase'
import { PlusSquareOutlined, MinusSquareOutlined } from 'remote:glide_components/Icon'

import Methods from './Methods'

import styles from './Actions.module.less'

function Actions({ name, events, methods, components, scripts }) {
  const eventOptions = events.map((event) => {
    return { label: event.name, value: event.code }
  })

  return (
    <FormList name={name}>
      {(actions, operator) => {
        return (
          <div className={styles.container}>
            {actions.map(({ key, name, ...action }) => {
              return (
                <div key={key} className={styles.action}>
                  <FormItem className={styles.item} label="事件" required {...action} name={[name, 'eventCode']}>
                    <Select placeholder="事件" style={{ width: '80%' }} data={eventOptions} />
                  </FormItem>
                  <Methods name={[name, 'methods']} methods={methods} components={components} scripts={scripts} />
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

export default Actions
