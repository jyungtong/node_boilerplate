async function isAuthenticated (parent, args, ctx, info) {
  // TODO: implement auth logic here
  const authorization = ctx.request.headers['authorization']
  if (authorization) {
    const token = authorization.replace('Bearer ', '')
    console.log('token:', token)

    ctx.auth = {
      user_id: 123
    }
  } else {
    ctx.throw('Unauthorized', 401)
  }

  return [parent, args, ctx, info]
}

/*
 * This handler is used to handling middleware of resolvers.
 * It supports unary function of `Ramda.pipe` and
 * resolver arguments (parent, args, context, info)
 */
const resolverHandler = (promise, params) => (pipeRes, args, context, info) => {
  return (async (parent, args, context, info) => {
    const boundParams = params ? params(parent, args, context) : []
    try {
      const result = promise && await promise(...boundParams)
      return result
    } catch (err) {
      throw err
    }
  })(...pipeArgs(pipeRes, args, context, info))

  function pipeArgs (pipeRes, args, context, info) {
    return (
      Array.isArray(pipeRes) &&
      !args &&
      !context &&
      !info
    )
      ? pipeRes
      : [pipeRes, args, context, info]
  }
}

module.exports = {
  isAuthenticated,
  resolverHandler
}
