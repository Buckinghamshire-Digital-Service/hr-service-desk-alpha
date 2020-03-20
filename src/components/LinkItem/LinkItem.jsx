import React from 'react'

const LinkItem = props => {
  return (
    <li className='list-item'>
      <a href={props.mediaLink} className='download-block list__link' onClick={() => props.event('Document download','Click',props.title)} target='_blank' rel='noreferrer'>
        <span className='download '><span className='is-sr-only'>Download</span></span>
        <p className={`lead sp--flush ${props.isLocked ? 'locked' : ''}`}><strong>{props.title}</strong></p>
        {props.description && <p className='no-underline'>{props.description}</p>}
      </a>
    </li>
  )    
}

export default LinkItem