import { isArray } from 'remote:glide_components/utils'

function useConfigPanel({ configDefinition = [] }) {
  const itemDefinitions = configDefinition.filter((item) => {
    return !isArray(item.children)
  })

  const groupDefinitions = configDefinition.filter((item) => {
    return isArray(item.children)
  })

  return { groupDefinitions, itemDefinitions }
}

export default useConfigPanel
