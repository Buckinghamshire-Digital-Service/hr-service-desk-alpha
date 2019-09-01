import React from 'react'
import Svg from '../Svg/Svg.jsx'

const Logo = props => {
  return (
    <div className='logo'>
      <a href='/' className='logo__link' title='Homepage'>
        <Svg url={props.url} alt={props.alt}/>
      </a>
    </div>
  )
}

export default Logo
