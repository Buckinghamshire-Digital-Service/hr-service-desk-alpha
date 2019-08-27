import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Hero from '../components/Hero/Hero.jsx'
import Layout from '../components/Layout/Layout.jsx'
import ArticlePreview from '../components/ArticlePreview/ArticlePreview.jsx'
import '../scss/index.scss'

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    let posts = get(this, 'props.data.allContentfulPage.edges')
    posts = posts.filter(v => v.node.childPages !== null)

    return (
      <Layout location={this.props.location} >
        <div>
          <Helmet title={siteTitle} />
          {/*<Hero data={author.node} />*/}
          <div className='wrapper'>
            <h2 className='section-headline'>Recent articles</h2>
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
        </div>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
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
