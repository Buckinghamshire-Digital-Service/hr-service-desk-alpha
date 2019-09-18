import React from 'react'
import PropTypes from 'prop-types'

const Svg = props => {
  return (
    <img src={props.url} className={`image ${props.className}`} alt={props.alt} aria-hidden/>
  )
}

Svg.defaultProps = {
  className: '',
  alt: ''
}

export default Svg
