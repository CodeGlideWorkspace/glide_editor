import React from 'react'
import { FormItem, FormList } from 'remote:glide_components/Form'
import { Select } from 'remote:glide_components/FormBase'
import { ApiOutlined, PlusOutlined, MinusOutlined } from 'remote:glide_components/Icon'

import styles from './Actions.module.less'

function Actions({ name, apiOptions, componentOptions, scriptOptions }) {
  return (
    <FormList name={name}>
      {(actions, operator) => {
        return (
          <>
            {actions.map(({ key, name, ...action }) => {
              return (
                <div key={key} className={styles.action}>
                  <div className={styles.component}>
                    <ApiOutlined className={styles.icon} />
                    <FormItem className={styles.item} required {...action} name={[name, 'componentId']}>
                      <Select style={{ width: '168px' }} placeholder="触发组件" data={componentOptions} />
                    </FormItem>
                    <div className={styles.operator}>
                      <MinusOutlined className={styles.delete} onClick={() => operator.remove(name)} />
                      <PlusOutlined className={styles.add} onClick={() => operator.add({}, name + 1)} />
                    </div>
                  </div>
                  <div className={styles.content}>
                    <FormItem className={styles.item} required {...action} name={[name, 'scriptId']}>
                      <Select style={{ width: '80px' }} placeholder="转换脚本" data={scriptOptions} />
                    </FormItem>
                    <FormItem className={styles.item} required {...action} name={[name, 'methodName']}>
                      <Select style={{ width: '80px' }} placeholder="方法" data={apiOptions} />
                    </FormItem>
                  </div>
                </div>
              )
            })}
            {!actions.length && (
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

export default Actions
