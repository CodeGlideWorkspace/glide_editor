import { createStore, createAction, withSelector } from 'remote:glide_components/store'

import document from './document'
import props from './props'
import style from './style'
import config from './config'
import resource from './resource'

function editor(set, get) {
  const actionCreator = createAction(set, get)

  return {
    ...document(actionCreator),
    ...props(actionCreator),
    ...style(actionCreator),
    ...config(actionCreator),
    ...resource(actionCreator),
  }
}

const useEditor = withSelector(createStore(editor))

export default useEditor
