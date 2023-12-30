import { useEffect } from 'react'
import { useUnmount, usePrevValue } from 'remote:glide_components/hooks'
import { isEqual } from 'remote:glide_components/utils'

function Controller({ node, glide, children }) {
  const prevNode = usePrevValue(node)

  // 节点依赖产生变化，更新依赖
  useEffect(() => {
    if (!prevNode) {
      return
    }

    // 节点依赖是否发生变化
    if (isEqual(node.config.dependencies, prevNode.config.dependencies)) {
      return
    }
    glide.scheduler.update(node.code, node.config.dependencies)
  }, [node])

  // 节点卸载，注销依赖订阅关系
  useUnmount(() => {
    glide.scheduler.unsubscribe(node.code)
  })

  return children
}

export default Controller
