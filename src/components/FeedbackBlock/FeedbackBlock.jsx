import React from 'react'
import Heading from '../Heading/Heading.jsx'
import FeedbackForm from '../FeedbackForm/FeedbackForm.jsx'

const FeedbackBlock = props => {
  return (
    <div className='feedback-block'>
      <div className="wrapper wrapper--constant">
        <Heading className='panel__title' text='Was this page helpful?' />
        <Heading type='p' text="Help us improve the site by telling us if there was anything on this page you didn’t understand, couldn’t find or just didn’t like." />
        <FeedbackForm location={props.location} />
      </div>
    </div>
  )
}

export default FeedbackBlock
