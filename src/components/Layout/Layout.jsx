import React from 'react'
import { Link } from 'gatsby'
import Container from '../Container/Container.jsx'
import Masthead from '../Masthead/Masthead.jsx'
import Footer from '../Footer/Footer.jsx'
import Skiplinks from '../Skiplinks/Skiplinks.jsx'
import { PageView, initGA } from '../GoogleAnalytics/GoogleAnalytics'

class Layout extends React.PureComponent {
  constructor(props) {
    super(props)
  }  
  
  componentDidMount() {
    initGA(this.props.ga)
    PageView()
  }

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
        <Container className={this.props.className}>
          <Masthead location={location} hasSearch={this.props.hasSearch} hero={this.props.hero}/>
          {children}
        </Container>
        <Footer />
      </>
    )
  }
}

Layout.defaultProps = {
  className: '',
  hero: null
}

export default Layout
