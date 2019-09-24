import React from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'
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
    return (
      <Layout location={this.props.location} hasSearch className='full-width' hero={page.hero} ga={site.gaConfig.id} map={null}>
        <Helmet title={page.metaTitle} description={page.metaDescription}/>
        <Main className='full-width'>
          {this.props.location && <Breadcrumb location={this.props.location} parent={page.parent} className='container'/>}
          <div className='container'>
            <PageTitle text='404 error - this page is missing'/>
            <div className='panel panel--inverted panel--padding-small'>
              <Accent className='accent--loud accent--shallow'>
                <p className='lead'>
                  Sorry, the term "<strong>{this.state.searched}</strong>" returned no results : (
                </p>                  
              </Accent>
              <p className='lead'>
                The page you are looking for might have been moved, changed or isn’t available for a while.
              </p>
              <p>If you’d like to try again, why not:</p>
              <ul className='list bullet'>
                <li className='list__item'>Use a different search term</li>
                <li className='list__item'>Search for something else</li>
                <li className='list__item'>Go <Link to='/'>back to your homepage</Link> and try again</li>
              </ul>
            </div>
          </div>
        </Main>
      </Layout>
    )
  }
}

export default ErrorPage