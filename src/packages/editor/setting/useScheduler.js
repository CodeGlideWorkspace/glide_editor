import React, { useRef } from 'react'
import { EventEmitter, EventAsync } from 'remote:glide_components/EventEmitter'
import { findTrees, eachTrees } from 'remote:glide_components/utils'

class Node {
  // 节点名称
  name = ''

  // 子节点
  children = []

  // 节点依赖
  dependencies = []

  constructor(option) {
    this.name = option.name
    this.dependencies = option.dependencies || []
  }

  push(node) {
    this.children.push(node)
  }
}

class Scheduler {
  /**
   * 存储表单实例
   */
  form = null

  /**
   * 事件触发，使用异步并行模式
   */
  eventEmitter = new EventEmitter(EventAsync)

  /**
   * 节点树
   *
   * @type {Array<Node>}
   */
  nodes = []

  /**
   * 孤儿节点
   *
   * @type {Object<{ [parentNodeName]: Array<Node> }>}
   */
  orphanNodes = {}

  /**
   * 记录隐藏的组件
   *
   * @type {Object<{ [name]: boolean }>}
   */
  hidden = {}

  constructor(form) {
    this.form = form
  }

  show(name) {
    this.hidden[name] = false
  }

  hide(name) {
    this.hidden[name] = true
  }

  /**
   * 链接孤儿节点
   */
  linkOrphanNodes(node) {
    const nodes = this.orphanNodes[node.name]
    if (!nodes?.length) {
      return
    }

    delete this.orphanNodes[node.name]
    nodes.forEach((n) => {
      node.children.push(n)
      this.linkOrphanNodes(n)
    })
  }

  /**
   * 保存孤儿节点
   */
  saveOrphanNode(node, parentNodeName) {
    if (!this.orphanNodes[parentNodeName]) {
      this.orphanNodes[parentNodeName] = []
    }

    this.orphanNodes[parentNodeName].push(node)
  }

  link(node, parentNodeName) {
    if (!parentNodeName) {
      this.nodes.push(node)
      this.linkOrphanNodes(node)
      return
    }

    const parentNode = findTrees(this.nodes, (n) => n.name === parentNodeName)
    // 父节点不存在时，可能是因为顺序导致父节点还未注册，因此暂时存在孤儿节点中
    if (!parentNode) {
      this.saveOrphanNode(node, parentNodeName)
      return
    }

    // 添加到父节点中
    parentNode.children.push(node)
    // 添加当前节点的孤儿节点
    this.linkOrphanNodes(node)
  }

  /**
   * 根据依赖关系执行节点
   */
  async exec(nodes) {
    // 访问记录
    const visited = {}
    // 获取待执行的节点
    let needExecNodes = []
    eachTrees(nodes, (item) => {
      needExecNodes.push(item)
      visited[item.name] = false
    })

    let prevCount = 0
    while (needExecNodes.length && (!prevCount || prevCount !== needExecNodes.length)) {
      prevCount = needExecNodes.length
      const { readyNodes, unReadyNodes } = needExecNodes.reduce(
        (result, item) => {
          const ready = item.dependencies.every((parentNodeName) => {
            return this.hidden[parentNodeName] || !(parentNodeName in visited) || visited[parentNodeName]
          })
          ready ? result.readyNodes.push(item) : result.unReadyNodes.push(item)

          return result
        },
        { readyNodes: [], unReadyNodes: [] },
      )

      needExecNodes = unReadyNodes

      const tasks = readyNodes.reduce((result, item) => {
        result.push(this.eventEmitter.emit(item.name, this.form))
        visited[item.name] = true
        return result
      }, [])

      await Promise.all(tasks).catch((error) => {
        console.error(error)
      })
    }
  }

  /**
   * 组件订阅更新
   *
   * @param {String} name 表单项名称
   * @param {Function} handle 更新触发的句柄
   */
  subscribe(name, handle, dependencies = []) {
    this.eventEmitter.on(name, handle)

    // 不存在依赖时，链接节点到根节点
    if (!dependencies.length) {
      this.link(new Node({ name, dependencies }))
      return
    }

    // 存在依赖时，链接节点到依赖节点
    dependencies.forEach((parentNodeName) => {
      this.link(new Node({ name, dependencies }), parentNodeName)
    })
  }

  async start() {
    await this.exec(this.nodes)
  }

  /**
   * 组件变更时调用
   */
  async change(name) {
    const node = findTrees(this.nodes, (item) => item.name === name)
    if (!node) {
      return
    }

    await this.exec(node.children)
  }
}

export function useScheduler(form) {
  const scheduler = useRef(null)

  if (!scheduler.current) {
    scheduler.current = new Scheduler(form)
  }

  return scheduler.current
}

export const SchedulerContext = React.createContext(null)
