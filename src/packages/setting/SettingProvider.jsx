import React from 'react'

export const SettingContext = React.createContext({
  /**
   * 存储配置组件的
   *
   *  [nodeName]: [remotePath]
   *
   *  eg:
   *  {
   *    input: {
   *      componentPath: 'remote:glide_components/Input',
   *    },
   *  }
   */
  itemPathMap: {},
})

function SettingProvider({ children }) {
  const itemPathMap = {
    input: {
      componentPath: 'remote:glide_components/Input',
    },
  }

  return <SettingContext.Provider value={{ itemPathMap }}>{children}</SettingContext.Provider>
}

export default SettingProvider
