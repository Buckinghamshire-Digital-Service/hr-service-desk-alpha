const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const detailPage = path.resolve('./src/templates/detailPage.js')

    resolve(
      graphql(
        `
        query allQuery {
          allContentfulPage {
            edges {
              node {
                slug
                title
                metaDescription
                parentPage {
                  slug
                }
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
        posts.forEach((post, index) => {
          let path = post.node.parentPage !== null ? `/${post.node.parentPage.slug}/${post.node.slug}/` : `/${post.node.slug}/`
          // let path = `/${post.node.slug}/`

          createPage({
            path: path,
            component: detailPage,
            context: {
              slug: post.node.slug
            },
          })
        })
      })
    )
  })
}
