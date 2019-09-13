import React from 'react'

const Divider = props => {
  return (
    <hr className={`hr ${props.className}`} aria-hidden/>
  )
}

Divider.defaultProps = {
  className: ''
}

export default Divider
