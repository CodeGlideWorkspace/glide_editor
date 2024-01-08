import { share } from 'doer'

import useEditor from './store/editor'

import { nodeSelector, parentNodeSelector, selectNodeSelector, nodesSelector } from './selector/document'
import {
  resourceSelector,
  resourcesSelectorByType,
  resourcesSelectorByScope,
  resourceDefinitionSelector,
  resourceDefinitionsSelectorByType,
  resourceDefinitionsSelectorByScope,
} from './selector/resource'

export {
  useEditor,
  nodesSelector,
  nodeSelector,
  parentNodeSelector,
  selectNodeSelector,
  resourceSelector,
  resourcesSelectorByType,
  resourcesSelectorByScope,
  resourceDefinitionSelector,
  resourceDefinitionsSelectorByType,
  resourceDefinitionsSelectorByScope,
}

share('editor', {
  useEditor,
  nodeSelector,
  nodesSelector,
  parentNodeSelector,
  selectNodeSelector,
  resourceSelector,
  resourcesSelectorByType,
  resourcesSelectorByScope,
  resourceDefinitionSelector,
  resourceDefinitionsSelectorByType,
  resourceDefinitionsSelectorByScope,
})
