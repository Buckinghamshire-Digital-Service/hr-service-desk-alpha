import React from 'react'
import { Link } from 'gatsby'
import Svg from '../Svg/Svg.jsx'
import { Event } from '../GoogleAnalytics/GoogleAnalytics'

const Logo = props => {
  return (
    <div className='logo'>
      <Link to='/' className='logo__link' title='Buckinghamshire Council HR Service Desk homepage'  onClick={() => Event('Bucks logo link','Click','Return to homepage')}>
        <Svg url={props.url} alt='Buckinghamshire Council'/>
      </Link>
    </div>
  )
}

export default Logo
