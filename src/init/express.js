import express from 'express'

// Helper
import config from '../config'

// Routes
import mainRoutes from '../routes'

const app = express()
const { port } = config

app.use(express.json())

app.use('/', mainRoutes)

app.use((err, req, res, next) => {
  console.error('~~~ Unexpected error exception start ~~~')
  console.error('params:', req.params)
  console.error('query:', req.query)
  console.error('body:', req.body)
  console.error(err)
  console.error('~~~ Unexpected error exception end ~~~')

  return res.status(err.status || 500).json({ error: err.message })
})

app.listen(port, () => {
  console.log(`app listened at port: ${port}`)
})

export default app
