# Buckinghamshire Council - HR Service Desk alpha

## Dependencies

- nodejs version `12.13.0`

## Development mode

This uses hot reloading to improve developer experience, but the site is run purely on the client side when it is built. 

`npm run dev`

## Building

To build files to `./public`:

`npm run build`

### Environment Vars

The `BUILD_CONFIG=staging|production|development` (defaults to `development`) environment variable should be used to define to the application the environment it is running in. This is separate to `NODE_ENV` since many libraries (React included) rely on the de-facto standard values of `production|development` to optimise their running.

Setting `BUILD_CONFIG` sets `NODE_ENV` automatically accordingly in webpack.js.

### Live configuration

No passwords / keys etc. are kept in the repo. Configuration is via AWS secrets and through env variables in Buddy.


## Development

We use a feature branch branching strategy - Gitflow:

- When a new feature is to be added, a developer should branch from `develop` naming the new branch `feature/[userstory-id]-[short description of new feature for humans]`
- When the work is ready (tested, linted etc.), a pull request should be opened against the `develop` branch.
- A peer review should be made against the pull request and the branch subsequently merged.
- The CI server will build from the develop branch and deploy to the staging server.

### Contentful CLI

Migration and API query tools available using [contentful-cli](https://github.com/contentful/contentful-cli).


| `contentful <script>` | Description                                                                      |
| --------------- | -------------------------------------------------------------------------------- |
| `login / logout`           | Start/end a CLI tool session |
| `content-type list --space-id xxx` | List all content types |
| `content-type get --space-id xxx --id [content type id]`| Get a list of content type fields |


## CI

BuddyCI is used for the CI server.

- The `Build` CI task validates all branches
- The `Build & Deploy to Staging` task runs whenever an update to `develop` is made. This task will update the staging environment.
- The `Build & Deploy` task runs whenever an update to `master` is made. This task will update the production environment.

## Manual deployment

You will first need access to the cxpartners AWS account to run deployment via an IAM user with permission to create and read content on S3 buckets and invalidate Cloudfront instances.

Deployment uses [gatsby-plugin-s3](https://gatsby-plugin-s3.jari.io/).

The S3 bucket is defined in `gatsby-config.js` and you will need to manually change the bucket name for each environment:

```
  
  options: {
    bucketName: 'bucks-hr-desk-staging', // or 'bucks-hr-desk' for production
    region: 'eu-west-2'
  }

```

`npm run deploy` builds the latest pages, deploys to the S3 bucket.
`npm run deploy-staging` builds the latest pages, deploys to the S3 bucket and invalidates the cache.
`npm run deploy-live` builds the latest pages, deploys to the S3 bucket and invalidates the cache.

Invalidation can take several minutes.



### SSH / Keys

To give BuddyCI access to the integration server, it has its own AWS IAM user set up.
