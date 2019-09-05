import React from 'react'

const Divider = props => {
  return (
    <hr className={`hr ${props.className}`}/>
  )
}

Divider.defaultProps = {
  className: ''
}

export default Divider
