import React from 'react'
import { Index } from 'elasticlunr'
import { Link } from 'gatsby'

export default class Search extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      results: [],
    }
  }

  render() {
    return (
      <React.Fragment>
        <input className='input is-large' type='text' placeholder='What do you want to ask?' value={this.state.query} onChange={this.search.bind(this)}/>
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

  search(evt) {
    const query = evt.target.value

    if (query.length < 3) {
      this.setState({
        query
      })

      return
    }

    this.index = this.getOrCreateIndex()

    this.setState({
      query,
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
