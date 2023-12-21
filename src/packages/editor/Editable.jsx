import React, { useState } from 'react'
import { useMount } from 'remote:glide_components/hooks'
import useEditor from './model/editor'

function Editable({ children }) {
  const [status, setStatus] = useState('pending')

  const loadScripts = useEditor.use.loadScripts()
  const loadItems = useEditor.use.loadItems()
  const loadComponents = useEditor.use.loadComponents()

  function bootstrap() {
    return Promise.all([loadScripts(), loadItems(), loadComponents()])
  }

  useMount(() => {
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
