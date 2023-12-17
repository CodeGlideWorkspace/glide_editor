import React from 'react'

import Demo from './Demo'
import useAction from './useAction'

// 临时写死两个组件
const components = [
  {
    code: 'demo1',
    text: '案例1',
    actions: [
      {
        eventCode: 'onClick',
        methods: [
          {
            componentCode: 'demo2',
            scriptCode: 'script1',
            methodCode: 'setText',
          },
          {
            componentCode: 'demo2',
            scriptCode: 'script1',
            methodCode: 'setText2',
          },
        ],
      },
    ],
  },
  {
    code: 'demo2',
    text: '案例2',
    actions: [],
  },
]

function View({ scripts, eventDefinitions, methodDefinitions }) {
  const action = useAction({ scripts, eventDefinitions, methodDefinitions })

  return (
    <>
      {components.map((component) => {
        const eventProps = action.render(component.code, component.actions)
        return (
          <Demo
            ref={(el) => {
              action.register(component.code, el)
            }}
            key={component.code}
            text={component.text}
            {...eventProps}
          />
        )
      })}
    </>
  )
}

export default View
