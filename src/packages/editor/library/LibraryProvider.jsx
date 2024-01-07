import React from 'react'
import { Module } from 'remote:glide_components/Module'
import ComponentPanel from './componentPanel/ComponentPanel'
import styles from './LibraryProvider.module.less'
import useEditor from '../model/editor'
import { componentOptionsSelector } from '../selector/resource'

function LibraryProvider({ children }) {
  const componentOptions = useEditor(componentOptionsSelector)
  return (
    <div className={styles.library}>
      <Module title="组件库">
        <ComponentPanel options={componentOptions}></ComponentPanel>
      </Module>
    </div>
  )
}
export default LibraryProvider
