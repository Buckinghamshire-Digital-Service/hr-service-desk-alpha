
import React from 'react'
import { Link } from 'gatsby'
import Heading from '../Heading/Heading.jsx'
import Anchor from '../Anchor/Anchor.jsx'

const LinkItem = props => {
console.log(props)
  return (
    <li className='list-item' target='_blank'>
      <a href={props.mediaLink} className='download-block'>
        <span className='download '><span className='is-sr-only'>Download</span></span>
        <h3 className={`lead underlined ${props.isLocked ? 'locked' : ''}`}>{props.title}</h3>
        {props.description && <p>{props.description}</p>}
      </a>
    </li>
  )
}

const DownloadBlock = props => {
  let parent = props.downloads[0].node.contentfulparent

  return (

    <div className='list raised'>
      <div className='list__item list__item--no-pad'>
        <header className='list__header'>
          <Link to={`/${parent.slug}`} className='list-item__link'>
            <Heading text={parent.title} className='h3'/>
          </Link>
        </header>
        {props.downloads && <ul className='list list--separated'>{props.downloads.map((v, i) => {
          return <LinkItem key={v.node.id} {...v.node}/>
        })}</ul>}
        
        <footer className='list__footer'>
          <Anchor href={`/${parent.slug}`} className='text-link--large' text={parent.title} />
        </footer> 
      </div>
    </div>

  )
}

export default DownloadBlock
