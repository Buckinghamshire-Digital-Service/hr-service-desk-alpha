import React from 'react'
import { Link } from 'gatsby'
import Container from '../Container/Container.jsx'
import Masthead from '../Masthead/Masthead.jsx'
import Footer from '../Footer/Footer.jsx'
import Skiplinks from '../Skiplinks/Skiplinks.jsx'

class Layout extends React.PureComponent {
  render() {
    const { location, children } = this.props
    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    return (
      <>
        <Skiplinks />
        <Container>
          <Masthead location={location} hasSearch={this.props.hasSearch}/>
          {children}
        </Container>
        <Footer />
      </>
    )
  }
}

export default Layout
