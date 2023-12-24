import React from 'react'

import Box from './Box'
import Size from './Size'

import styles from './BoxPanel.module.less'

function BoxPanel({ initialValues, onChange }) {
  function handleChange(key, value) {
    onChange({ ...initialValues, [key]: value })
  }

  function handleWidthChange(value) {
    onChange({ ...initialValues, width: { ...initialValues.width, value } })
  }

  function handleHeightChange(value) {
    onChange({ ...initialValues, height: { ...initialValues.height, value } })
  }

  function handleWidthUnitChange(unit) {
    onChange({ ...initialValues, width: { ...initialValues.width, unit } })
  }

  function handleHeightUnitChange(unit) {
    onChange({ ...initialValues, height: { ...initialValues.height, unit } })
  }

  return (
    <Box
      className={styles.margin}
      title="间距"
      value={initialValues.margin}
      onChange={(value) => handleChange('margin', value)}
    >
      <Box
        className={styles.padding}
        title="填充"
        value={initialValues.padding}
        onChange={(value) => handleChange('padding', value)}
      >
        <div className={styles.rect}>
          <Size
            value={initialValues.width.value}
            unit={initialValues.width.unit}
            onChange={handleWidthChange}
            onUnitChange={handleWidthUnitChange}
          />
          <span style={{ margin: '0 6px' }}>x</span>
          <Size
            value={initialValues.height.value}
            unit={initialValues.height.unit}
            onChange={handleHeightChange}
            onUnitChange={handleHeightUnitChange}
          />
        </div>
      </Box>
    </Box>
  )
}

BoxPanel.defaultProps = {
  initialValues: {},
  onChange() {},
}

export default BoxPanel
