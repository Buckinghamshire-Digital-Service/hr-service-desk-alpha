import React from 'react'
import classNames from 'classnames'
import { scrollIntoView, returnId } from '../../utilities'
import Text from '../Text/Text.jsx'

export default class Collapsible extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      visible: this.props.open['en-US'] === 'Yes' || this.props.className === 'collapsible_trigger--active'
    }
  }

  toggle (event) {
    event.preventDefault()
    this.setState({ visible: !this.state.visible })

    if (this.props.history) {
      if ('replaceState' in history) {
        let path = (window.location.hash === event.target.getAttribute('data-target')) ? this.props.history.pathname : event.target.href
        window.history.replaceState({}, document.title, path)
      }
    }
  }

  componentDidMount () {
    // if (this.props.history.hash === '#' + returnId(this.props.title['en-US'])) {
    //   this.setState({ visible: true })
    //   scrollIntoView(this.node)
    // }
  }

  returnId () {
    return returnId(this.props.title['en-US'])
  }

  render () {
    
    let title = this.props.title['en-US']
    const id = this.returnId()

    let classes = classNames('collapsible', this.props.className, {
      'collapsible--active': this.state.visible
    })
    let contentClasses = classNames('collapsible__content', {
      'collapsible__content--active': this.state.visible
    })
    let toggleClass = classNames('collapsible__trigger', {
      'collapsible__trigger--active': this.state.visible
    })

    let label = this.props.ariaLabel['en-US'] !== undefined ? this.props.ariaLabel['en-US'] : this.props.ariaLabel

    return (
      <div className={classes} id={id} ref={node => { this.node = node }}>

        <h2 className='h4'>
          <a role='button' href={`#${id}`} data-target={`#${id}`} className={toggleClass} onClick={this.toggle.bind(this)} aria-expanded={this.state.visible} aria-controls={`section-${id}`} aria-label={label || title}>
          {title}
          </a>
        </h2>
        <div className={contentClasses} aria-hidden={!this.state.visible} id={`section-${id}`}>
          <Text content={this.props.content}/>
        </div>

      </div>
    )
  }
}
