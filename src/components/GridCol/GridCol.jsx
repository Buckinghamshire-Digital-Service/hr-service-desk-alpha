import React from 'react'
import classNames from 'classnames'

const GridCol = props => {
  let classes = classNames('column', props.className, props.modifiers)

  return (
    <div className={classes}>
      {props.children}
    </div>
  )
}

export default GridCol
