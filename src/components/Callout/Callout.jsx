import React from 'react'

const Callout = props => {
  let classes = `callout ${props.className}`

  return (
    <section className={classes}>
      CALLOUT COMPONENT
    </section>
  )
}

Callout.defaultProps = {
  className: ''
}


export default Callout
