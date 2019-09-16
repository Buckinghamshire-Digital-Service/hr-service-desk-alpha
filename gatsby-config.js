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
    gaConfig: {
      id: 'UA-129132977-3'
    }
  }, 
  pathPrefix: '/',
  plugins: [
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
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
        fields: ['id', 'title', 'metaDescription'],
        resolvers: {
          // allContentfulPage: {
          //   title: node => {console.log(node); return node.title}
          // }
          MarkdownRemark: {
            title: node => {console.log(node); return node.title}      
          },
        },
      },
    },    
    {
      resolve: "gatsby-plugin-stylelint",
      options: { files: ["**/*.{js,jsx, scss}"] }
    }
  ],
}
