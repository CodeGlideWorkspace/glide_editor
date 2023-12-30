import { fetchComponents } from '@/packages/view'

/**
 * @type Script 脚本对象
 *
 * @property {String} code 脚本编码
 * @property {String} name 脚本名称
 * @property {String} target 脚本目标编译码
 * @property {String} source 脚本目标源码
 */

/**
 * 加载脚本资源
 */
function loadScripts(payload, operator) {
  operator.set((state) => {
    state.scripts = [
      {
        name: 'script1',
        title: '脚本1',
        target: 'return result(count + "" + suffix)',
        source: `export default function execute() { return result(count + suffix) }`,
      },
    ]
  })
}

/**
 * 加载配置项资源
 */
function loadItems(payload, operator) {
  operator.set((state) => {
    state.items = [
      {
        name: 'Input',
        path: 'remote:glide_public_components/Items',
        exportName: 'Input',
      },
      {
        name: 'Select',
        path: 'remote:glide_public_components/Items',
        exportName: 'Select',
      },
      {
        name: 'Number',
        path: 'remote:glide_public_components/Items',
        exportName: 'Number',
      },
      {
        name: 'Switch',
        path: 'remote:glide_public_components/Items',
        exportName: 'Switch',
      },
    ]
  })
}

/**
 * 加载组件资源
 */
async function loadComponents(payload, operator) {
  const componentPaths = [
    {
      name: '$$Page',
      path: 'remote:glide_public_components/Page',
      exportName: 'default',
    },
    {
      name: 'BizTable',
      path: 'remote:glide_public_components/BizTable',
      exportName: 'default',
    },
  ]
  const components = await fetchComponents(componentPaths)
  operator.set((state) => {
    state.componentPaths = componentPaths
    state.components = components
  })
}

function resource(actionCreator) {
  return {
    // 脚本资源
    scripts: [],
    loadScripts: actionCreator(loadScripts),

    // 配置项资源
    items: [],
    loadItems: actionCreator(loadItems),

    // 组件资源路径
    componentPaths: [],
    // 组件资源定义
    components: [],
    loadComponents: actionCreator(loadComponents),
  }
}

export default resource
