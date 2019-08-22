import React from 'react'

const Progress = props => {
  let classes = `progress ${props.className}`

  return (
    <section className={classes}>
      PROGRESS COMPONENT
    </section>
  )
}


Progress.defaultProps = {
  className: ''
}


export default Progress
