import React from 'react'
import { Index } from 'elasticlunr'
import { Link } from 'gatsby'

export default class Search extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      query: this.props.query || '',
      results: [],
    }
  }

  componentDidMount() {
    if (this.props.query) {
      this.search(this.state.query)
    }
  }

  searchText(e) {
    const query = e.target.value

    this.setState({
      query: query
    })    
  }

  render() {

    return (
      <React.Fragment>
        <label htmlFor={this.props.id} className='is-sr-only'>Search</label>
        <input id={this.props.id} className='input is-large' type='text' placeholder='Search' value={this.state.query} onChange={this.searchText.bind(this)}/>
        <ul>
          {this.state.results.map(page => (
            <li key={page.id}>
              <Link to={`/${this.props.map[page.id]}`}>{page.title}</Link>
            </li>
          ))}
        </ul>
      </React.Fragment>
    )
  }

  getOrCreateIndex() {
    return this.index
      ? this.index
      : Index.load(this.props.searchIndex)
  }

  search(query) {

    // return
    // const query = evt.target.value

    // if (query.length < 3) {
    //   this.setState({
    //     query
    //   })

    //   return
    // }

    this.index = this.getOrCreateIndex()

    this.setState({
      query: query,
      results: this.index
        .search(query, {
          fields: {
            title: {boost: 5},
            metaDescription: {boost: 3},
            intro: {boost: 2},
            content: {boost: 1}
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
