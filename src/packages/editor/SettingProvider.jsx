import React from 'react'

export const SettingContext = React.createContext({
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
  itemPathMap: {},
})

function SettingProvider({ children }) {
  const itemPathMap = {
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

  return <SettingContext.Provider value={{ itemPathMap }}>{children}</SettingContext.Provider>
}

export default SettingProvider
