import React from 'react'
import classNames from 'classnames'
import Logo from '../Logo/Logo.jsx'
import Button from '../Button/Button.jsx'
import ButtonGroup from '../ButtonGroup/ButtonGroup.jsx'
import Form from '../Form/Form.jsx'
import Navigation from '../Navigation/Navigation.jsx'
import CookieBar from '../CookieBar/CookieBar.jsx'
import Icon from '../Icon/Icon.jsx'
import Anchor from '../Anchor/Anchor.jsx'
import { primary } from '../../fixtures/navigation.js'
import { ViewportMobile, ViewportDefault } from '../Breakpoints/Breakpoints.jsx'

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
      url: '/svg/magnifying.svg'
    }
    let iconSubmit = {
      label: 'Submit search',
      url: '/svg/magnifying-pink.svg'
    }
    let iconClose = {
      label: 'close',
      url: '/svg/cross.svg'
    }
    let navClasses = classNames('navbar-primary navbar-expand-md', {
      'd-none': !this.state.mobileMenuOpen
    })
    let current = this.props.path ? this.props.path.pathname : ''

    return (
      <header className='masthead'>
        <span className='visually-hidden'>Buckinghamshire Council HR desk service</span>
        <CookieBar />
        <div className='masthead__inner'>
          <section className='navigation-wrapper'>
            <ViewportMobile>
              <Button aria-hidden='false' className={this.state.mobileMenuOpen ? 'navbar-toggler active' : 'navbar-toggler'} aria-haspopup={!this.state.mobileMenuOpen} aria-expanded={this.state.mobileMenuOpen} aria-label={this.state.mobileMenuOpen ? 'Hide navigation' : 'Show navigation'} clickHandler={this.handleMenuClick.bind(this)}>
                {this.state.mobileMenuOpen ? 'Close' : 'Menu'}
              </Button>
            </ViewportMobile>
            <ViewportDefault>
              <Button aria-hidden='true' className={this.state.mobileMenuOpen ? 'navbar-toggler active' : 'navbar-toggler'} aria-controls='navigation' aria-haspopup={!this.state.mobileMenuOpen} aria-expanded={this.state.mobileMenuOpen} aria-label={this.state.mobileMenuOpen ? 'Hide navigation' : 'Show navigation'} clickHandler={this.handleMenuClick.bind(this)}>
                {this.state.mobileMenuOpen ? 'Close' : 'Menu'}
              </Button>
            </ViewportDefault>
            <Logo url='/svg/logo-frank--alt.svg' alt=''/>
            <ViewportMobile>
              <Navigation className={navClasses} menu-open={this.state.mobileMenuOpen} id='navigation-primary' navigation={primary} current={current} aria-label='Main Menu' role='menubar' type='nav'/>
            </ViewportMobile>
            <ViewportDefault>
              <Navigation className={navClasses} hasPopup={true} menu-open={true} id='navigation-primary' navigation={primary} current={current} aria-label='Main Menu' role='menubar' type='nav'/>
            </ViewportDefault>
          </section>
          <ButtonGroup className='button-group--static'>
            <Button className='btn--flat btn--small' clickHandler={this.handleSearchClick.bind(this)}><span className='hidden--md'>Search </span><Icon {...icon}/></Button>
            <Anchor className='btn btn--link btn--small hidden--rg link-text' label='Call Frank on 0300 1236600' href='tel:03001236600'><span className='nav-link'>0300 1236600</span></Anchor>
          </ButtonGroup>
        </div>
        {this.state.takeover && <section className='masthead__takeover'>
          <div className='masthead__takeover__inner'>
            <Form className='form--search' role='search'>

              <Button className='btn--flat submit' clickHandler={this.handleSearchSubmit.bind(this)}><Icon {...iconSubmit}/></Button>
            </Form>
            <Button className='btn--flat close' clickHandler={this.handleSearchClick.bind(this)}><Icon {...iconClose}/></Button>
          </div>
        </section>}
        {this.state.takeover && <div className='takeover-bg' onClick={this.handleSearchClick.bind(this)}/>}
      </header>
    )
  }
}
