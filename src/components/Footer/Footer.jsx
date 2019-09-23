import React from 'react'
import Divider from '../Divider/Divider.jsx'
import Heading from '../Heading/Heading.jsx'
import Navigation from '../Navigation/Navigation.jsx'
import { footer } from '../../fixtures/navigation.js'
import { Link } from 'gatsby'

const Footer = props => {
  return (
    <footer className='footer'>
      <div className='footer__inner'>
        <Heading text='Need to get in touch?' className='h3'/>
      </div>
      <Divider />
      <nav className='navbar footer__inner' role='navigation' aria-label='Footer navigation' role='contentinfo'>
        <Navigation items={footer}/> 
      </nav>
    </footer>
  )
}

export default Footer
