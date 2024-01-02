import React, { useState } from 'react'
import { share } from 'doer'
import { useMount } from 'remote:glide_components/hooks'

import useEditor from './model/editor'
import Plugin from './Plugin'

function Editable({ children }) {
  const [status, setStatus] = useState('pending')

  const loadScripts = useEditor.use.loadScripts()
  const loadItems = useEditor.use.loadItems()
  const loadComponents = useEditor.use.loadComponents()

  function bootstrap() {
    return Promise.all([loadScripts(), loadItems(), loadComponents()])
  }

  useMount(() => {
    // 共享插件体系，这样对应的业务组件可以通过apply('plugin')获取插件API
    share('plugin', new Plugin())

    // 启动前置资源加载
    bootstrap()
      .then(() => {
        setStatus('completed')
      })
      .catch(() => {
        setStatus('error')
      })
  })

  if (status === 'pending') {
    return <div>系统配置中</div>
  }

  if (status === 'error') {
    return <div>系统设置错误</div>
  }

  return children
}

export default Editable
