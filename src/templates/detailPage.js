import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Layout from '../components/Layout/Layout.jsx'
import Text from '../components/Text/Text.jsx'
import marked from 'marked'

import renderer from '../renderer.js'

class PageTemplate extends React.PureComponent {

  render() {
    const post = get(this.props, 'data.contentfulPage')
    return (
      <Layout location={this.props.location} >
        <Helmet title={post.metaTitle} description={post.metaDescription}/>
        <div className='wrapper'>
          <h1 className='section-headline'>{post.title}</h1>
          <Text content={post.intro.childMarkdownRemark.html} />
          {post.bodyContent && renderer(post.bodyContent.json)}
        </div>
      </Layout>
    )
  }
}

export default PageTemplate

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {

    contentfulPage(slug: { eq: $slug }) {
      title
      metaTitle
      metaDescription

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

      intro {
        childMarkdownRemark {
          html
        }
      }

      bodyContent {
        json
      }


    }
  }
`
