import React from 'react'
import { Link } from 'gatsby'
import { Event } from '../GoogleAnalytics/GoogleAnalytics'

const Download = props => {
  return (
    <div className={`panel panel--inverted panel--padding-small`}>
      <Link to='/downloads' className='download-link lead flush padding--h-flush d-block' onClick={() => Event('Download items link','Click')}>
        <span>Go to document download</span>
        <span className='download download--small spaced-left'></span>
      </Link>
    </div>
  )
}

export default Download




