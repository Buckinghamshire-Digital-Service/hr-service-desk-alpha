import React from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Layout from '../components/Layout/Layout.jsx'
import Main from '../components/Main/Main.jsx'
import Text from '../components/Text/Text.jsx'
import Breadcrumb from '../components/Breadcrumb/Breadcrumb.jsx'
import PageTitle from '../components/PageTitle/PageTitle.jsx'
import marked from 'marked'

// import renderer from '../renderer.js'

class SecondaryPageTemplate extends React.PureComponent {
  render() {
    const post = get(this.props, 'data.contentfulSecondaryPage')
    return (
      <Layout location={this.props.location} hasSearch className='full-width' hero={post.hero}>
        <Helmet title={post.metaTitle} description={post.metaDescription}/>
        {this.props.location && <Breadcrumb location={this.props.location} parent={post.parentPage} className='container'/>}
        <Main className='full-width'>
          <div className='container'>
            <PageTitle text={post.title}/>
            <Text className='intro lead' content={post.intro.childMarkdownRemark.html} />
          </div>
          <div className='panel panel--flat panel--padding-small panel--has-heading container'><Link to='/downloads' className='download'><span>Downloads</span></Link></div>
        </Main>
      </Layout>
    )
  }
}

export default SecondaryPageTemplate

export const secondaryPageQuery = graphql`
  query SecondaryPageBySlug($slug: String!) {
    contentfulSecondaryPage(slug: {eq: $slug}) {
      title
      metaTitle
      metaDescription
      intro {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
