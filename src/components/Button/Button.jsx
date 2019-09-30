import React from 'react'
import classNames from 'classnames'
import { Link } from 'gatsby'

export default class Button extends React.PureComponent {
  onClick (event) {
    const { clickHandler } = this.props

    if (!clickHandler) {
      return
    }

    // event.preventDefault()
    // event.stopPropagation()

    const handler = clickHandler()
  }

  render () {
    let component
    let data = {}
    let { children, url, label, type, name } = this.props
    let classes = `btn ${this.props.className}`

    // list out aria- attributes and stick em in
    for (const prop in this.props) {
      if (/^aria-/.test(prop)) {
        data[prop] = this.props[prop]
      }
    }

    let id = this.props.id ? {'id': [this.props.id]} : null
    let tabindex = this.props.tabIndex ? {'tabIndex': this.props.tabIndex} : null
    
    if (url || type === 'a') {
      component = (
        <Link to={url}
          className={classes}
          role='button'
          name={name || label} 
          {...data}
          {...tabindex}
          {...id}
          onClick={event => this.onClick(event)}>
          {children}{label}</Link>
      )
    } else {
      component = (
        <button 
          {...data}
          {...id}
          name={name || label} 
          {...tabindex}
          onClick={event => this.onClick(event)}
          className={classes} type={type}>
          {children}{label}
        </button>
      )
    }

    return component
  }
}

Button.defaultProps = {
  className: ''
}