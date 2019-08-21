import React from 'react'
import { Link } from 'gatsby'

const Navigation = () => (
  <nav role='navigation'>
    <ul>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/blog/'>Blog</Link>
      </li>
    </ul>
  </nav>
)

export default Navigation