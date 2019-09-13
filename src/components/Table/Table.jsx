import React from 'react'

const Table = props => {
  let classes = `table container ${props.className}`
  console.log(props)

  return (
    <section className={classes}>
      Table COMPONENT
      // {props.items && props.items['en-US'].map((v, i) => <li className='list__item' key={i}>{v}</li>)}
    </section>
  )
}

Table.defaultProps = {
  className: ''
}

export default Table