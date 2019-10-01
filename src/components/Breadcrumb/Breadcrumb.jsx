import React from 'react'
import { Link } from 'gatsby'
import { Event } from '../GoogleAnalytics/GoogleAnalytics'

const Breadcrumb = props => {
  const { pathname } = props.location
  let path = pathname.split('/').filter(v => v !== '')
  path.pop()
  path = path.join('/')
  const title = props.parent && props.parent.title !== undefined ? props.parent.title : 'Homepage'

  return (
    <div className={`breadcrumb ${props.className}`} aria-label='Breadcrumb'>
      <Link to={`/${path}`} onClick={() => Event('Breadcrumb link','Click',`/${path}`)} className='breadcrumb__link'>
        <p className='has-chevron has-chevron--reversed'><span className='underlined'>Back to {title}</span></p>
      </Link>
    </div>
  )
}

Breadcrumb.defaultProps = {
  className: ''
}

export default Breadcrumb