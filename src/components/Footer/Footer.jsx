import React from 'react'
import Divider from '../Divider/Divider.jsx'
import Heading from '../Heading/Heading.jsx'
import { Link } from 'gatsby'

const Footer = props => {
  return (
    <footer className='footer'>
      <div className='container'>
        <Heading text='Need to get in touch?'/>
      </div>
      <Divider />
      <nav className='navbar container' role='navigation' aria-label='main navigation'>
        <Link to='/about' className='navbar-item' >
          About
        </Link>
        <Link to='/contact' className='navbar-item' >
          Contact
        </Link> 
        <Link to='/downloads' className='navbar-item'>
          Downloads
        </Link>
        <Link to='/modern-slavery' className='navbar-item' >
          Modern slavery
        </Link>
        <Link to='/privacy' className='navbar-item' >
          Privacy
        </Link>     
      </nav>
    </footer>
  )
}

export default Footer
