import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/Layout/Layout.jsx'
import ListItem from '../components/ListItem/ListItem.jsx'

class PageIndex extends React.Component {
  render() {
    let posts = get(this, 'props.data.allContentfulPage.edges')
    posts = posts.filter(v => v.node.childPages !== null)

    return (
      <Layout location={this.props.location} >
        <Helmet title={'hshdkjfhsjkhdfkhsjkdhf'} />
          
        <pre>{JSON.stringify(posts, null, 2)}</pre>

        <div className='wrapper'>
          <ul className='article-list'>
            {posts && posts.map(({ node }) => {
              return (
                <li key={node.slug}>
                  <ListItem article={node} />
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
query ParentPageQuery {
  allContentfulPage {
    edges {
      node {
        intro {
          childMarkdownRemark {
            html
          }
        }
        slug
        title
        metaTitle
        metaDescription
      }
    }
  }
}

`
