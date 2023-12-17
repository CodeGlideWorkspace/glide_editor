import { createStore, createAction, withSelector } from 'remote:glide_components/store'
import { eachTrees } from 'remote:glide_components/utils'

function delay(time = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

// 同步调用demo
function updateConfig(payload, operator) {
  operator.set((state) => {
    // 遍历配置树
    eachTrees(state.configDefinitions, (configDefinition) => {
      // 存在该配置项时，更新配置项值
      const isMatched = configDefinition.name in payload
      if (isMatched) {
        state.configValue[configDefinition.name] = payload[configDefinition.name]
      }
    })
  })
}

// 异步调用demo
async function updateConfigAsync(payload, operator) {
  operator.set((state) => {
    state.configValue.status = 'pending'
  })
  await delay(1000)
  // 演示调用同模型的其他方法
  operator.get().updateConfig(payload)
  operator.set((state) => {
    state.configValue.status = 'done'
  })
}

function demo(set, get) {
  const actionCreator = createAction(set, get)

  return {
    // 配置定义
    configDefinitions: [
      {
        label: '输入框',
        name: 'text3',
        node: 'input',
        description: '这里是长长的描述信息啊啊',
        tip: '提示信息',
        defaultValue: '',
        layout: 'horizontal',
        props: {},
      },
      {
        label: '基本信息',
        name: 'base',
        children: [
          {
            label: '文本域',
            name: 'text',
            node: 'input',
            description: '这里是长长的描述信息啊啊',
            tip: '提示信息',
            defaultValue: '',
            hooks: {
              validators: [
                (value, form) => {
                  if (form.getValue('text3') === 'error') {
                    return '校验失败'
                  }
                },
              ],
              /**
               * 检测是否显示
               */
              visible(value, form) {
                if (form.getValue('text3') === 'hidden') {
                  return false
                }
              },
            },
            layout: 'vertical',
            required: true,
            dependencies: ['text3'],
            props: {
              type: 'textarea',
            },
          },
          {
            label: '数值输入框',
            name: 'text2',
            node: 'number',
            description: '这里是长长的描述信息啊啊',
            tip: '提示信息',
            defaultValue: 1,
            layout: 'horizontal',
            props: {},
          },
          {
            label: '开关',
            name: 'switch1',
            node: 'switch',
            description: '这里是长长的描述信息啊啊',
            tip: '提示信息',
            defaultValue: true,
            layout: 'horizontal',
            props: {},
          },
          {
            label: '下拉框',
            name: 'select',
            node: 'select',
            description: '这是一个下拉框呀',
            tip: '提示信息',
            defaultValue: 'option2',
            props: {
              data: [
                { label: '选项1', value: 'option1' },
                { label: '选项2', value: 'option2' },
              ],
            },
          },
          {
            label: '异步下拉框',
            name: 'asyncSelect',
            node: 'select',
            defaultValue: '',
            dependencies: ['text3'],
            hooks: {
              async load(form) {
                await delay(2000)

                const data = [
                  { label: '选项1', value: 'option1' },
                  { label: '选项2', value: 'option2' },
                ]

                const value = form.getValue('text3')
                if (value) {
                  data.push({ label: value, value })
                }

                // 设置默认值
                form.setValue('asyncSelect', 'option1')

                return data
              },
            },
            props: {},
          },
        ],
      },
      {
        label: '高级配置',
        name: 'senior',
        children: [
          {
            name: 'hidden',
            node: 'hidden',
            defaultValue: 'hidden data',
          },
        ],
      },
    ],
    // 配置值
    configValue: {
      status: 'init',
    },

    // 存储配置的动作
    actions: [],

    // 事件定义
    eventDefinitions: [
      {
        name: '点击',
        code: 'onClick',
      },
    ],
    // 方法定义
    methodDefinitions: [
      {
        name: '导出',
        code: 'export',
      },
    ],

    // 组件列表
    components: [
      { name: '组件1', code: 'com1' },
      { name: '组件2', code: 'com2' },
    ],

    // 脚本列表
    scripts: [
      { name: '脚本1', code: 'script1' },
      { name: '脚本2', code: 'script2' },
    ],

    // 更新动作
    updateConfig: actionCreator(updateConfig),
    updateConfigAsync: actionCreator(updateConfigAsync),
  }
}

const useDemo = withSelector(createStore(demo))

export default useDemo
