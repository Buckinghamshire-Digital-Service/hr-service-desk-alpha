import React from 'react'
import Button from '../Button/Button.jsx'

const Link = props => {

  return (
    <div className=''>
      <Button href={props.url} className='raised has-chevron btn--link h3 text-left btn--large'>
        {props.title}
      </Button>
    </div>
  )
}

export default Link
