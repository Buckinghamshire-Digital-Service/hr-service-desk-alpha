import React from 'react'
import Accent from '../Accent/Accent'
import Icon from '../Icon/Icon'
import Anchor from '../Anchor/Anchor'
import { ClientOnly } from '../ClientOnly/ClientOnly'
import { getCookie, setCookie } from '../../lib/cookie.js'

export default class CookieBar extends React.PureComponent {
  constructor (props) {
    super(props)
    let cookieValue = getCookie('bucks-hr-cookies')
    this.state = {
      visible: (parseInt(cookieValue) === 1 ? false : true)
    }
  }

  closeMessage() {
    this.setState({
      visible: false
    })
    setCookie('bucks-hr-cookies', 1, 365)
  }

  render() {
    let iconClose = {
      label: 'close',
      url: '../../../svg/cross-black.svg'
    }

    return (
      <ClientOnly>
       {this.state.visible &&
       <Accent className='accent--muted accent--shallow'>
        <p className='has-icon'>
          This website uses cookies to make it simpler to use  <Anchor href='/cookies' text='Find out more about cookies'/>
          <button type='button'
             className='btn btn--flat'
             aria-label='Close cookie bar panel'
             onClick={this.closeMessage.bind(this)}>
             <Icon {...iconClose} />
          </button>
        </p>
       </Accent>
       }
      </ClientOnly>
    )
  }
}
