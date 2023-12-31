module.exports = {
  // 设置别名
  alias: {
    '@': 'src',
  },
  // doer默认会排除所有node_modules编译
  // 如果需要编译部分包，请在这里添加额外的需要编译的包名
  extraBabelCompileNodeModules: [],

  // 项目导出的共享资源
  exposes: {
    './core': './src/packages/core/index.js',
    './Plugin': './src/packages/plugin/index.js',
    './Setting': './src/packages/setting/index.js',
    './Render': './src/packages/render/index.js',
    './MaterialPlugin': './src/packages/materialPlugin/index.js',
    './OutlinePlugin': './src/packages/outlinePlugin/index.js',
    './SchemaPlugin': './src/packages/schemaPlugin/index.js',
    './PropPanel': './src/packages/propPanel/index.js',
    './StylePanel': './src/packages/stylePanel/index.js',
    './ActionPanel': './src/packages/actionPanel/index.js',
    './Toolbar': './src/packages/toolbar/index.js',
  },
  shared: {},

  // 开启BrowserRouter模式
  browserHistory: false,

  plugins: ['@doerjs/plugin-less', '@doerjs/plugin-mock'],

  // 自定义<Suspense fallback={<Loading />}> loading组件
  // 布局加载和页面加载公用一个loading
  // loading: './src/components/loading'
  // 或者 分别指定加载组件
  // loading: {
  //   layout: './src/layouts/loading',
  //   page: './src/components/loading',
  // },

  // 自定义边界错误捕获组件
  // 布局加载和页面加载公用一个error组件
  // error: './src/components/error'
  // 或者 分别指定error组件
  // error: {
  //   layout: './src/layouts/error',
  //   page: './src/components/error',
  // },
}
