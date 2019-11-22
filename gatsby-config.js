require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  host: process.env.CONTENTFUL_HOST,
  downloadLocal: true
}

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the access token need to be provided.'
  )
}

module.exports = {
  siteMetadata: {
    title: 'Buckinghamshire HR service desk',
    basePath: 'https://bucks-temp-name.com',
    gaConfig: {
      id: 'UA-129132977-3'
    }
  }, 
  pathPrefix: '/',
  plugins: [
    'gatsby-transformer-remark',
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: true
        }
      }
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        fields: ['title','metaDescription', 'intro', 'content'],
        resolvers: {
          ContentfulPage: {
            title: node => node.title,
            metaDescription: node => node.metaDescription,
            intro: (node, getNode) => getNode(node.intro___NODE).intro,            
            content: (node, getNode) => node.collapsibleLinks___NODE && node.collapsibleLinks___NODE.map((v) => {
              let collapse = getNode(v)
              return getNode(collapse.content___NODE).content
            })
          },
          ContentfulSecondaryPage: {
            title: node => node.title,
            metaDescription: node => node.metaDescription, 
            intro: (node, getNode) => getNode(node.intro___NODE).intro,
            content: node => node.title
          }
        },
      },
    },    
    {
      resolve: "gatsby-plugin-stylelint",
      options: { files: ["**/*.{js,jsx, scss}"] }
    }
  ],
}
