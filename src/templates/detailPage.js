import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Layout from '../components/Layout/Layout.jsx'

class PageTemplate extends React.PureComponent {
  render() {
    const post = get(this.props, 'data.contentfulPage')

    return (
      <Layout location={this.props.location} >
        <Helmet title={`${post.metaTitle}`} />
        <pre>{JSON.stringify(post, null, 2)}</pre>
        <div className="wrapper">
          <h1 className="section-headline">{post.title}</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: post.intro.childMarkdownRemark.html,
            }}
          />
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
