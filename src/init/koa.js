import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import config from '../config'
import router from '../routes'
import logger from '../lib/winston-logger'

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

export default app
