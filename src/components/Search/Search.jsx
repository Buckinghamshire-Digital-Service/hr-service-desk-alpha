import React from 'react'
import { Index } from 'elasticlunr'
import Button from '../Button/Button.jsx'

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
      <div>
        <input className='input is-large' type='text' placeholder='What do you want to ask?' value={this.state.query} onChange={this.search.bind(this)}/>
        <ul>
          {this.state.results.map(page => (
            <li key={page.id}>
              <Link to={'/' + page.path}>{page.title}</Link>
              {': ' + page.tags.join(`,`)}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  getOrCreateIndex() {
    return this.index
      ? this.index
      : Index.load(this.props.searchIndex)
  }

  search(evt) {
    const query = evt.target.value

    console.log(this.props.searchIndex)

    return

    if (query.length < 3) {
      this.setState({
        query
      })

      return
    }

    this.index = this.getOrCreateIndex()

    this.setState({
      query,
      // Query the index with search string to get an [] of IDs
      results: this.index
        .search(query, {})
        .map(({ ref }) => {
          console.log(ref)
          this.index.documentStore.getDoc(ref)
        }),
    })
  }
}
