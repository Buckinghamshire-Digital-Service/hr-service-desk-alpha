
import React from 'react'
import { Link } from 'gatsby'
import Heading from '../Heading/Heading.jsx'
import Anchor from '../Anchor/Anchor.jsx'
import { Event } from '../GoogleAnalytics/GoogleAnalytics'

const LinkItem = props => {
  return (
    <li className='list-item'>
      <a href={props.mediaLink} className='download-block list__link' onClick={() => Event('Document download','Click',props.title)} target='_blank'>
        <span className='download '><span className='is-sr-only'>Download</span></span>
        <p className={`lead ${props.isLocked ? 'locked' : ''}`}><strong>{props.title}</strong></p>
        {props.description && <p className='no-underline'>{props.description}</p>}
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
          <Heading text={parent.title} className='h3 sp--flush'/>
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
