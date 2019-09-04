import React from 'react'
import Divider from '../Divider/Divider.jsx'
import Heading from '../Heading/Heading.jsx'
import Navigation from '../Navigation/Navigation.jsx'
import { footer } from '../../fixtures/navigation.js'
import { Link } from 'gatsby'

const Footer = props => {
  return (
    <footer className='footer'>
      <div className='container'>
        <Heading text='Need to get in touch?'/>
      </div>
      <Divider />
      <nav className='navbar container' role='navigation' aria-label='Footer navigation'>
        <Navigation items={footer} /> 
      </nav>
    </footer>
  )
}

export default Footer
