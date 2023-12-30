import { isArray, reduceTrees } from 'remote:glide_components/utils'

function useConfig({ configDefinitions, value = {} }) {
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

  // 获取当前配置值
  const values = reduceTrees(
    configDefinitions,
    (result, item) => {
      if (isGroup(item)) {
        return result
      }

      if (!item.name) {
        return result
      }

      // 值已经存在则不使用默认值
      if (item.name in value) {
        result[item.name] = value[item.name]
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
