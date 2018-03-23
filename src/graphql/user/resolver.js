const { pipe } = require('ramda')
const { users, createUser, friends } = require('./logic')
const { isAuthenticated } = require('../../lib/graphql-helpers')

function secretFunc () {
  return 'something secret'
}

exports.resolver = {
  Query: {
    users,

    secret: pipe(isAuthenticated, secretFunc)
  },

  Mutation: {
    createUser
  },

  User: {
    friends
  }
}
