import React from 'react'
import classNames from 'classnames'
import Logo from '../Logo/Logo.jsx'
import Button from '../Button/Button.jsx'
import Field from '../Field/Field.jsx'
import CookieBar from '../CookieBar/CookieBar.jsx'
import Icon from '../Icon/Icon.jsx'
import Anchor from '../Anchor/Anchor.jsx'
import { Link, graphql, navigate} from 'gatsby'
import { primary } from '../../fixtures/navigation.js'
import Navigation from '../Navigation/Navigation.jsx'
import Hero from '../Hero/Hero.jsx'
import Form from '../Form/Form.jsx'
import { Event } from '../GoogleAnalytics/GoogleAnalytics'
import { ViewportMobile, ViewportDefault } from '../Breakpoints/Breakpoints.jsx'


export default class Masthead extends React.PureComponent {
  constructor () {
    super()
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    this.searchText = this.searchText.bind(this)
    this.searchInput = React.createRef()
    this.state = {
      mobileMenuOpen: false,
      takeover: false, 
      query: ''
    }
  }

  searchText(e) {
    const query = e.target.value

    this.setState({
      query: query
    })    
  }

  handleSearchSubmit (e) {
    e.preventDefault()

    const searchTerm = encodeURIComponent(
      this.state.query.toLowerCase().trim()
    )

    if (searchTerm !== '') {
      Event('Search term submit', 'Submit', searchTerm)
      
      if (!this.props.update) {
        navigate('/search/?q='+searchTerm, {
          state: {
            query: this.state.query
          }
        })
      } else {
        this.setState({
          takeover: false
        })

        this.props.update(searchTerm)
      }
    }
  }

  handleSearchClick () {
    const el = document.documentElement.classList
    this.setState({
      takeover: !this.state.takeover
    })
    // ugh add a class to the html element - redux doesn't reach this far up
    this.state.takeover ? el.remove('html-takeover') : el.add('html-takeover')

    setTimeout(() => {
      if (this.searchInput && this.searchInput.current) {
        this.searchInput.current.focus()
        Event('Search modal opened', 'Click', this.props.location.pathname)
      }
    }, 150)
  }

  handleMenuClick () {
    this.setState({
      mobileMenuOpen: !this.state.mobileMenuOpen
    })
  }

  render () {
    let iconWhite = {
      label: 'Search',
      url: '../../../svg/magnifying-white.svg'
    } 
    let icon = {
      label: 'Search',
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
        <Hero hero={this.props.hero} className={this.props.parentPage ? 'hero--shallow' : ''}>
          <CookieBar />
          <div className='masthead__inner'>
            <section className='navigation-wrapper'>
              <nav className='navbar' role='navigation' aria-label='main navigation'>
                <div className='navbar-brand'>
                  <Logo url={logo.url} alt={logo.label} className='navbar-item'/>

                  <ViewportMobile>
                    <Button aria-hidden='false' className={`navbar-burger burger ${this.state.mobileMenuOpen ? 'is-active' : ''}`} aria-controls='nav-primary' aria-haspopup={!this.state.mobileMenuOpen} aria-expanded={this.state.mobileMenuOpen} aria-label={this.state.mobileMenuOpen ? 'Hide navigation' : 'Show navigation'} clickHandler={this.handleMenuClick.bind(this)} data-target='nav-primary'>
                      <span aria-hidden='true'></span>
                      <span aria-hidden='true'></span>
                      <span aria-hidden='true'></span>
                    </Button>

                    {this.props.hasSearch && <Button className='btn--flat is-hidden-tablet offset-top' clickHandler={this.handleSearchClick.bind(this)}><Icon {...iconWhite}/></Button>}
                  </ViewportMobile>                
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
          {!this.props.hasSearch && <Form id={'home-hero-search'} submitHandler={this.handleSearchSubmit} query={this.state.query} ariaHidden={ariaHidden} icon={icon} onChangeHandler={this.searchText}/>}
        </Hero>
        {(this.state.takeover && this.props.hasSearch) && <section className='masthead__takeover'>
          <div className='masthead__takeover__inner'>
            <Button className='close' clickHandler={this.handleSearchClick.bind(this)}><Icon {...iconClose}/></Button>
            <Form id={'takeover-search'} submitHandler={this.handleSearchSubmit} query={this.state.query} ariaHidden={ariaHidden} icon={icon} onChangeHandler={this.searchText} reference={this.searchInput}/>
          </div>
        </section>}
        {(this.state.takeover && this.props.hasSearch) && <div className='takeover-bg' onClick={this.handleSearchClick.bind(this)}/>}
      </header>
    )
  }
}









