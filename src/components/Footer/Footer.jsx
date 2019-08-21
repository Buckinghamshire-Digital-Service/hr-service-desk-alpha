import React from 'react'
import Nav from '../Nav/Nav.jsx'
import Divider from '../Divider/Divider.jsx'

const Footer = props => {
  return (
    <footer className='footer'>
      {props.children}
    </footer>
  )
}

export default Footer
