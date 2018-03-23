function isAuthenticated (parent, args, ctx, info) {
  // TODO: implement auth logic here
  const authorization = ctx.request.headers['authorization']
  if (authorization) {
    const token = authorization.replace('Bearer ', '')
    console.log(token)

    ctx.auth = {
      user_id: 123
    }
  } else {
    ctx.throw('Unauthorized', 401)
  }

  return null
}

const resolverHandler = (promise, params) => async (parent, args, context, info) => {
  const boundParams = params ? params(parent, args, context) : []
  try {
    const result = promise && await promise(...boundParams)
    return result
  } catch (err) {
    throw err
  }
}

module.exports = {
  isAuthenticated,
  resolverHandler
}
