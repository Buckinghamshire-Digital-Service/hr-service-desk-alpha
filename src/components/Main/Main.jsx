import React from 'react'

const Main = (props) => {
  let classes = `main ${props.className}`
  return (
    <main className={classes} id='main' tabIndex='-1'>
      {props.children}
    </main>
  )
}

Main.defaultProps = {
  className: ''
}

export default Main
