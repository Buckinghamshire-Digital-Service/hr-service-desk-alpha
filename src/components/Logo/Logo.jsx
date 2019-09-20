import React from 'react'
import Svg from '../Svg/Svg.jsx'

const Logo = props => {
  return (
    <div className='logo'>
      <a href='/' className='logo__link' title='Buckinghamshire Council HR Service Desk homepage'>
        <Svg url={props.url} alt='Buckinghamshire Council'/>
      </a>
    </div>
  )
}

export default Logo
