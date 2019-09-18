import React from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Layout from '../components/Layout/Layout.jsx'
import Main from '../components/Main/Main.jsx'
import Text from '../components/Text/Text.jsx'
import Breadcrumb from '../components/Breadcrumb/Breadcrumb.jsx'
import PageTitle from '../components/PageTitle/PageTitle.jsx'
import DownloadBlock from '../components/DownloadBlock/DownloadBlock.jsx'
import _ from 'lodash'

class Downloads extends React.PureComponent {
  render() {
    const site = get(this.props, 'data.site.siteMetadata')
    const post = get(this.props, 'data.allContentfulMedia')
    const page = get(this.props, 'data.contentfulSecondaryPage')
    
    let result = _(post.edges)
      .groupBy(x => x.node.contentfulparent.slug)
      .map((value, key) => ({
        parent: key, 
        downloads: value
      }))
      .value()

    return (
      <Layout location={this.props.location} hasSearch className='muted full-width' hero={page.hero} ga={site.gaConfig.id}>
        <Helmet title={page.metaTitle} description={page.metaDescription}/>
        <Main className='full-width'>
          {this.props.location && <Breadcrumb location={this.props.location} parent={page.parent} className='container'/>}
          <div className='container'>
            <PageTitle text={page.title}/>
            <Text className='intro lead' content={page.intro.childMarkdownRemark.html} />
          </div>
          <div className='container container--constrained'>
            {result && result.map((v, i) => <DownloadBlock key={i} {...v}/>)}
          </div>
        </Main>
      </Layout>
    )
  }
}


export default Downloads

export const donwloadPageQuery = graphql`
  query DownloadPage($slug: String!) {
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
    allContentfulMedia {
      edges {
        node {
          type
          title
          id
          description
          isLocked
          mediaLink
          contentfulparent {
            id
            title
            slug
          }
        }
      }
    }
  }
`