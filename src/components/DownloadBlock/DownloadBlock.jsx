import React from 'react'
import Heading from '../Heading/Heading.jsx'
import Anchor from '../Anchor/Anchor.jsx'
import LinkItem from '../LinkItem/LinkItem.jsx'
import { Event } from '../GoogleAnalytics/GoogleAnalytics'

const DownloadBlock = props => {
  let parent = props.downloads[0].node.contentfulparent
  let downloads = props.downloads.map(v => {
    v.node['mediaLink'] = v.node.mediaFile && v.node.mediaFile.file && 'https:' + v.node.mediaFile.file.url
// console.log(v.node.mediaFile.file)
    return v
  }) 

  return (

    <div className='list raised'>
      <div className='list__item list__item--no-pad'>
        <header className='list__header'>
          <Heading text={parent.title} className='h3 sp--flush'/>
        </header>
        {props.downloads && <ul className='list list--separated list--bordered'>{props.downloads.map((v, i) => {
          return <LinkItem event={Event} key={v.node.id} {...v.node}/>
        })}</ul>}
        
        <footer className='list__footer'>
          <Anchor href={`/${parent.slug}`} className='text-link--large' text={parent.title} />
        </footer> 
      </div>
    </div>

  )
}

export default DownloadBlock
