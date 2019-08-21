import React from 'react'
import { Link } from 'gatsby'

const ArticlePreview = ({ article }) => {
  return (
    <div>
      <h3>
        <Link to={`/${article.slug}`}>{article.title}</Link>
      </h3>
    </div>
  )
}

export default ArticlePreview