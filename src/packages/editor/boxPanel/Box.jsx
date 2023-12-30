import React from 'react'
import { classNames } from 'remote:glide_components/utils'

import Size from './Size'

import styles from './Box.module.less'

function Box({ value, title, className, children, onChange }) {
  function handleChange(size, index) {
    const newValue = value.slice()
    newValue[index] = size
    onChange(newValue)
  }

  return (
    <table className={classNames(styles.box, { [className]: !!className })}>
      <colgroup>
        <col style={{ width: '38px', minWidth: '38px' }} />
        <col />
        <col style={{ width: '38px', minWidth: '38px' }} />
      </colgroup>
      <tbody>
        <tr>
          <td className={styles.title}>{title}</td>
          <td className={styles.size}>
            <Size value={value[0]} onChange={(size) => handleChange(size, 0)} />
          </td>
          <td></td>
        </tr>
        <tr>
          <td className={styles.size}>
            <Size value={value[3]} onChange={(size) => handleChange(size, 3)} />
          </td>
          <td>{children}</td>
          <td className={styles.size}>
            <Size value={value[1]} onChange={(size) => handleChange(size, 1)} />
          </td>
        </tr>
        <tr>
          <td></td>
          <td className={styles.size}>
            <Size value={value[2]} onChange={(size) => handleChange(size, 2)} />
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
  )
}

Box.defaultProps = {
  value: [],
  onChange() {},
}

export default Box
