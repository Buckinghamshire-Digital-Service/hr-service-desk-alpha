import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

const ArticlePreview = ({ article }) => {
  return (
    <div>
      <Img alt='' fluid={article.heroImage.fluid} />
      <h3>
        <Link to={`/blog/${article.slug}`}>{article.title}</Link>
      </h3>
      <small>{article.publishDate}</small>
      <p
        dangerouslySetInnerHTML={{
          __html: article.description.childMarkdownRemark.html,
        }}
      />
      {article.tags && article.tags.map(tag => (
        <p key={tag}>
          {tag}
        </p>
      ))}
    </div>
  )
}

export default ArticlePreview