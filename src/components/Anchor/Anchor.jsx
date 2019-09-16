import React from 'react'
import { Link } from 'gatsby'

const Anchor = props => {
  let aria = props.label ? {'aria-label': props.label} : null
  return (
    <Link to={props.href} onClick={props.onClick} {...aria} className={`has-chevron underlined ${props.className}`}>{props.text}</Link>
  )
}

Anchor.defaultProps = {
	className: ''
}

export default Anchor
