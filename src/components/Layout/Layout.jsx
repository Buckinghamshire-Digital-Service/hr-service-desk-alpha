import React from 'react'
import { Link } from 'gatsby'
import Container from '../Container/Container.jsx'
import Navigation from '../Navigation/Navigation.jsx'

class Layout extends React.PureComponent {
  render() {
    const { location, children } = this.props
    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    return (
      <Container>
        <Navigation location={location}/>
        {children}
      </Container>
    )
  }
}

export default Layout
