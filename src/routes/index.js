const Router = require('koa-router')
const { getSecret } = require('../controllers/secret.controller')
const logger = require('../lib/winston-logger')
const graphqlRoute = require('./graphql.route')

const c = (promise, params) => async ctx => {
  const boundParams = params ? params(ctx.request.query, ctx.request.body) : []
  try {
    const result = promise && await promise(...boundParams)
    ctx.body = { ok: true, ...result && { data: result } }
  } catch (err) {
    errorHandler(err, ctx)
  }
}

const router = new Router()
router
  .use('/graphql', graphqlRoute.routes())
  .all('/error', c(() => { throw new Error('something wrong') }))
  .get('/health-check', c())
  .get('/secret', c(getSecret, (query, body) => [query, body]))

async function errorHandler (err, ctx) {
  ctx.status = err.status || 500
  ctx.body = err.message
  ctx.app.emit('error', err, ctx)

  logger.error('Koa Error', {
    request: {
      method: ctx.request.method,
      url: ctx.request.url,
      query: ctx.request.query,
      body: ctx.request.body
    },
    error: err.message
  })
}

module.exports = router
module.controllerHandler = c
