import React from 'react'
import Heading from '../Heading/Heading.jsx'

const PageTitle = props => {

  return (
    <header className={`page-header ${props.className}`}>
      <Heading type='h1' text={props.text} className='page-title'/>
    </header>
  )
}

PageTitle.defaultProps = {
  className: ''
}

export default PageTitle