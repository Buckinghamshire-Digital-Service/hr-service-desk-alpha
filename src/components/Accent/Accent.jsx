import React from 'react'

const Accent = props => {
  return (
    <section className={`accent ${props.className}`}>
        {props.children}
    </section>
  )
}

Accent.defaultProps = {
	className: '',
	modifier: ''
}
export default Accent
