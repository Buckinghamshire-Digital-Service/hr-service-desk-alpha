import React from 'react'
import { Link } from 'gatsby'

const Download = props => {
  return (
    <div className='panel panel--flat panel--padding-small panel--has-heading'>
      <div className='container'><Link to='/downloads' className='lead lead--padded'>Go to download index <span className='download'></span></Link></div>
    </div>
  )
}

export default Download




