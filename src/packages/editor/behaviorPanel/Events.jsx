import React from 'react'
import { FormItem, FormList } from 'remote:glide_components/Form'
import { Select } from 'remote:glide_components/FormBase'
import { PlusSquareOutlined, MinusSquareOutlined } from 'remote:glide_components/Icon'

import Actions from './Actions'

import styles from './Events.module.less'

function Events({ name, eventOptions, apiOptions, componentOptions, scriptOptions }) {
  return (
    <FormList name={name}>
      {(events, operator) => {
        return (
          <div className={styles.container}>
            {events.map(({ key, name, ...event }) => {
              return (
                <div key={key} className={styles.event}>
                  <FormItem className={styles.item} label="事件" required {...event} name={[name, 'eventId']}>
                    <Select placeholder="事件" style={{ width: '80%' }} data={eventOptions} />
                  </FormItem>
                  <Actions
                    name={[name, 'actions']}
                    apiOptions={apiOptions}
                    componentOptions={componentOptions}
                    scriptOptions={scriptOptions}
                  />
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
            {!events.length && (
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

export default Events
