import React from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Layout from '../components/Layout/Layout.jsx'
import LinkList from '../components/LinkList/LinkList.jsx'
import LinkListSimple from '../components/LinkList/LinkListSimple.jsx'
import LinkItem from '../components/LinkItem/LinkItem.jsx'
import Main from '../components/Main/Main.jsx'
import Text from '../components/Text/Text.jsx'
import Breadcrumb from '../components/Breadcrumb/Breadcrumb.jsx'
import PageTitle from '../components/PageTitle/PageTitle.jsx'
import Collapsible from '../components/Collapsible/Collapsible.jsx'
import Download from '../components/Download/Download.jsx'
import { Event } from '../components/GoogleAnalytics/GoogleAnalytics'
import Heading from '../components/Heading/Heading.jsx'

class PageTemplate extends React.PureComponent {

  render() {
    const map = this.props.pageContext.map
    const site = get(this.props, 'data.site.siteMetadata')
    const post = get(this.props, 'data.contentfulPage')
    const parent = post.parentPage ? {'parentPage': true} : null
    let mediaLinks = post.collapsibleLinks ? post.collapsibleLinks
      .filter(v => v['mediaLink'] !== null || v.mediaFile !== undefined)
      .map(v => v['mediaLink'] || (v.mediaFile && v.mediaFile.file.url))
      .reduce((a,b) => a.concat(b), []): []
            
      mediaLinks = mediaLinks
        .concat(post.mediaLink || [])
        // .filter(item => mediaLinks.indexOf(item) < 0)
        .map(v => {
          v['mediaLink'] = v['mediaLink'] !== null ? v['mediaLink'] : (v.mediaFile && v.mediaFile.file) && 'https:' + v.mediaFile.file.url        
          return v
        })


    return (
      <Layout location={this.props.location} hasSearch className='full-width' hero={post.hero} ga={site.gaConfig.id} map={map} {...parent}>
        <Helmet>
          <title>{`${post.title} | ${site.title}`}</title>
          <link rel='canonical' href={`${site.basePath}${this.props.location.pathname}`} />
          <meta name='description' content={post.metaDescription} />    
        </Helmet>
        <Main className='full-width'>
          {this.props.location && <Breadcrumb location={this.props.location} parent={post.parentPage} className='container'/>}
          <div className='container'>
            <PageTitle text={post.title}/>
            <Text className='intro lead' content={post.intro.childMarkdownRemark.html} />
            {post.body && <Text className='body long-form' content={post.body.childMarkdownRemark.html} />}
          </div>
          {post.collapsibleLinks && <div className='body-content'>{post.collapsibleLinks.map((v, i) => <Collapsible links={map} key={i} history={this.props.location} {...v}/>)}</div>}
          {(mediaLinks.length > 0) && 
         
            <div className='container panel--padding-small'>
              <Heading text='Downloads in this page' className='h4 sp-top--single'/>
              <ol className='list list--separated list--separated-small'>{mediaLinks.map(v => <LinkItem event={Event} key={v.id} {...v} />)}</ol>
            </div>}
          <div className='container'>
            <Download flush/>
          </div>
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
        basePath
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

      body {
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

          mediaFile {
            file {
              fileName
              url
            }
          }           
        }
      }

      mediaLink {
        id
        type
        title
        mediaLink
        description

        mediaFile {
          file {
            fileName
            url
          }
        }         
      }

    }
  }
`
