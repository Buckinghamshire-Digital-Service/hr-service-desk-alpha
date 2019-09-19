import React from 'react'
import { Link } from 'gatsby'

const Download = props => {
  return (
    <div className={`panel panel--inverted panel--padding-small`}>
      <Link to='/downloads' className='lead flush padding--h-flush d-block'>
        <span>Go to download index</span>
        <span className='download download--small spaced-left'></span>
      </Link>
    </div>
  )
}

export default Download




