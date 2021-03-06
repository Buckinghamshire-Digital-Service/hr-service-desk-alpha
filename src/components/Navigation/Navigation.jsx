import React from 'react'
import { Link } from 'gatsby'
import { Event } from '../GoogleAnalytics/GoogleAnalytics'

const handleItemClick = (e) => {
  Event(e.category,e.action,e.label)
}

const Navigation = (props) => (
  <React.Fragment>
    {props.items && props.items.map((v, i) => <Link activeClassName='active' partiallyActive={true} key={i} to={v.url} className='navbar-item' onClick={() => handleItemClick(v.tracking)}>{v.label}</Link>)}        
  </React.Fragment>
)

export default Navigation