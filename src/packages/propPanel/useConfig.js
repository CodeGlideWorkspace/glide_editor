import { isArray, reduceTrees } from 'remote:glide_components/utils'
import { useEditor, resourceDefinitionSelector } from 'remote:glide_editor/core'

function useConfig(node) {
  const nodeDefinition = useEditor(resourceDefinitionSelector(node?.name))

  const groupDefinitions = []

  function isGroup(item) {
    // 存在子元素且不存在节点类型的为分组
    return isArray(item.children) && !item.node
  }

  nodeDefinition?.config?.propDefinitions?.forEach((item) => {
    if (isGroup(item)) {
      groupDefinitions.push(item)
    }
  })

  const itemDefinitions = nodeDefinition?.config?.propDefinitions?.filter((item) => {
    return !isGroup(item)
  })
  if (itemDefinitions && itemDefinitions.length) {
    groupDefinitions.push({ label: '其他', name: '$$other', children: itemDefinitions })
  }

  const props = node?.props || {}
  // 获取当前配置值
  const values = reduceTrees(
    nodeDefinition?.config?.propDefinitions,
    (result, item) => {
      if (isGroup(item)) {
        return result
      }

      if (!item.name) {
        return result
      }

      // 值已经存在则不使用默认值
      if (item.name in props) {
        result[item.name] = props[item.name]
      } else {
        result[item.name] = item.defaultValue
      }

      return result
    },
    {},
  )

  return { groupDefinitions, initialValues: values }
}

export default useConfig
