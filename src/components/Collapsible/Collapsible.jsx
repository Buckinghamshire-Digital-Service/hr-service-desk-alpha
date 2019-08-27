import React from 'react'
import classNames from 'classnames'
import { scrollIntoView } from '../../utilities'
import Grid from '../Grid/Grid.jsx'
import GridCol from '../GridCol/GridCol.jsx'

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
    // if (this.props.history.hash === '#' + this.returnId()) {
    //   this.setState({ visible: true })
    //   scrollIntoView(this.node)
    // }
  }

  returnId () {
    return this.props.title['en-US'].toLowerCase().trim().replace(/[^\w\s]|_/g, '').replace(/ /g, '-')
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

    return (
      <div className={classes} id={id} ref={node => { this.node = node }}>
        <Grid>
          <GridCol className='col-12 col-md-7'>
            <h2 className='h4'>
              <a role='button' href={`#${id}`} data-target={`#${id}`} className={toggleClass} onClick={this.toggle.bind(this)} aria-expanded={this.state.visible} aria-controls={`section-${id}`}>
              {title}
              </a>
            </h2>
            <div className={contentClasses} aria-hidden={!this.state.visible} id={`section-${id}`}>
              {this.props.content['en-US']}
            </div>
          </GridCol>
        </Grid>
      </div>
    )
  }
}
