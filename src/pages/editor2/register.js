import React from 'react'
import { useEditor } from 'remote:glide_editor/core'
import { AppstoreAddOutlined, ClusterOutlined } from 'remote:glide_components/Icon'

const editor = useEditor.getState()

// 注册物料插件
editor.registerResource({
  type: 'plugin',
  name: 'material',
  icon: <AppstoreAddOutlined />,
  title: '物料',
  path: 'remote:glide_editor/MaterialPlugin',
  exportName: 'MaterialPlugin',
})
// 注册大纲树插件
editor.registerResource({
  type: 'plugin',
  name: 'outline',
  icon: <ClusterOutlined />,
  title: '大纲',
  path: 'remote:glide_editor/OutlinePlugin',
  exportName: 'OutlinePlugin',
})

// 注册属性面板
editor.registerResource({
  type: 'panel',
  name: 'prop',
  title: '属性',
  path: 'remote:glide_editor/PropPanel',
  exportName: 'PropPanel',
})
// 注册样式面板
editor.registerResource({
  type: 'panel',
  name: 'style',
  title: '样式',
  path: 'remote:glide_editor/StylePanel',
  exportName: 'StylePanel',
})
// 注册动作面板
editor.registerResource({
  type: 'panel',
  name: 'action',
  title: '交互',
  path: 'remote:glide_editor/ActionPanel',
  exportName: 'ActionPanel',
})

// 注册Setter资源
const setters = ['Input', 'Select', 'Number', 'Switch']
editor.registerResources(
  setters.map((name) => ({
    type: 'setter',
    name,
    path: 'remote:glide_public_components/Items',
    exportName: name,
  })),
)

// 注册物料资源
const materials = ['Document']
editor.registerResources(
  materials.map((name) => ({
    type: 'material',
    name,
    path: `remote:glide_public_components/${name}`,
    exportName: 'default',
  })),
)

// 注册适配器脚本
editor.registerResource({
  type: 'script',
  scope: 'adapter',
  name: 'script1',
  title: '多参数转换单参数脚本',
  data: {
    target: 'return result(count + "" + suffix)',
    source: `export default function execute() { return result(count + suffix) }`,
  },
})

// 加载物料定义
editor.loadResourceByType('material')
