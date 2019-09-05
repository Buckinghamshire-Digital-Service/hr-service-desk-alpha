import React from 'react'

const Blockquote = props => {
  let classes = `blockquote ${props.className}`

  return (
    <section className={classes}>
      <div className={`wrapper ${props.modifier || ''}`}>
      BLOCQUIOOTE
        {props.children}
      </div>
    </section>
  )
}


Blockquote.defaultProps = {
  className: ''
}


export default Blockquote
