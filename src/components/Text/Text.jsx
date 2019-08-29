import React from 'react'

const Text = props => {
  let classes = `${props.className}`
  
  return (
    <>
      <div dangerouslySetInnerHTML={{__html: props.content}}  className={classes}/>
    </>
  )
}

Text.defaultProps = {
  className: ''
}

export default Text
