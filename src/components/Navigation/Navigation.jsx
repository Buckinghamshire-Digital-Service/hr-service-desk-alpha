import React from 'react'
//import { Link } from 'gatsby'

const Navigation = (props) => (
  <React.Fragment>
    {props.items && props.items.map((v, i) => <a key={i} href={v.url} className={`navbar-item ${v.modifier}`} {...v.tracking} >{v.label}</a>)}        
  </React.Fragment>
)

export default Navigation