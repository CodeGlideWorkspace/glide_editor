import React, { useState, useRef } from 'react'
import { Number } from 'remote:glide_components/FormBase'

import styles from './Size.module.less'

function Size({ value, showUnit, onChange }) {
  const num = parseFloat(value) || undefined
  const unit = value?.replace(num, '') || 'px'

  const [active, setActive] = useState(false)
  const ref = useRef(null)
  const timer = useRef(null)

  function handleBlur() {
    timer.current = setTimeout(() => {
      setActive(false)
    }, 100)
  }

  function handleFocus() {
    setActive(true)
  }

  function handleUnitChange(event) {
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = null
    }

    const nextUnit = unit === 'px' ? '%' : 'px'

    onChange(num ? `${num}${nextUnit}` : nextUnit)

    if (ref.current) {
      ref.current.focus()
    }
  }

  function handleChange(value) {
    onChange(`${value}${unit}`)
  }

  if (active) {
    return (
      <>
        <Number
          ref={ref}
          className={styles.size}
          control={false}
          placeholder="-"
          step={1}
          min={0}
          autoFocus
          bordered={false}
          value={num}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {showUnit && (
          <span style={{ cursor: 'pointer' }} onClick={handleUnitChange}>
            {unit}
          </span>
        )}
      </>
    )
  }

  const showValue = showUnit ? value : num

  return (
    <div className={styles.label} onClick={handleFocus}>
      {showValue || '-'}
    </div>
  )
}

Size.defaultProps = {
  onChange() {},
}

export default Size
