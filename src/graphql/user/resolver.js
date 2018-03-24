const { pipeP: pipe } = require('ramda')
const { users, createUser, friends } = require('./logic')
const { isAuthenticated, resolverHandler } = require('../../lib/graphql-helpers')

async function secretFunc (arg) {
  return `something secret ${arg}`
}

exports.resolver = {
  Query: {
    users,

    secret: pipe(
      isAuthenticated,
      resolverHandler(
        secretFunc,
        (parent, args, ctx) => [ctx.request.headers['authorization']]
      )
    )
  },

  Mutation: {
    createUser
  },

  User: {
    friends
  }
}
