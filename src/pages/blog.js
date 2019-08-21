import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/Layout/Layout.jsx'
import ArticlePreview from '../components/ArticlePreview/ArticlePreview.jsx'

class PageIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    let posts = get(this, 'props.data.allContentfulPage.edges')
    posts = posts.filter(v => v.node.childPages !== null)

    return (
      <Layout location={this.props.location} >
        <Helmet title={siteTitle} />
          
        <pre>{JSON.stringify(posts, null, 2)}</pre>

        <div className='wrapper'>
          <ul className='article-list'>
            {posts && posts.map(({ node }) => {
              return (
                <li key={node.slug}>
                  <ArticlePreview article={node} />
                </li>
              )
            })}
          </ul>
        </div>
      </Layout>
    )
  }
}

export default PageIndex

export const pageQuery = graphql`
  query BlogIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPage {
      edges {
        node {

          childPages {
            id
          }          

          title
          slug
          
        }
      }
    }
  }
`
