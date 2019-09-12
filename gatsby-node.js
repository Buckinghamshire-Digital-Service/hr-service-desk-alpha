const Promise = require('bluebird')
const path = require('path')
// const fs = require('fs')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const detailPage = path.resolve('./src/templates/detailPage.js')
    const secondaryPage = path.resolve('./src/templates/secondaryPage.js')

    resolve(
      graphql(
        `
        query allQuery {
          allContentfulPage {
            edges {
              node {
                id
                slug
                title
                metaDescription
                parentPage {
                  slug
                }
              }
            }
          }
          allContentfulSecondaryPage {
            edges {
              node {
                id
                title
                slug
                metaDescription
              }
            }
          }
        }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulPage.edges
        const secondaryPosts = result.data.allContentfulSecondaryPage.edges

        posts.forEach((post, index) => {
          let path = post.node.parentPage !== null ? `/${post.node.parentPage.slug}/${post.node.slug}/` : `/${post.node.slug}/`

          createPage({
            path: path,
            component: detailPage,
            context: {
              slug: post.node.slug
            },
          })
        })

        secondaryPosts.forEach((post, index) => {
          let path = `/${post.node.slug}/`

          createPage({
            path: path,
            component: secondaryPage,
            context: {
              slug: post.node.slug
            },
          })
        })

      })
    )
  })
}
