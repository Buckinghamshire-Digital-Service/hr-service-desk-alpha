import React from 'react'
import Svg from '../Svg/Svg.jsx'
import logo from '../../svg/buckinghamshire-logo.svg'

const Logo = props => {
  return (
    <div className='logo'>
      <a href='/' className='logo__link' title='Homepage'>
        <Svg url={logo} alt='Buckinghamshire Council'/>
      </a>
    </div>
  )
}

export default Logo
