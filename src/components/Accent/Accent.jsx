import React from 'react'

const Accent = props => {
  return (
    <section className={`accent ${props.className}`}>
      <div className={props.modifier}>
        {props.children}
      </div>
    </section>
  )
}

Accent.defaultProps = {
  className: '',
  modifier: ''
}
export default Accent
