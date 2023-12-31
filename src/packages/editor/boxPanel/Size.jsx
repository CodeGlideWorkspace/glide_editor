import React, { useState, useRef } from 'react'
import { Number } from 'remote:glide_components/FormBase'

import styles from './Size.module.less'

function Size({ value, unit, onChange, onUnitChange }) {
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
    onUnitChange(unit === 'px' ? '%' : 'px')

    if (ref.current) {
      ref.current.focus()
    }
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
          value={value}
          onBlur={handleBlur}
          onChange={onChange}
        />
        {unit && (
          <span style={{ cursor: 'pointer' }} onClick={handleUnitChange}>
            {unit}
          </span>
        )}
      </>
    )
  }

  return (
    <div className={styles.label} onClick={handleFocus}>
      {[value, unit].filter(Boolean).join('') || '-'}
    </div>
  )
}

Size.defaultProps = {
  onUnitChange() {},
}

export default Size
