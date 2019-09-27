import React from 'react'
import Heading from '../Heading/Heading.jsx'
import { Event } from '../GoogleAnalytics/GoogleAnalytics'

const LinkListSimple = props => {
  const items = props.items['en-US'] !== undefined ? props.items['en-US'] : props.items

  return (
    <ul className={`list ${props.className}`}>
      {items && items.map((v, i) => {
        const external = {'target': v.newWindow === true ? '_blank' : null}
        return (
          <li className='list__item' key={i}>
            <a href={v.href} className='list-item__link' onClick={() => Event('Homepage external links','Click',v.title)} {...external}>
              <Heading text={v.title} type='span' className='list-item__title has-chevron'/>
            </a>
          </li>
        )
      }
    )}
    </ul>
  )
}

LinkListSimple.defaultProps = {
  className: ''
}

export default LinkListSimple