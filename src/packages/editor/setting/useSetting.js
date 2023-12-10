import { isArray, reduceTrees } from 'remote:glide_components/utils'

function useSetting({ configDefinitions = [] }) {
  const groupDefinitions = []

  // 存在子元素且不存在节点类型的为分组
  function isGroup(item) {
    return isArray(item.children) && !item.node
  }

  const itemDefinitions = configDefinitions.filter((item) => {
    return !isGroup(item)
  })
  if (itemDefinitions.length) {
    groupDefinitions.push({ label: '基础设置', name: '$$default', children: itemDefinitions })
  }

  configDefinitions.forEach((item) => {
    if (isGroup(item)) {
      groupDefinitions.push(item)
    }
  })

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
  console.log(initialValues, '...')

  return { groupDefinitions, initialValues }
}

export default useSetting
