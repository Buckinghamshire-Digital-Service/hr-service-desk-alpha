import React from 'react'
import { Link } from 'gatsby'
import Text from '../Text/Text.jsx'
import Heading from '../Heading/Heading.jsx'

const ListItem = (props) => {
  return (
    <article className='panel panel--raised'>
      <Link to={`/${props.slug}`}>
        <Heading text={props.title} className='list__title'/>
        {props.metaDescription && <Text content={props.metaDescription}/>}
        Find out more <span className='visually-hidden'>about {props.title}</span>
      </Link>
    </article>
  )
}

export default ListItem