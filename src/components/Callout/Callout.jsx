import React from 'react'

const Callout = props => {
  let classes = `callout ${props.className}`

  return (
    <section className={classes}>
    Callout
      {props.content}
    </section>
  )
}

Callout.defaultProps = {
  className: ''
}


export default Callout
