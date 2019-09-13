import React from 'react'

const Field = props => {
  let classes = `field ${props.className}`

  return (
    <div className={classes}>
      <div className='control'>
        <input className='input is-large' type='text' placeholder={props.placeholder}/>
      </div>
    </div>
  )
}

Field.defaultProps = {
  className: '',
  placeholder: 'How can we help?'
}

export default Field