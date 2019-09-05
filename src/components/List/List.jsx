import React from 'react'

const List = props => {
  const Tag = `${props.type['en-US'] || props.type}`

  return (
    <Tag className={`list ${props.className}`}>
      {props.items && props.items['en-US'].map((v, i) => <li className='list__item' key={i}>{v}</li>)}
    </Tag>
  )
}

List.defaultProps = {
  type: 'ul',
  className: ''
}

export default List
