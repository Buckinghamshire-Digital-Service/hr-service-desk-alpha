import React from 'react'
import Svg from '../Svg/Svg.jsx'

const Icon = props => {
  return (
    <span className={props.className}>
      <Svg url={props.url} alt={props.alt}/>
      <span className='is-sr-only'>{props.label}</span>
    </span>
  )
}

export default Icon
