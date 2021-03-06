const Promise = require('bluebird')
const path = require('path')
// const fs = require('fs')

let urlMap = {}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const detailPage = path.resolve('./src/templates/detailPage.js')
    const secondaryPage = path.resolve('./src/templates/secondaryPage.js')
    const downloadPage = path.resolve('./src/templates/downloads.js')
    const searchPage = path.resolve('./src/templates/search.js')

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

        //////////////////////

        let arr = []
        let topLevel = posts.filter(post => post.node.parentPage === null).map(post => post.node.slug)
        let secondLevel = []
        let thirdLevel = []

        posts.forEach((post, index) => {
          if (post.node.parentPage === null ) {
            arr.push(post)
            return
          }

          if (post.node.parentPage !== null && post.node.parentPage.slug) {

            let fullSlug = `${post.node.parentPage.slug}/${post.node.slug}`
            if (topLevel.includes(post.node.parentPage.slug)) {
              secondLevel.push({
                id: post.node.id,
                slug: post.node.slug,
                parent: post.node.parentPage.slug,
                fullSlug: fullSlug,
                temp: fullSlug
              })
              return
            }

            thirdLevel.push({
              node: {
                id: post.node.id,
                slug: post.node.slug,
                parent: post.node.parentPage.slug,
                fullSlug: fullSlug
              }
            })
          }
        })

        let temp = thirdLevel.map((post, index) => {

          let g = secondLevel.filter(v => (post.node.parent === v.slug)).map(v => {
            let s = `${v.fullSlug}/${post.node.slug}`
            v.id = post.node.id
            v['temp'] = s
            let f = Object.assign({}, v)
            return f
          })

          return g[0]
        })

        let path = secondLevel
          .concat(temp)
          .map(v => {
            v['path'] = v.temp
            delete v.temp
            delete v.fullSlug

            return {
              node: v
            }
          })

        path = path.concat(arr)
        
        path.map(v => {
          return urlMap[v.node.id] = v.node.path || v.node.slug
        })

        //////////////////////

        path.forEach((post, index) => {
          let path = post.node.path || post.node.slug
          createPage({
            path: path,
            component: detailPage,
            context: {
              id: post.node.id,
              map: urlMap,
              slug: post.node.slug
            },
          })
        })

        secondaryPosts.forEach((post, index) => {
          let path = post.node.slug

          let template
          switch(post.node.slug) {
            case 'search':
              template = searchPage
              break
            case 'downloads':
              template = downloadPage
              break
            default:
              template = secondaryPage
            }

          urlMap[post.node.id] = path

          createPage({
            path: path,
            component: template,
            context: {
              id: post.node.id,
              map: urlMap,              
              slug: post.node.slug
            },
          })
        })

      })
    )
  })
}

exports.onCreatePage = ({ page, actions }) => {
  if (page.path === '/') {
    const { createPage, deletePage } = actions
    deletePage(page)
    createPage({
      ...page,
      context: {
        ...page.context,
        map: urlMap
      },
    })    
  }
}

