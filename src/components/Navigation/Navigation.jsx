import React from 'react'
import { Link } from 'gatsby'

const Navigation = (props) => (
  <>
    {props.items && props.items.map((v, i) => <Link key={i} to={v.url} className={`navbar-item ${v.modifier}`} {...v.tracking} >{v.label}</Link>)}        
  </>
)

export default Navigation