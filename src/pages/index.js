import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
// import Hero from '../components/Hero/Hero.jsx'
import Layout from '../components/Layout/Layout.jsx'
import ListItem from '../components/ListItem/ListItem.jsx'
import Heading from '../components/Heading/Heading.jsx'
import Text from '../components/Text/Text.jsx'
import { Link } from 'gatsby'

import '../scss/index.scss'

class RootIndex extends React.PureComponent {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    let post = get(this, 'props.data.contentfulHomePage')

console.log(post)
    return (
      <Layout location={this.props.location} >
      
        <Helmet title={`${post.title} | ${siteTitle}`} description={post.metaDescription}/>

        <div className='wrapper'>
          <Heading text={post.title} type='h1'/>
          {post.intro && <Text content={post.intro.childMarkdownRemark.html} />}
          {post.childPages && <ul className='list list--raised'>
            {post.childPages.map(v => {
              
              return (
                <li key={v.slug} className='list__item'>
                  <ListItem {...v}/>
                </li>
              )
            })}
          </ul>}
          {post.childPagesSecondary && <ul className='list'>
            {post.childPagesSecondary.map(v => {
              
              return (
                <li key={v.slug} className='list__item'>
                  <Link to={`/${v.slug}`}>
                    <Heading text={v.title} className='list__title' type='h3'/>
                  </Link>
                </li>
              )
            })}
          </ul>}

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
  contentfulHomePage {
    title
    metaTitle
    metaDescription
    intro {
      childMarkdownRemark {
        html
      }
    }
    childPages {
      title
      slug
      metaDescription
    }
    childPagesSecondary {
      title
      slug
      metaDescription
    }
  }
}
`
