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
import Form from '../components/Form/Form.jsx'
import Accent from '../components/Accent/Accent.jsx'
import { Event } from '../components/GoogleAnalytics/GoogleAnalytics'
import { isEmpty } from '../utilities'
import queryString from 'query-string'

class SearchPage extends React.PureComponent {
  constructor(props) {
    super(props)
    this.searchIndex = get(this.props, 'data.siteSearchIndex.index')
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    this.searchText = this.searchText.bind(this)

    const parsed = queryString.parse(this.props.location.search)

    this.state = {
      query: '',
      searched: ((!isEmpty(parsed.q) && parsed.q) || this.props.location.state && this.props.location.state.query) || '',
      results: [],
    }
  }

  componentDidMount() {
    if (this.state.searched.length > 0 && this.state.searched !== '') {
      this.searchSite(this.state.searched)
    }
  }

  searchText(e) {
    const query = e.target.value

    this.setState({
      query: query
    })    
  }

  handleSearchSubmit(e) {
    e.preventDefault()
    this.searchSite(this.state.query)

    this.setState({
      searched: this.state.query
    })

    if ('replaceState' in history) {
      let parsed = { q: this.state.query}
      let path = `${this.props.location.pathname}?${queryString.stringify(parsed)}`
      window.history.replaceState({}, document.title, path)
    }

    Event('Search term submit - search page', 'Submit', this.state.query)
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
        <Helmet title={`${page.metaTitle} | ${site.title}`} description={page.metaDescription}/>
        <Main className='full-width'>
          {this.props.location && <Breadcrumb location={this.props.location} parent={page.parent} className='container'/>}
          <div className='container'>
            <PageTitle text={page.title}/>
            <Form id='search-page-search' simple submitHandler={this.handleSearchSubmit} query={this.state.query} ariaHidden={null} icon={icon} onChangeHandler={this.searchText} reference={this.searchInput}/>            
            {(this.state.results && this.state.results.length === 0) && <div className='panel panel--inverted panel--padding-small is-last'>
              <Accent className='accent--loud accent--shallow accent--separated'>
                <p className='lead'>
                  Sorry, the term "<strong>{this.state.searched}</strong>" returned no results <span aria-hidden>: (</span>
                </p>                  
              </Accent>
              <h2 className='lead sp-top--double'>
                To help you find what you are looking for, why not:
              </h2>                 
              <ul className='list bullet lead'>
                <li className='list__item'>Check your spelling</li>
                <li className='list__item'>Use a different search term</li>
                <li className='list__item'>Keep your search term short and simple</li>
              </ul>
            </div>}


            {(this.state.results && this.state.results.length > 0) && 
              <>
              <div className='panel panel--inverted panel--padding-small'><p className='lead'>{this.state.results.length} search result{this.state.results.length > 1 ? 's' : ''} for "<strong>{this.state.searched}</strong>"</p></div>
              <ul className='list list--separated is-last'>
              {this.state.results.map(page => (
                <li className='list-item' key={page.id}>
                  <Link to={`/${urlmap[page.id]}`} className='list__link constrained'>
                    <Heading type='p' className='h3' text={page.title} />
                    <p className='list__content no-underline'>{page.metaDescription}</p>
                  </Link>
                </li>
              ))}
            </ul></>}
          </div>
        </Main>
      </Layout>
    )
  }

  searchSite(query) {
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
