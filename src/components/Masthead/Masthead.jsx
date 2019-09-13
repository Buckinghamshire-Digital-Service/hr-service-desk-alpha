import React from 'react'
import classNames from 'classnames'
import Logo from '../Logo/Logo.jsx'
import Button from '../Button/Button.jsx'
import Form from '../Form/Form.jsx'
import Field from '../Field/Field.jsx'
import CookieBar from '../CookieBar/CookieBar.jsx'
import Icon from '../Icon/Icon.jsx'
import Anchor from '../Anchor/Anchor.jsx'
import { Link } from 'gatsby'
import { primary } from '../../fixtures/navigation.js'
import Navigation from '../Navigation/Navigation.jsx'
import Hero from '../Hero/Hero.jsx'
import { ViewportMobile, ViewportDefault } from '../Breakpoints/Breakpoints.jsx'
import styles from '../../scss/_settings.scss'

export default class Masthead extends React.PureComponent {
  constructor () {
    super()
    this.state = {
      mobileMenuOpen: false,
      takeover: false
    }
  }

  handleSearchSubmit () {
    const searchTerm = encodeURIComponent(
      this.formAutocomplete.searchInput.input.value
        .toLowerCase()
        .trim()
    )
    if (searchTerm !== '') {
      window.location = `/search/${searchTerm}`
    }
  }

  handleSearchClick () {
    const el = document.documentElement.classList
    this.setState({
      takeover: !this.state.takeover
    })
    // ugh add a class to the html element - redux doesn't reach this far up
    this.state.takeover ? el.remove('html-takeover') : el.add('html-takeover')
  }

  handleMenuClick () {
    this.setState({
      mobileMenuOpen: !this.state.mobileMenuOpen
    })
  }

  render () {
    let iconWhite = {
      label: 'search',
      url: '../../../svg/magnifying-white.svg'
    } 
    let icon = {
      label: 'search',
      url: '../../../svg/magnifying.svg'
    }
    let iconClose = {
      label: 'close',
      url: '../../../svg/cross.svg'
    }
    let logo = {
      label: 'Navigate to homepage',
      url: '../../../svg/buckinghamshire-logo.svg'
    }


    return (
      <header className={`masthead ${this.props.hero && this.props.hero.image ? 'masthead--has-shadow' : ''}`}>
        <Hero hero={this.props.hero}>
          <span className='is-sr-only'>Buckinghamshire Council HR desk service</span>
          <CookieBar />
          <div className='masthead__inner'>
            <section className='navigation-wrapper'>
              <nav className='navbar' role='navigation' aria-label='main navigation'>
                <div className='navbar-brand'>
                  <Logo url={logo.url} alt={logo.label} className='navbar-item'/>

                  <Button aria-hidden='false' className={`navbar-burger burger ${this.state.mobileMenuOpen ? 'is-active' : ''}`} aria-controls='nav-primary' aria-haspopup={!this.state.mobileMenuOpen} aria-expanded={this.state.mobileMenuOpen} aria-label={this.state.mobileMenuOpen ? 'Hide navigation' : 'Show navigation'} clickHandler={this.handleMenuClick.bind(this)} data-target='nav-primary'>
                    <span aria-hidden='true'></span>
                    <span aria-hidden='true'></span>
                    <span aria-hidden='true'></span>
                  </Button>                  
                  
                  {this.props.hasSearch && <Button className='btn--flat is-hidden-tablet' clickHandler={this.handleSearchClick.bind(this)}><Icon {...iconWhite}/></Button>}
                </div>

                <div id='nav-primary' className={`navbar-menu navbar-primary ${this.state.mobileMenuOpen ? 'is-active' : ''}`}>
                  <div className='navbar-end'>
                    <Navigation items={primary} />
                  </div>
                </div>

                {this.props.hasSearch && <div className='navbar-end is-hidden-mobile'>
                  <Button className='btn--flat' clickHandler={this.handleSearchClick.bind(this)}><Icon {...iconWhite}/></Button>
                </div>}        
              </nav>
            </section>
          </div>
          {!this.props.hasSearch && 
            <Form className='form--search container container--constrained is-grouped' role='search'>
              <div className='field'>
                <div className='field has-addons is-marginless'>
                  <input className='input is-large' type='text' placeholder='Your phone number'/>
                  <Button className='btn--flat' clickHandler={this.handleSearchSubmit.bind(this)}><Icon {...iconWhite}/></Button>
                </div>
              </div>
            </Form>}
        </Hero>
        {(this.state.takeover && this.props.hasSearch) && <section className='masthead__takeover'>
          <div className='masthead__takeover__inner'>
            <Button className='close' clickHandler={this.handleSearchClick.bind(this)}><Icon {...iconClose}/></Button>
            <Form className='form--search' role='search'>
              <div className='field'>
                <div className='field has-addons is-marginless'>
                  <input className='input is-large' type='text' placeholder='Your phone number'/>
                  <Button clickHandler={this.handleSearchSubmit.bind(this)}><Icon {...icon}/></Button>
                </div>
              </div>
            </Form>
          </div>
        </section>}
        {(this.state.takeover && this.props.hasSearch) && <div className='takeover-bg' onClick={this.handleSearchClick.bind(this)}/>}
      </header>
    )
  }
}









