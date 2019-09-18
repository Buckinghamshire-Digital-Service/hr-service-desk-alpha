import React from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Layout from '../components/Layout/Layout.jsx'
import LinkList from '../components/LinkList/LinkList.jsx'
import Main from '../components/Main/Main.jsx'
import Text from '../components/Text/Text.jsx'
import Breadcrumb from '../components/Breadcrumb/Breadcrumb.jsx'
import PageTitle from '../components/PageTitle/PageTitle.jsx'
import Collapsible from '../components/Collapsible/Collapsible.jsx'
import Download from '../components/Download/Download.jsx'

class PageTemplate extends React.PureComponent {

  render() {
    const map = this.props.pageContext.map
    const site = get(this.props, 'data.site.siteMetadata')
    const post = get(this.props, 'data.contentfulPage')
    return (
      <Layout location={this.props.location} hasSearch className='full-width' hero={post.hero} ga={site.gaConfig.id}>
        <Helmet title={post.metaTitle} description={post.metaDescription}/>
        <Main className='full-width'>
          {this.props.location && <Breadcrumb location={this.props.location} parent={post.parentPage} className='container'/>}
          <div className='container'>
            <PageTitle text={post.title}/>
            <Text className='intro lead' content={post.intro.childMarkdownRemark.html} />
          </div>
          {post.collapsibleLinks && <div className='body-content'>{post.collapsibleLinks.map((v, i) => {
            return <Collapsible links={map} key={i} history={this.props.location} {...v}/>
          })}</div>}

          {post.related && <LinkList items={post.related} className='container raised' />}
          <Download />
        </Main>
      </Layout>
    )
  }
}

export default PageTemplate

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        gaConfig {
          id
        }        
      }
    }    
    contentfulPage(slug: {eq: $slug}) {
      title
      metaTitle
      metaDescription
      parentPage {
        slug
        title
      }
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

      collapsibleLinks {
        title
        ariaLabel
        content {
          childMarkdownRemark {
            html
          }
        }
        open
        link {
          id
          title
          slug
        }
        mediaLink {
          id
          type
          title
          mediaLink
          description
        }
      }

    }
  }
`
