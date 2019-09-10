import React from 'react'
import { Link } from 'gatsby'
import Heading from '../Heading/Heading.jsx'
import Button from '../Button/Button.jsx'
import ButtonGroup from '../ButtonGroup/ButtonGroup.jsx'

const LinkList = props => {
  const items = props.items['en-US'] !== undefined ? props.items['en-US'] : props.items

  return (
    <ul className={`list ${props.className}`}>
      {items && items.map((v, i) => {
        const link = (v.parentPage && v.parentPage.slug) !== undefined ? `/${v.parentPage.slug}/${v.slug}/` : `/${v.slug}/`
        return (
          <li className={`list__item`} key={i}>
            <Link to={link} className='list-item__link'>
              <Heading text={v.title} type={props.type} className={`list-item__title ${props.simple ? 'has-chevron' : ''}`}/></Link>
            {(v.metaDescription && !props.simple) && <><p>{v.metaDescription}</p>
              <ButtonGroup>
                <Button href={link} className='btn--primary'>
                  Find out more
                  <span className='is-sr-only'> about {v.title}</span>
                </Button>
              </ButtonGroup></>}
          </li>
        )
      }
    )}
    </ul>
  )
}

LinkList.defaultProps = {
  className: '',
  type: 'h2'
}

export default LinkList