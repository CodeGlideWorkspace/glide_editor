import { useEffect } from 'react'
import { useUnmount, usePrevValue } from 'remote:glide_components/hooks'
import { isEqual } from 'remote:glide_components/utils'

function SchedulerController({ node, scheduler, children }) {
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
    scheduler.scheduler.update(node.code, node.config.dependencies)
  }, [node])

  // 节点卸载，注销依赖订阅关系
  useUnmount(() => {
    scheduler.scheduler.unsubscribe(node.code)
  })

  return children
}

export default SchedulerController
