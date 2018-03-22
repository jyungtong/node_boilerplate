const Router = require('koa-router')
const graphqlHTTP = require('koa-graphql')
const glue = require('schemaglue')
const { makeExecutableSchema } = require('graphql-tools')

const { schema: typeDefs, resolver: resolvers } = glue('src/graphql')
const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const router = new Router()
router.all('/', graphqlHTTP({
  schema: executableSchema,
  graphiql: true
}))

module.exports = router
