import React from 'react'
import Divider from '../Divider/Divider.jsx'
import Heading from '../Heading/Heading.jsx'
import Navigation from '../Navigation/Navigation.jsx'
import Icon from '../Icon/Icon.jsx'
import { footer } from '../../fixtures/navigation.js'

const Footer = props => {
  let email = {
    label: 'Email',
    url: '../../../svg/email.svg'
  }

  return (
    <footer className='footer' role='contentinfo'>
      <div className='footer__inner'>
        <a href='mailto:hrservicedesk@buckinghamshire.gov.uk' className='footer__link is-flex' aria-label='Get in touch by email'>
          <Heading text='Need to get in touch?' className='lead sp--flush'/>
          <Icon {...email} className='spaced-left'/>
        </a>
      </div>
      <Divider />
      <nav className='navbar footer__inner' role='navigation' aria-label='Footer navigation'>
        <Navigation items={footer}/> 
      </nav>
    </footer>
  )
}

export default Footer
