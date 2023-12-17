import React, { forwardRef, useImperativeHandle, useState } from 'react'

function Demo({ onClick, text }, ref) {
  const [showText, setShowText] = useState(text)

  useImperativeHandle(ref, () => {
    return {
      setText(...params) {
        console.log('call setText')
        setShowText(params.join(','))
      },
      setText2(...params) {
        console.log('call setText2')
        setShowText(showText + '-' + params.join(','))
      },
    }
  })

  function handleClick() {
    onClick('改变的文案啊啊啊')
  }

  return <div onClick={handleClick}>{showText}</div>
}

export default forwardRef(Demo)
