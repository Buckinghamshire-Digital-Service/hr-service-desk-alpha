import React from 'react'
import { Link } from 'gatsby'

const Download = props => {
  return (
    <div className={`panel panel--flat panel--padding-small ${props.flush ? 'panel--inverted' : 'panel--has-heading'}`}>
      <Link to='/downloads' className='lead '>
        <span>Go to download index</span>
        <span className='download download--small spaced-left'></span>
      </Link>
    </div>
  )
}

export default Download




