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
    let icon = {
      label: 'search',
      url: '../../../svg/magnifying.svg'
    }
    let iconSubmit = {
      label: 'Submit search',
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

                  <Button aria-hidden='false' type='a' className={`navbar-burger burger ${this.state.mobileMenuOpen ? 'is-active' : ''}`} aria-controls='nav-primary' aria-haspopup={!this.state.mobileMenuOpen} aria-expanded={this.state.mobileMenuOpen} aria-label={this.state.mobileMenuOpen ? 'Hide navigation' : 'Show navigation'} clickHandler={this.handleMenuClick.bind(this)} data-target='nav-primary'>
                    <span aria-hidden='true'></span>
                    <span aria-hidden='true'></span>
                    <span aria-hidden='true'></span>
                  </Button>                  
                  
                  {this.props.hasSearch && <Button className='btn--flat btn--small is-hidden-tablet' clickHandler={this.handleSearchClick.bind(this)}><span className='is-sr-only'>Search </span><Icon className='spaced-left' {...icon}/></Button>}
                </div>

                <div id='nav-primary' className={`navbar-menu navbar-primary ${this.state.mobileMenuOpen ? 'is-active' : ''}`}>
                  <div className='navbar-end'>
                    <Navigation items={primary} />
                  </div>
                </div>

                {this.props.hasSearch && <div className='navbar-end is-hidden-mobile left-spaced'>
                  <Button className='btn--flat btn--small' clickHandler={this.handleSearchClick.bind(this)}><span className='is-sr-only'>Search </span><Icon className='spaced-left' {...icon}/></Button>
                </div>}        
              </nav>
            </section>
          </div>
        </Hero>
        {(this.state.takeover && this.props.hasSearch) && <section className='masthead__takeover'>
          <div className='masthead__takeover__inner'>
            <Form className='form--search' role='search'>
              <Field />
              <Button className='btn--flat submit' clickHandler={this.handleSearchSubmit.bind(this)}><Icon {...iconSubmit}/></Button>
            </Form>
            <Button className='btn--flat close' clickHandler={this.handleSearchClick.bind(this)}><Icon {...iconClose}/></Button>
          </div>
        </section>}
        {(this.state.takeover && this.props.hasSearch) && <div className='takeover-bg' onClick={this.handleSearchClick.bind(this)}/>}
      </header>
    )
  }
}
