import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import { Index } from 'elasticlunr'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Icon from '../components/Icon/Icon.jsx'
import Layout from '../components/Layout/Layout.jsx'
import Main from '../components/Main/Main.jsx'
import Text from '../components/Text/Text.jsx'  
import Heading from '../components/Heading/Heading.jsx'
import Breadcrumb from '../components/Breadcrumb/Breadcrumb.jsx'
import PageTitle from '../components/PageTitle/PageTitle.jsx'
// import Search from '../components/Search/Search.jsx'
// import Button from '../components/Button/Button.jsx'


class SearchPage extends React.PureComponent {
  constructor(props) {
    super(props)
    this.searchIndex = get(this.props, 'data.siteSearchIndex.index')
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    this.state = {
      query: (this.props.location.state && this.props.location.state.query) || '',
      results: [],
    }
  }

  componentDidMount() {
    if (this.state.query.length > 0 && this.state.query !== '') {
      this.searchSite(this.state.query)
    }
  }

  searchText(e) {
    const query = e.target.value

    this.setState({
      query: query
    })    
  }

  handleSearchSubmit() {
    this.searchSite(this.state.query)
  }

  getOrCreateIndex() {
    return this.index
      ? this.index
      : Index.load(this.searchIndex)
  }

  render() {
    let icon = {
      label: 'search',
      url: '../../../svg/magnifying.svg'
    }    
    const site = get(this.props, 'data.site.siteMetadata')
    const page = get(this.props, 'data.contentfulSecondaryPage')
    const urlmap = this.props.pageContext.map

    return (
      <Layout location={this.props.location} hasSearch className='full-width' hero={page.hero} ga={site.gaConfig.id} map={urlmap}>
        <Helmet title={page.metaTitle} description={page.metaDescription}/>
        <Main className='full-width'>
          {this.props.location && <Breadcrumb location={this.props.location} parent={page.parent} className='container'/>}
          <div className='container'>
            <PageTitle text={page.title}/>
              {(this.state.results && this.state.results.length) && <div className='panel panel--inverted panel--padding-small'><p className='lead'>{this.state.results.length} result{this.state.results.length > 1 ? 's' : ''} for "<strong>{this.state.query}</strong>"</p></div>}
            {/*<Text className='intro lead' content={page.intro.childMarkdownRemark.html} />*/}
            <form autoComplete='off' action='/search' className='form--search container container--constrained is-grouped' role='search' onSubmit={(event) => this.handleSearchSubmit(event)}>
              <div className='field'>
                <div className='field has-addons is-marginless'>
                  <label htmlFor={this.props.id} className='is-sr-only'>Search</label>
                  <input id={this.props.id} className='input is-large' type='text' placeholder='Search' value={this.state.query} onChange={this.searchText.bind(this)}/>
                  <button className='btn btn--flat offset-right' onClick={(e) => {e.preventDefault();this.handleSearchSubmit()}}><Icon {...icon}/></button>
                </div>
              </div>
            </form>
            {(this.state.results && this.state.results.length > 0) && <ul className='list list--separated'>
              {this.state.results.map(page => (
                <li className='list-item' key={page.id}>
                  <Link to={`/${urlmap[page.id]}`} className='list__link'>
                    <Heading type='h3' className='h3 ' text={page.title} />
                    <p className='list__content'>{page.metaDescription}</p>
                  </Link>
                </li>
              ))}
            </ul>}
          </div>
        </Main>
      </Layout>
    )
  }

  searchSite(query) {

    if (query.length < 3) {
      this.setState({
        query
      })

      return
    }

    this.index = this.getOrCreateIndex()

    this.setState({
      query: query,
      results: this.index
        .search(query, {
          fields: {
            title: {boost: 5, expand: true},
            metaDescription: {boost: 3, expand: true},
            intro: {boost: 2, expand: true},
            content: {boost: 1, expand: true}
          },
          bool: 'AND',
          expand: true
        })
        .map(({ ref }) => {
          return this.index.documentStore.getDoc(ref)
        })
    })
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
#      intro {
#        childMarkdownRemark {
#          html
#        }
#      }

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
