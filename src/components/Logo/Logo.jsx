import React from 'react'
import { Link } from 'gatsby'
import Svg from '../Svg/Svg.jsx'

const Logo = props => {
  return (
    <div className='logo'>
      <Link to='/' className='logo__link' title='Buckinghamshire Council HR Service Desk homepage'>
        <Svg url={props.url} alt='Buckinghamshire Council'/>
      </Link>
    </div>
  )
}

export default Logo
