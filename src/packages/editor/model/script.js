/**
 * 转换脚本存储模型
 *
 * @type Script 脚本对象
 *
 * @property {String} code 脚本编码
 * @property {String} name 脚本名称
 * @property {String} target 脚本目标编译码
 * @property {String} source 脚本目标源码
 */

function script(actionCreator) {
  return {
    scripts: [
      {
        code: 'script1',
        name: '脚本1',
        target: 'return result()',
        source: `export default function execute() { return result() }`,
      },
    ],
  }
}

export default script
