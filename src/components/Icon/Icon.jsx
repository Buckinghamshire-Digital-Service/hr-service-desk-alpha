import React from 'react'
import Svg from '../Svg/Svg.jsx'

const Icon = props => {
  return (
      <Svg url={props.url} alt={props.alt} aria-label={props.label} className={props.className}/>
  )
}
Icon.defaultProps = {
  className: ''
}

export default Icon
