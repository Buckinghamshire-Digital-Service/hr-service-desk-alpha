import React from 'react'
import ReactGA from 'react-ga'
import Form from '../Form/component.jsx'
import Button from '../Button/component.jsx'
import Textarea from '../Textarea/component.jsx'
import { getCookie } from '../../lib/cookie.js'

export default class FeedbackForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      feedback: '',
      hint: 'Must be fewer than 500 characters'
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      feedback: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.state.feedback !== '') {
      // set userId and fire analytic event
      ReactGA.event({
        category: 'page feedback for ' + event.target.pageTitle,
        action: this.state.feedback,
        label: getCookie('userId')
      })
      this.setState({
        hint: 'Your feedback has been sent - thank you',
        feedback: ''
      })
    }
  }

  render () {
    return (
      <Form className='spacing-bottom--large' handleSubmit={this.handleSubmit}>
        <Textarea pageTitle={this.props.pageTitle} maxlength='500' label='Your feedback' id='feedback' name='feedback' value={this.state.feedback} onChange={this.handleChange} hint={this.state.hint} hintId='feedback-hint-id' />
        <Button className='btn--primary' wrapped='true'>Send feedback</Button>
      </Form>
    )
  }
}
