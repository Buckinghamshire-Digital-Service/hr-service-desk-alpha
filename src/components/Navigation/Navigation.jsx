import React from 'react'
import { Link } from 'gatsby'
import ReactGA from 'react-ga'

const handleItemClick = (e) => {
  ReactGA.event({
    category: e.category,
    action: e.action,
    label: e.label
  })
}

const Navigation = (props) => (
  <React.Fragment>
    {props.items && props.items.map((v, i) => <Link key={i} to={v.url} className='navbar-item' onClick={() => handleItemClick(v.tracking)}>{v.label}</Link>)}        
  </React.Fragment>
)

export default Navigation