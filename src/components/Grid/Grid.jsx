import React from 'react'
import classNames from 'classnames'

const Grid = props => {
  let classes = classNames('columns', props.className)

  return (
    <div className={classes}>
      {props.children}
    </div>
  )
}

export default Grid
