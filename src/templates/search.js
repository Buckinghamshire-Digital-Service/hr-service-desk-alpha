import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Icon from '../components/Icon/Icon.jsx'
import Layout from '../components/Layout/Layout.jsx'
import Main from '../components/Main/Main.jsx'
import Text from '../components/Text/Text.jsx'
import Breadcrumb from '../components/Breadcrumb/Breadcrumb.jsx'
import PageTitle from '../components/PageTitle/PageTitle.jsx'
import Search from '../components/Search/Search.jsx'
import Button from '../components/Button/Button.jsx'

class SearchPage extends React.PureComponent {

  handleSearchSubmit (e) {

    const searchTerm = encodeURIComponent(
      term
        .toLowerCase()
        .trim()
    )
    if (searchTerm !== '') {
      navigate('/search')
    }
  }

  render() {
    let icon = {
      label: 'search',
      url: '../../../svg/magnifying.svg'
    }    
    const site = get(this.props, 'data.site.siteMetadata')
    const page = get(this.props, 'data.contentfulSecondaryPage')
    const search = get(this.props, 'data.siteSearchIndex.index')
    const urlmap = this.props.pageContext.map

    return (
      <Layout location={this.props.location} hasSearch className='muted full-width' hero={page.hero} ga={site.gaConfig.id} map={urlmap}>
        <Helmet title={page.metaTitle} description={page.metaDescription}/>
        <Main className='full-width'>
          {this.props.location && <Breadcrumb location={this.props.location} parent={page.parent} className='container'/>}
          <div className='container'>
            <PageTitle text={page.title}/>
            <Text className='intro lead' content={page.intro.childMarkdownRemark.html} />
            <form autoComplete='off' action='/search' className='form--search container container--constrained is-grouped' role='search' onSubmit={(event) => this.handleSearchSubmit(event)}>
              <div className='field'>
                <div className='field has-addons is-marginless'>
                  <Search searchIndex={search} map={urlmap} id='home-hero-search' />
                  <Button className='btn--flat offset-right' clickHandler={(event) => this.handleSearchSubmit(event)}><Icon {...icon}/></Button>
                </div>
              </div>
            </form>
            {this.props.location.state.query}
          </div>
          
        </Main>
      </Layout>
    )
  }
}


export default SearchPage

export const searchPageQuery = graphql`
  query SearchPage($slug: String!) {
    site {
      siteMetadata {
        title
        basePath
        gaConfig {
          id
        }
      }
    }
    siteSearchIndex {
      index
    }    
    contentfulSecondaryPage(slug: {eq: $slug}) {
      title
      metaTitle
      metaDescription
      intro {
        childMarkdownRemark {
          html
        }
      }

      hero {
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
    }    
  }
`
