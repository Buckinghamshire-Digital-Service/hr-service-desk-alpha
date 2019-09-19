import React from 'react'
import { graphql, Link } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/Layout/Layout.jsx'
import ListItem from '../components/ListItem/ListItem.jsx'
import Heading from '../components/Heading/Heading.jsx'
import Text from '../components/Text/Text.jsx'
import LinkList from '../components/LinkList/LinkList.jsx'
import LinkListSimple from '../components/LinkList/LinkListSimple.jsx'
import Main from '../components/Main/Main.jsx'
import Icon from '../components/Icon/Icon.jsx'
import PageTitle from '../components/PageTitle/PageTitle.jsx'
import Download from '../components/Download/Download.jsx'

import '../scss/index.scss'

class RootIndex extends React.PureComponent {
  render() {
    const site = get(this, 'props.data.site.siteMetadata')
    let post = get(this, 'props.data.contentfulHomePage')

    return (
      <Layout location={this.props.location} className='muted full-width' hero={post.hero} ga={site.gaConfig.id}>
        <Helmet title={`${post.title} | ${site.title}`} description={post.metaDescription}/>
        <Main  className='full-width'>
          <div className='container'>
            <PageTitle text={post.title} className='no-breadcrumb'/>
            <Text className='intro lead' content={post.intro.childMarkdownRemark.html} />
            {post.childPages && <LinkList isDouble items={post.childPages} className='raised columns'/>}
          </div>

          <div className='container'>
            <Download flush/>
          </div>
          {post.childPagesSecondary && <div className='panel panel--flat panel--flush'><div className='container panel--padding-small'><Heading className='h3' text='Other areas' /><LinkListSimple type='h3' items={post.childPagesSecondary} simple className='simple simple--flat'/></div></div>}
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
      gaConfig {
        id
      }
    }
  }
  contentfulHomePage {
    id
    title
    metaTitle
    metaDescription
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
    childPages {
      id
      title
      slug
      summary {
        childMarkdownRemark {
          html
        }
      }
      metaDescription
    }
    childPagesSecondary {
      id
      title
      slug
      metaDescription
    }
  }
}

`
