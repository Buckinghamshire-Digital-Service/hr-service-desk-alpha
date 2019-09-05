import React from 'react'
import { Link } from 'gatsby'

const Anchor = props => {
  let aria = props.label ? {'aria-label': props.label} : null
  return (
    <Link to={props.href} onClick={props.onClick} {...aria} className={props.className}>{props.text}{props.children}</Link>
  )
}

export default Anchor
