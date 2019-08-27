import React from 'react'

const Callout = props => {
  let classes = `callout ${props.className}`
  console.log(props)
  return (
    <section className={classes}>
      {props.content['en-US']}
    </section>
  )
}

Callout.defaultProps = {
  className: ''
}


export default Callout
