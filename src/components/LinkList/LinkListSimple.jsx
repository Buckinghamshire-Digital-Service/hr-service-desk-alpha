import React from 'react'
import { Link } from 'gatsby'
import Heading from '../Heading/Heading.jsx'
import { Event } from '../GoogleAnalytics/GoogleAnalytics'

const LinkListSimple = props => {
  const items = props.items['en-US'] !== undefined ? props.items['en-US'] : props.items

  return (
    <ul className={`list ${props.className}`}>
      {items && items.map((v, i) => {
        const link = (v.parentPage && v.parentPage.slug) !== undefined ? `/${v.parentPage.slug}/${v.slug}/` : `/${v.slug}/`

        return (
          <li className='list__item' key={i}>
            <Link to={link} className='list-item__link'>
              <Heading text={v.title} type={props.type} className='list-item__title has-chevron' onClick={() => Event('Homepage extra navigation','Click',v.title) }/>
            </Link>
          </li>
        )
      }
    )}
    </ul>
  )
}

LinkListSimple.defaultProps = {
  className: '',
  type: 'h2'
}

export default LinkListSimple