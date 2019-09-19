import React from 'react'
// import { Link } from 'gatsby'
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
          <li className='column is-half-tablet' key={i}>
            <div className='list__item list__item--has-button'>
              <a href={link} className='list-item__link'>
                <Heading text={v.title} type={props.type} className={`list-item__title ${props.simple ? 'has-chevron' : ''}`}/>
              </a>
              {(v.summary || v.metaDescription) && <Heading type='p' text={v.summary.childMarkdownRemark.html || v.metaDescription} />}
              <ButtonGroup className='button-group--fixed'>
                <Button url={link} className='btn--has-radius btn--primary btn--full-width' aria-hidden>
                  Find out more
                  <span className='is-sr-only'> about {v.title}</span>
                </Button>
              </ButtonGroup>
            </div>
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