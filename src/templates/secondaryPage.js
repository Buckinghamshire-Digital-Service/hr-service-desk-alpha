import React from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Layout from '../components/Layout/Layout.jsx'
import Main from '../components/Main/Main.jsx'
import Text from '../components/Text/Text.jsx'
import Breadcrumb from '../components/Breadcrumb/Breadcrumb.jsx'
import PageTitle from '../components/PageTitle/PageTitle.jsx'
import Download from '../components/Download/Download.jsx'

class SecondaryPageTemplate extends React.PureComponent {
  render() {
    const site = get(this.props, 'data.site.siteMetadata')
    const post = get(this.props, 'data.contentfulSecondaryPage')
    console.log(post.hero)
    return (
      <Layout location={this.props.location} hasSearch className='full-width' hero={post.hero} ga={site.gaConfig.id}>
        <Helmet title={post.metaTitle} description={post.metaDescription}/>
        <Main className='full-width'>
          {this.props.location && <Breadcrumb location={this.props.location} parent={post.parentPage} className='container'/>}
          <div className='container'>
            <PageTitle text={post.title}/>
            <Text className='intro lead' content={post.intro.childMarkdownRemark.html} />
          </div>
          <Download />
        </Main>
      </Layout>
    )
  }
}

export default SecondaryPageTemplate

export const secondaryPageQuery = graphql`
  query SecondaryPageBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        gaConfig {
          id
        }        
      }
    }     
    contentfulSecondaryPage(slug: {eq: $slug}) {
      title
      metaTitle
      metaDescription
      intro {
        childMarkdownRemark {
          html
        }
      }

      hero {
        headline
        subHeading
        image {
          title
          description
          file {
            details {
              size
              image {
                width
                height
              }
            }
            fileName
            contentType
            url
          }
        }
      }
    }
  }
`
