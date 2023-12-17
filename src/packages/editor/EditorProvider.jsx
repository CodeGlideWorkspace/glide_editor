import React, { createContext } from 'react'

export const EditorContext = createContext({
  /**
   * 存储脚本对象
   *
   * @type Script
   *
   * @property {String} name 脚本名称
   * @property {String} language 脚本语言 javascript | typescript
   * @property {String} source 源代码
   * @property {String} target 目标代码
   */
  scripts: [],

  /**
   * 存储配置组件的
   *
   *  [nodeName]: [remotePath] || { path: [remotePath], exportName: [exportName] }
   *
   *  eg:
   *  {
   *    input: {
   *      path: 'remote:glide_components/Input',
   *      exportName: 'default',
   *    },
   *  }
   */
  itemMap: {},
})

export function EditorProvider({ children }) {
  const itemMap = {
    input: {
      path: 'remote:glide_public_components/Items',
      exportName: 'Input',
    },
    select: {
      path: 'remote:glide_public_components/Items',
      exportName: 'Select',
    },
    number: {
      path: 'remote:glide_public_components/Items',
      exportName: 'Number',
    },
    switch: {
      path: 'remote:glide_public_components/Items',
      exportName: 'Switch',
    },
  }

  const scripts = []

  return <EditorContext.Provider value={{ itemMap, scripts }}>{children}</EditorContext.Provider>
}
