import express from 'express'
import { getSecret } from '../controllers/secret.controller'

const router = express.Router()

const controllerHandler = (promise, params) => async (req, res, next) => {
  const boundParams = params ? params(req, res, next) : []
  try {
    const result = await promise(...boundParams)
    return res.json(result || { ok: true })
  } catch (err) {
    return res.status(500) && next(err)
  }
}
const c = controllerHandler

router.use('/health-check', (req, res) => res.send('OK'))

router.get('/secret', c(getSecret, (req) => [req.query.user, req.query.test]))

export default router
