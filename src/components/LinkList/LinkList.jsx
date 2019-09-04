import React from 'react'
import { Link } from 'gatsby'
import Heading from '../Heading/Heading.jsx'

const LinkList = props => {
  const items = props.items['en-US'] !== undefined ? props.items['en-US'] : props.items

  return (
    <ul className={`list ${props.className}`}>
      {items && items.map((v, i) => {
        const link = (v.parentPage && v.parentPage.slug) !== undefined ? `/${v.parentPage.slug}/${v.slug}/` : `/${v.slug}/`
        return (
          <li className='list__item' key={i}>
            <Link to={link} className='list-item__link'>
              <Heading text={v.title} className={`list-item__title ${props.simple ? 'has-chevron' : ''}`}/>
              {(v.metaDescription && !props.simple) && 
              <><p>{v.metaDescription}</p>
                <p className='has-chevron'><span className='underlined'>Find out more</span>
                <span className='is-sr-only'> about {v.title}</span></p>
              </>}
            </Link>
          </li>
        )
      }
    )}
    </ul>
  )
}

LinkList.defaultProps = {
  className: ''
}

export default LinkList


