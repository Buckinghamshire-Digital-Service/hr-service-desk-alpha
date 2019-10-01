import React from 'react'
import Accent from '../Accent/Accent.jsx'
import Svg from '../Svg/Svg.jsx'
import Anchor from '../Anchor/Anchor.jsx'
import { ClientOnly } from '../ClientOnly/ClientOnly'
import { getCookie, setCookie } from '../../lib/cookie.js'
import { Event } from '../GoogleAnalytics/GoogleAnalytics'

export default class Feedback extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.closeMessage = this.closeMessage.bind(this)
    this.state = {
      visible: false
    }
  }

  componentDidMount() {
    let cookieValue = getCookie(`feedback-${this.props.id}`)
    if (!cookieValue) {
      setTimeout(() => {
        this.setState({
          visible: true
        })
      }, (this.props.delay * 1000))
    }
  }

  handleClick(ev) {
    ev.preventDefault()
    Event('Request to feedback', 'Click', this.props.id + ' - ' + this.props.title)
    window.location.href = this.props.url
  }

  closeMessage() {
    this.setState({
      visible: false
    })
    setCookie(`feedback-${this.props.id}`, 1, 365)
  }

  render() {
    let iconClose = {
      label: 'close',
      url: '../../../svg/cross-black.svg'
    }    
    return (
      <ClientOnly>
        {this.state.visible &&
          <Accent className='accent--loud accent--fixed' modifier='container container--padded is-relative has-icon'>
            <button type='button'
             className='btn btn--flat close close--top'
             aria-label='Close pop up message'
             onClick={this.closeMessage.bind(this)}>
             <Svg {...iconClose}/>
            </button>
            {this.props.title}
            {this.props.url && <a className='spaced-left' target='_blank' onClick={this.handleClick} href={this.props.url}>{this.props.callToAction}</a>}
          </Accent>
        }
      </ClientOnly>
    )
  }
}

Feedback.defaultProps = {
  delay: 0
}
