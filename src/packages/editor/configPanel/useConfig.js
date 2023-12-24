import { isArray, reduceTrees } from 'remote:glide_components/utils'

function useConfig({ configDefinitions, collapsible }) {
  const groupDefinitions = []

  function isGroup(item) {
    // 存在子元素且不存在节点类型的为分组
    return isArray(item.children) && !item.node
  }

  configDefinitions.forEach((item) => {
    if (isGroup(item)) {
      groupDefinitions.push(item)
    }
  })

  const itemDefinitions = configDefinitions.filter((item) => {
    return !isGroup(item)
  })
  if (itemDefinitions.length) {
    groupDefinitions.push({ label: '其他', name: '$$other', children: itemDefinitions })
  }

  // 获取默认值
  const initialValues = reduceTrees(
    configDefinitions,
    (result, item) => {
      if (isGroup(item)) {
        return result
      }

      if (!item.name) {
        return result
      }

      result[item.name] = item.defaultValue

      return result
    },
    {},
  )

  return { groupDefinitions, initialValues }
}

export default useConfig
