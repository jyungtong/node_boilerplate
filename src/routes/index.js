import Router from 'koa-router'
import { getSecret } from '../controllers/secret.controller'
import logger from '../lib/winston-logger'

const graphqlRoute = require('./graphql.route')

export const controllerHandler = (promise, params) => async ctx => {
  const boundParams = params ? params(ctx.request.query, ctx.request.body) : []
  try {
    const result = promise && await promise(...boundParams)
    ctx.body = { ok: true, ...result && { data: result } }
  } catch (err) {
    errorHandler(err, ctx)
  }
}
const c = controllerHandler

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

export default router
