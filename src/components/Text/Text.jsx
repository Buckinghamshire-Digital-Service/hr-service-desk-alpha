import React from 'react'

const Text = props => {
  let classes = `long-form ${props.className}`
 	console.log(props)
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
