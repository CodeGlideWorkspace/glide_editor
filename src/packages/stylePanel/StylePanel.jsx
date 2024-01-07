import React from 'react'
import { Collapse, CollapsePanel } from 'remote:glide_components/Collapse'
import { useEditor } from 'remote:glide_editor/core'

import Box from './Box'
import Size from './Size'

import styles from './StylePanel.module.less'

function StylePanel({ node }) {
  const setStyle = useEditor.use.setStyle()
  const style = node?.style || {}

  function handleChange(key, value) {
    setStyle({
      code: node?.code,
      key,
      value,
    })
  }

  return (
    <Collapse className={styles.collapse} ghost defaultValue={['box']}>
      <CollapsePanel name="box" title="盒模型">
        <Box
          className={styles.margin}
          title="间距"
          value={style.margin}
          onChange={(value) => handleChange('margin', value)}
        >
          <Box
            className={styles.padding}
            title="填充"
            value={style.padding}
            onChange={(value) => handleChange('padding', value)}
          >
            <div className={styles.rect}>
              <Size value={style.width} showUnit onChange={(value) => handleChange('width', value)} />
              <span style={{ margin: '0 6px' }}>x</span>
              <Size value={style.height} showUnit onChange={(value) => handleChange('height', value)} />
            </div>
          </Box>
        </Box>
      </CollapsePanel>
    </Collapse>
  )
}

export default StylePanel
