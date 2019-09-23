import React from 'react'
import classNames from 'classnames'
import Logo from '../Logo/Logo.jsx'
import Button from '../Button/Button.jsx'
import Form from '../Form/Form.jsx'
import Field from '../Field/Field.jsx'
import CookieBar from '../CookieBar/CookieBar.jsx'
import Icon from '../Icon/Icon.jsx'
import Anchor from '../Anchor/Anchor.jsx'
import { Link, graphql, StaticQuery, navigate } from 'gatsby'
import { primary } from '../../fixtures/navigation.js'
import Navigation from '../Navigation/Navigation.jsx'
import Search from '../Search/Search.jsx'
import Hero from '../Hero/Hero.jsx'
import { Event } from '../GoogleAnalytics/GoogleAnalytics'
import { ViewportMobile, ViewportDefault } from '../Breakpoints/Breakpoints.jsx'


export default class Masthead extends React.PureComponent {
  constructor () {
    super()
    this.state = {
      mobileMenuOpen: false,
      takeover: false
    }
  }

  handleSearchSubmit (e) {
    let term = 'work life balance'
    console.log(e, term)
    e.preventDefault()

    const searchTerm = encodeURIComponent(
      term
        .toLowerCase()
        .trim()
    )
    if (searchTerm !== '') {
      navigate('/search/',
        {
          state: { 
            query: searchTerm 
          },
        }        
      )
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

    let ariaHidden = {'aria-hidden': this.state.takeover}

    return (
      <header className={`masthead ${this.props.hero && this.props.hero.image ? 'masthead--has-shadow' : ''}`}>
        <Hero hero={this.props.hero}>
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
            <Form className='form--search container container--constrained is-grouped' role='search' onSubmit={event => this.handleSearchSubmit.bind(event, this)}>
              <div className='field'>
                <div className='field has-addons is-marginless'>
                    <StaticQuery
                    query={graphql`
                      query SearchIndexQuery {
                        siteSearchIndex {
                          index
                        }
                      }
                    `}
                    render={data => (
                      <Search searchIndex={data.siteSearchIndex.index} map={this.props.map} id='home-hero-search' />
                    )}
                  />
                  <Button {...ariaHidden} className='btn--flat offset-right' clickHandler={this.handleSearchSubmit.bind(this)}><Icon {...icon}/></Button>
                </div>
              </div>
            </Form>}
        </Hero>
        {(this.state.takeover && this.props.hasSearch) && <section className='masthead__takeover'>
          <div className='masthead__takeover__inner'>
            <Button ref={node => { this.node = node }} className='close' clickHandler={this.handleSearchClick.bind(this)}><Icon {...iconClose}/></Button>
            <Form className='form--search' role='search'>
              <div className='field'>
                <div className='field has-addons is-marginless'>
                  <input className='input is-large' type='text' placeholder='Search'/>
                  <Button className='btn--flat offset-right' clickHandler={this.handleSearchSubmit.bind(this)}><Icon {...icon}/></Button>
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









