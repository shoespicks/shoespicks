const contentful = require('contentful')

export const contentfulClient = contentful.createClient({
  space: 'ah6alnkqn7mz',
  accessToken: 'gt1GlG3SEfp8QB04J-re-pfjzGhnOk8-NYVqZANCtRQ'
});

// export `createClient` to use it in page components
module.exports = {
  createClient() {
    return contentful.createClient(contentfulClient)
  }
}