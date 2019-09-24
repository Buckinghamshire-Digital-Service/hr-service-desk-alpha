import React from 'react'
import { Link } from 'gatsby'
import Heading from '../Heading/Heading.jsx'
import Button from '../Button/Button.jsx'
import ButtonGroup from '../ButtonGroup/ButtonGroup.jsx'
import { Event } from '../GoogleAnalytics/GoogleAnalytics'

const ctaClick = (title) => {
  Event('CTA links homepage','Click',title)
}

const LinkList = props => {
  const items = props.items['en-US'] !== undefined ? props.items['en-US'] : props.items

  return (
    <ul className={`list ${props.className}`}>
      {items && items.map((v, i) => {
        const link = (v.parentPage && v.parentPage.slug) !== undefined ? `/${v.parentPage.slug}/${v.slug}/` : `/${v.slug}/`
        const content = v.metaDescription !== undefined ? v.metaDescription : null
        return (
          <li className='column is-half-tablet' key={i}>
            <div className='list__item list__item--has-button'>
              <Link to={link} className='list-item__link' onClick={() => Event('Top level links homepage','Click',v.title)}>
                <Heading text={v.title} type={props.type} className={`list-item__title ${props.simple ? 'has-chevron' : ''}`}/>
              </Link>
              {content && <Heading type='p' text={content} />}
              <ButtonGroup className='button-group--fixed'>
                <Button url={link} className='btn--has-radius btn--primary btn--full-width' aria-hidden  clickHandler={() => ctaClick(v.title)}>
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