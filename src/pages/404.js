import React from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Icon from '../components/Icon/Icon.jsx'
import Layout from '../components/Layout/Layout.jsx'
import Main from '../components/Main/Main.jsx'
import Text from '../components/Text/Text.jsx'  
import Heading from '../components/Heading/Heading.jsx'
import Breadcrumb from '../components/Breadcrumb/Breadcrumb.jsx'
import PageTitle from '../components/PageTitle/PageTitle.jsx'
import Accent from '../components/Accent/Accent.jsx'

class ErrorPage extends React.PureComponent {
  render() {

    const site = get(this.props, 'data.site.siteMetadata')
    console.log(this.props.location)
  // const { pathname } = props.location
  // let path = pathname.split('/').filter(v => v !== '')
  // path.pop()
  // path = path.join('/')
  // const title = props.parent && props.parent.title !== undefined ? props.parent.title : 'Homepage'


    
    return (
      <Layout location={this.props.location} hasSearch className='full-width' hero={null} ga={site.gaConfig.id} map={null}>
        <Helmet title='4040 error page not found' description='404 error page not found'/>
        <Main className='full-width'>
          <Breadcrumb location={this.props.location} parent={{'title': 'Homepage'}} className='container'/>
          <div className='container'>
            <PageTitle text='404 error - this page is missing'/>
            <div className='panel panel--inverted panel--padding-small'>
              <Accent className='accent--loud accent--shallow accent--separated'>
                <p className='lead'>
                  Sorry, we couldn't find the page you were looking for
                </p>                  
              </Accent>
              <p className='lead'>
                The page you are looking for might have been moved, changed or isn’t available for a while.
              </p>
              <p>If you’d like to try again, why not:</p>
              <ul className='list bullet'>
                <li className='list__item'>Use a different search term</li>
                <li className='list__item'>Search for something else</li>
                <li className='list__item'>Go <Link to='/' className='link-text underlined'>back to your homepage</Link> and try again</li>
              </ul>
            </div>
          </div>
        </Main>
      </Layout>
    )
  }
}

export default ErrorPage

export const errorPageQuery = graphql`
  query ErrorPage {
    site {
      siteMetadata {
        title
        basePath
        gaConfig {
          id
        }
      }
    }
  }
`