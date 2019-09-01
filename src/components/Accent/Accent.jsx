import React from 'react'

const Accent = props => {
  let classes = `accent ${props.className || ''}`

  return (
    <section className={classes}>
      <div className={`wrapper ${props.modifier || ''}`}>
      ACCENT
        {props.children}
      </div>
    </section>
  )
}

export default Accent
