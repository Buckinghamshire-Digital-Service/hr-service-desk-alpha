import React from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Layout from '../components/Layout/Layout.jsx'
import LinkList from '../components/LinkList/LinkList.jsx'
import Main from '../components/Main/Main.jsx'
import Text from '../components/Text/Text.jsx'
//import Hero from '../components/Hero/Hero.jsx'
import Breadcrumb from '../components/Breadcrumb/Breadcrumb.jsx'
import PageTitle from '../components/PageTitle/PageTitle.jsx'
import Collapsible from '../components/Collapsible/Collapsible.jsx'
import marked from 'marked'

// import renderer from '../renderer.js'

class PageTemplate extends React.PureComponent {
  render() {
    const post = get(this.props, 'data.contentfulPage')
    return (
      <Layout location={this.props.location} >
        <Helmet title={post.metaTitle} description={post.metaDescription}/>
        {this.props.location && <Breadcrumb location={this.props.location} parent={post.parentPage}/>}
        <Main>
          {/*{post.hero && <Hero {...post.hero}/>}*/}
          <PageTitle text={post.title}/>
          <Text className='intro' content={post.intro.childMarkdownRemark.html} />

          {post.collapsibleLinks && post.collapsibleLinks.map((v, i) => {
            return <Collapsible key={i} history={this.props.location} {...v}/>
          })}
          {post.bodyContent && renderer(post.bodyContent.json, this.props.location)}

          {post.related && <LinkList items={post.related} className='raised' />}
        </Main>
      </Layout>
    )
  }
}

export default PageTemplate

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
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
          parentPage {
            slug
            title
            metaDescription
          }
        }
      }

#      references {
#        ... on ContentfulText {
#          content {
#            childMarkdownRemark {
#              html
#            }
#          }
#        }
#        ... on ContentfulList {
#          title
#          items
#          type
#          modifiers
#        }
#        ... on ContentfulCollapsible {
#          title
#          ariaLabel
#          content {
#            childMarkdownRemark {
#              html
#            }
#          }
#          open
#          link {
#            id
#            title
#            slug
#            parentPage {
#              slug
#              title
#              metaDescription
#            }
#          }
#        }
#        ... on ContentfulCallout {
#          title
#          text {
#            childMarkdownRemark {
#              html
#            }
#          }
#          modifiers
#        }
#      }




    }
  }
`
