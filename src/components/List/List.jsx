import React from 'react'

const List = props => {
  const Tag = `${props.type['en-US'] || props.type}`

  return (
    <React.Fragment>
      <Tag className={`list ${props.className}`}>
      {props.items && props.items['en-US'].map((v, i) => <li className='xlist__item' key={i}>{v}</li>)}
      </Tag>
    </React.Fragment>
  )
}

List.defaultProps = {
  type: 'ul',
  className: ''
}

export default List
