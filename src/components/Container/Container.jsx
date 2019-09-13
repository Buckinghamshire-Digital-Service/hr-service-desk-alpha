import React from 'react'

const Container = props => (
  <div className={`container ${props.className}`}>{props.children}</div>
)

Container.defaultProps = {
	className: ''
}

export default Container