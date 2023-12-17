function biz(actionCreator) {
  return {
    schema: {
      code: '',
      slots: {
        action: [],
      },
      children: [{ code: '', children: [] }],
    },
    config: {
      componentCode: {
        // 属性配置
        configValue: {},
        // 样式配置
        styleValue: {},
        // 动作配置
        actions: [
          {
            eventCode: '',
            apis: [
              {
                componentCode: '',
                apiCode: '',
                scriptCode: '',
              },
            ],
          },
        ],
      },
    },
  }
}

export default biz
