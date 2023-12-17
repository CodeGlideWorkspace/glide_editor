import React from 'react'
import { FormItem, FormList } from 'remote:glide_components/Form'
import { Select } from 'remote:glide_components/FormBase'
import { ApiOutlined, PlusOutlined, MinusOutlined } from 'remote:glide_components/Icon'

import styles from './Methods.module.less'

function Methods({ name, methods, components, scripts }) {
  const componentOptions = components.map((component) => {
    return { label: component.name, value: component.code }
  })

  const scriptOptions = scripts.map((script) => {
    return { label: script.name, value: script.code }
  })

  const methodOptions = methods.map((method) => {
    return { label: method.name, value: method.code }
  })

  return (
    <FormList name={name}>
      {(methods, operator) => {
        return (
          <>
            {methods.map(({ key, name, ...method }) => {
              return (
                <div key={key} className={styles.method}>
                  <div className={styles.component}>
                    <ApiOutlined className={styles.icon} />
                    <FormItem className={styles.item} required {...method} name={[name, 'componentCode']}>
                      <Select style={{ width: '168px' }} placeholder="触发组件" data={componentOptions} />
                    </FormItem>
                    <div className={styles.operator}>
                      <MinusOutlined className={styles.delete} onClick={() => operator.remove(name)} />
                      <PlusOutlined className={styles.add} onClick={() => operator.add({}, name + 1)} />
                    </div>
                  </div>
                  <div className={styles.content}>
                    <FormItem className={styles.item} required {...method} name={[name, 'scriptCode']}>
                      <Select style={{ width: '80px' }} placeholder="转换脚本" data={scriptOptions} />
                    </FormItem>
                    <FormItem className={styles.item} required {...method} name={[name, 'methodCode']}>
                      <Select style={{ width: '80px' }} placeholder="方法" data={methodOptions} />
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
