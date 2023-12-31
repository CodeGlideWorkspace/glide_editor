import React from 'react'
import { Collapse, CollapsePanel } from 'remote:glide_components/Collapse'

import Box from './Box'
import Size from './Size'

import styles from './BoxPanel.module.less'

function BoxPanel({ value, onChange }) {
  function handleChange(k, v) {
    onChange({ ...value, [k]: v })
  }

  function handleWidthChange(v) {
    onChange({ ...value, width: { ...value.width, value: v } })
  }

  function handleHeightChange(v) {
    onChange({ ...value, height: { ...value.height, value: v } })
  }

  function handleWidthUnitChange(unit) {
    onChange({ ...value, width: { ...value.width, unit } })
  }

  function handleHeightUnitChange(unit) {
    onChange({ ...value, height: { ...value.height, unit } })
  }

  return (
    <Collapse className={styles.collapse} ghost defaultValue={['box']}>
      <CollapsePanel name="box" title="盒模型">
        <Box
          className={styles.margin}
          title="间距"
          value={value.margin}
          onChange={(value) => handleChange('margin', value)}
        >
          <Box
            className={styles.padding}
            title="填充"
            value={value.padding}
            onChange={(value) => handleChange('padding', value)}
          >
            <div className={styles.rect}>
              <Size
                value={value.width.value}
                unit={value.width.unit}
                onChange={handleWidthChange}
                onUnitChange={handleWidthUnitChange}
              />
              <span style={{ margin: '0 6px' }}>x</span>
              <Size
                value={value.height.value}
                unit={value.height.unit}
                onChange={handleHeightChange}
                onUnitChange={handleHeightUnitChange}
              />
            </div>
          </Box>
        </Box>
      </CollapsePanel>
    </Collapse>
  )
}

BoxPanel.defaultProps = {
  initialValues: {},
  onChange() {},
}

export default BoxPanel
