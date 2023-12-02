import React from 'react'
// import { Remote } from 'remote:glide_components/Remote'

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

  return (
    <SettingContext.Provider value={{ itemPathMap }}>
      {/* <Remote path={itemPathMap.input.componentPath} /> */}
      {children}
    </SettingContext.Provider>
  )
}

export default SettingProvider
