import React from 'react'

const Progress = props => {
  let classes = `progress ${props.className}`

  return (
    <section className={classes}>
      PROGRESS COMPONENT
      {props.items && props.items['en-US'].map((v, i) => <li className='list__item' key={i}>{v}</li>)}
    </section>
  )
}

Progress.defaultProps = {
  className: ''
}

export default Progress