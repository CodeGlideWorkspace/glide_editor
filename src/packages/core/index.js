import { share } from 'doer'

import useEditor from './store/editor'

import { nodeSelector, parentNodeSelector, selectNodeSelector, nodesSelector } from './selector/document'
import { resourcesSelector, resourceDefinitionSelector, resourceDefinitionsSelector } from './selector/resource'

export {
  useEditor,
  nodesSelector,
  nodeSelector,
  parentNodeSelector,
  selectNodeSelector,
  resourcesSelector,
  resourceDefinitionSelector,
  resourceDefinitionsSelector,
}

share('editor', {
  useEditor,
  nodeSelector,
  nodesSelector,
  parentNodeSelector,
  selectNodeSelector,
  resourcesSelector,
  resourceDefinitionSelector,
  resourceDefinitionsSelector,
})
