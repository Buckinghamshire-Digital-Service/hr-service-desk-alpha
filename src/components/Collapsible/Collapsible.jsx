import React from 'react'
import classNames from 'classnames'
import { scrollIntoView, returnId } from '../../utilities'
import Text from '../Text/Text.jsx'

export default class Collapsible extends React.PureComponent {
  constructor (props) {
    super(props)
    this.title = this.props.title// !== undefined ? this.props.title : this.props.title
    this.state = {
      visible: this.props.open === true || this.props.className === 'collapsible_trigger--active',
      height: 0,
      dir: 'down'      
    }
  }

  toggle (event) {
    event.preventDefault()
    this.setState({
      visible: !this.state.visible,
      dir: !this.state.visible ? 'up' : 'down',
      height: !this.state.visible ? this.panel.clientHeight : 0
    })

    if (this.props.history) {
      if ('replaceState' in history) {
        let path = (window.location.hash === event.target.getAttribute('data-target')) ? this.props.history.pathname : event.target.href
        window.history.replaceState({}, document.title, path)
      }
    }
  }

  componentDidMount () {
    this.setState({height: this.state.visible ? this.panel.clientHeight : 0})
    if (this.props.history && (this.props.history.hash === '#' + returnId(this.title))) {
      this.setState({ visible: true })
      scrollIntoView(this.node)
    }
  }

  render () {
    const id = returnId(this.title)

    let classes = classNames('collapsible collapsible--chevron', this.props.className, {
      'collapsible--active': this.state.visible
    })
    let contentClasses = classNames('collapsible__content', {
      'collapsible__content--active': this.state.visible
    })
    let toggleClass = classNames('collapsible__trigger', {
      'collapsible__trigger--active': this.state.visible
    })

    let label = this.props.ariaLabel 

    return (
      <div className={classes} id={id} ref={node => { this.node = node }}>
        <h2 className='collapsible__title'>
          <a role='button' href={`#${id}`} data-target={`#${id}`} className={toggleClass} onClick={this.toggle.bind(this)} aria-expanded={this.state.visible} aria-controls={`section-${id}`} aria-label={label || this.title}>
          {this.title}
          </a>
        </h2>
        <div className={contentClasses} aria-hidden={!this.state.visible} id={`section-${id}`} style={{height: this.state.height}}>
          <div className='collapsible__inner' ref={panel => { this.panel = panel }}>
            <Text content={this.props.content.childMarkdownRemark.html}/>
          </div>        
        </div>
      </div>
    )
  }
}
