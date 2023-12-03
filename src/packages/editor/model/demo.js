import { createStore, createAction, createShadowStore } from 'remote:glide_components/store'
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
        validators: [],
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
            defaultValue: '',
            validators: [],
            layout: 'horizontal',
            props: {},
          },
          {
            label: '开关',
            name: 'switch1',
            node: 'switch',
            description: '这里是长长的描述信息啊啊',
            tip: '提示信息',
            defaultValue: '',
            validators: [],
            layout: 'horizontal',
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

    // 更新动作
    updateConfig: actionCreator(updateConfig),
    updateConfigAsync: actionCreator(updateConfigAsync),
  }
}

const useDemo = createStore(demo)
const useShadowDemo = createShadowStore(useDemo)

export { useDemo, useShadowDemo }
