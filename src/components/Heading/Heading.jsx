import React from 'react'

const Heading = props => {
  const Tag = `${props.type['en-US'] || 'h2'}`
  const text = props.text['en-US']
  console.log(text)

  return (
    <Tag className={props.className} id={props.id || null} dangerouslySetInnerHTML={{__html: text}}></Tag>
  )
}

export default Heading
