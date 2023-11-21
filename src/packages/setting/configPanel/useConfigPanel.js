import { isArray } from 'remote:glide_components/utils'

function useConfigPanel({ configDefinitions = [] }) {
  const groupDefinitions = []

  const itemDefinitions = configDefinitions.filter((item) => {
    return !isArray(item.children)
  })
  if (itemDefinitions.length) {
    groupDefinitions.push({ label: '基础设置', name: '$_default', children: itemDefinitions })
  }

  configDefinitions.forEach((item) => {
    if (isArray(item.children)) {
      groupDefinitions.push(item)
    }
  })

  return { groupDefinitions }
}

export default useConfigPanel
