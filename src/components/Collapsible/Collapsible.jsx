import React from 'react'
import classNames from 'classnames'
import Anchor from '../Anchor/Anchor.jsx'
import { scrollIntoView, returnId } from '../../utilities'
import Text from '../Text/Text.jsx'
import { Event } from '../GoogleAnalytics/GoogleAnalytics'

export default class Collapsible extends React.PureComponent {
  constructor (props) {
    super(props)
    this.title = this.props.title// !== undefined ? this.props.title : this.props.title
    this.id = returnId(this.title)
    this.state = {
      visible: this.props.open === true || this.props.className === 'collapsible_trigger--active',
      height: 0,
      actualHidden: (this.props.history && (this.props.history.hash === '#' + this.id)) ? false : true,
      dir: 'down'      
    }
  }

  toggle (event) {
    event.preventDefault()
    this.eventAndAria()

    setTimeout(() => {
      this.setState({
        visible: !this.state.visible,
        dir: !this.state.visible ? 'up' : 'down',
        height: !this.state.visible ? this.panel.clientHeight : 0
      })
    }, 0) 

    if (this.props.history) {
      if ('replaceState' in history) {
        let path = (window.location.hash === `#${this.id}`) ? this.props.history.pathname : event.target.href
        window.history.replaceState({}, document.title, path)
      }
    }

  }

  eventAndAria() {
    // only send on opening 
    if (!this.state.visible) {
      Event('Collapsible','Open collapsible',this.props.title)
      
      this.setState({
        actualHidden: false
      })
    } else {
      setTimeout(() => {
        this.setState({
          actualHidden: true
        })
      }, 500)       
    }
  }

  componentDidMount () {

    if (this.props.history && (this.props.history.hash === '#' + this.id)) {
      this.setState({ 
        visible: true,
        actualHidden: false,
        height: this.panel.clientHeight 
      })

      scrollIntoView(this.node)
      return
    }

    this.setState({
      height: this.state.visible ? this.panel.clientHeight : 0
    })

  }

  render () {
    let label = this.props.ariaLabel

    let classes = classNames('collapsible collapsible--chevron', this.props.className, {
      'collapsible--active': this.state.visible
    })
    let contentClasses = classNames('collapsible__content', {
      'collapsible__content--active': this.state.visible
    })
    let toggleClass = classNames('collapsible__trigger', {
      'collapsible__trigger--active': this.state.visible
    })

    let hidden = this.state.actualHidden ? { 'hidden': true } : null

    return (
      <div className={classes} ref={node => { this.node = node }}>
        <div className='collapsible__wrapper'>
          <h2 className='collapsible__title'>
            <a role='button' href={`#${this.id}`} id={this.id} className={toggleClass} onClick={this.toggle.bind(this)} aria-expanded={this.state.visible} aria-controls={`section-${this.id}`} aria-label={label || this.title}>
            {this.title}
            </a>
          </h2>
          <div className={contentClasses} aria-hidden={!this.state.visible} id={`section-${this.id}`} {...hidden} role='region' aria-labelledby={this.id} style={{height: this.state.height}}>
            <div className='collapsible__inner' ref={panel => { this.panel = panel }}>
              <Text content={this.props.content.childMarkdownRemark.html}/>
              {this.props.mediaLink && <ul className='list list--no-bullet'>{this.props.mediaLink.map(v => <li key={v.id} className='list__item'><a className={`list__link text-link ${v.type}`} href={v.mediaLink} onClick={() => Event('Media download link','Click',v.title) }>{`${v.title}${v.description !== null ? ' - ' + v.description : ''}`}</a></li>)}</ul>}
              {this.props.link && <Anchor className='text-link' href={`/${this.props.links[this.props.link.id]}`} text={`Read more about ${this.props.link.title}`} onClick={() => Event('Collapsible link','Click',this.props.link.title)}/>}
            </div>        
          </div>
        </div>
      </div>
    )
  }
}


