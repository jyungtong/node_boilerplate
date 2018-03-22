const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const config = require('../config')
const router = require('../routes')
const logger = require('../lib/winston-logger')

const app = new Koa()
const { port, isTest } = config

app.proxy = !isTest
app
  .use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    logger.info(`${ctx.ip} - ${ctx.method} ${ctx.url} ${ctx.status} - ${ms} ms`)
  })
  .use(bodyParser())
  .use(router.routes())
  .listen(port)

module.exports = app
