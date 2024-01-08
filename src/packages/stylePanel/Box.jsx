import React from 'react'
import { classNames } from 'remote:glide_components/utils'

import Size from './Size'

import styles from './Box.module.less'

function Box({ value, title, className, children, onChange }) {
  const valueRect = value.split(' ').filter(Boolean)
  const top = valueRect[0]
  const right = valueRect[1]
  const bottom = valueRect[2] ? valueRect[2] : top
  const left = valueRect[3] ? valueRect[3] : right

  function handleChange(size, index) {
    const newValue = Array.from({ length: 4 }).map((_, index) => {
      return valueRect[index] || '0'
    })
    if (size) {
      newValue[index] = size
    } else {
      newValue[index] = '0'
    }
    onChange(newValue.join(' '))
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
            <Size value={top} onChange={(size) => handleChange(size, 0)} />
          </td>
          <td></td>
        </tr>
        <tr>
          <td className={styles.size}>
            <Size value={left} onChange={(size) => handleChange(size, 3)} />
          </td>
          <td>{children}</td>
          <td className={styles.size}>
            <Size value={right} onChange={(size) => handleChange(size, 1)} />
          </td>
        </tr>
        <tr>
          <td></td>
          <td className={styles.size}>
            <Size value={bottom} onChange={(size) => handleChange(size, 2)} />
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
  )
}

Box.defaultProps = {
  value: '',
  onChange() {},
}

export default Box
