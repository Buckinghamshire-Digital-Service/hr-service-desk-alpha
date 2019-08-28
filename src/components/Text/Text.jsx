import React from 'react'

const Text = props => {
  let classes = `${props.className}`
  
  return (
    <div className={classes}>
      <div dangerouslySetInnerHTML={{__html: props.content}} />
    </div>
  )
}

Text.defaultProps = {
  className: ''
}

export default Text
