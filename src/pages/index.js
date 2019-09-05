import React from 'react'
import { graphql, Link } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Hero from '../components/Hero/Hero.jsx'
import Layout from '../components/Layout/Layout.jsx'
import ListItem from '../components/ListItem/ListItem.jsx'
import Heading from '../components/Heading/Heading.jsx'
import Text from '../components/Text/Text.jsx'
import LinkList from '../components/LinkList/LinkList.jsx'
import Main from '../components/Main/Main.jsx'
import Icon from '../components/Icon/Icon.jsx'
import PageTitle from '../components/PageTitle/PageTitle.jsx'

import '../scss/index.scss'

class RootIndex extends React.PureComponent {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    let post = get(this, 'props.data.contentfulHomePage')
    let icon = {
      label: 'Downloads',
      url: '../../../svg/download.svg'
    }

    return (
      <Layout location={this.props.location} >
        <Helmet title={`${post.title} | ${siteTitle}`} description={post.metaDescription}/>
        <Main className='muted'>
          {post.hero && <Hero {...post.hero}/>}
          <PageTitle text={post.title}/>
          {post.intro && <Text className='intro' content={post.intro.childMarkdownRemark.html} />}
          {post.childPages && <LinkList items={post.childPages} className='raised'/>}
          <div className='panel panel--flat panel--padding-small panel--has-heading'><Link to='/downloads'><Icon {...icon}/><span className='spaced-left'>Downloads</span></Link></div>
          {post.childPagesSecondary && <div className='panel panel--flat panel--padding-small'><Heading className='h3' text='Other areas' /><LinkList type='h3' items={post.childPagesSecondary} simple className='simple simple--flat'/></div>}
        </Main>
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
