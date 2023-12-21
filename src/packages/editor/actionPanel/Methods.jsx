import React from 'react'
import { FormItem, FormList } from 'remote:glide_components/Form'
import { Select } from 'remote:glide_components/FormBase'
import { ApiOutlined, PlusOutlined, MinusOutlined } from 'remote:glide_components/Icon'

import styles from './Methods.module.less'
import useEditor from '../model/editor'
import { componentOptionsSelector } from '../selector/editor'
import { scriptOptionsSelector } from '../selector/resource'

function Methods({ name, apis }) {
  const componentOptions = useEditor(componentOptionsSelector)
  const scriptOptions = useEditor(scriptOptionsSelector)

  const apiOptions = apis.map((api) => {
    return { label: api.title, value: api.name }
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
                    <FormItem className={styles.item} required {...method} name={[name, 'apiName']}>
                      <Select style={{ width: '80px' }} placeholder="方法" data={apiOptions} />
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
