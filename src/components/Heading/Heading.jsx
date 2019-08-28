import React from 'react'

const Heading = props => {
  const Tag = `${props.type['en-US'] || props.type}`
  const text = props.text['en-US'] || props.text

  return (
    <Tag className={props.className} id={props.id || null} dangerouslySetInnerHTML={{__html: text}}></Tag>
  )
}

Heading.defaultProps = {
  type: 'h2'
}

export default Heading
