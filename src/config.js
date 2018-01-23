import Joi from 'joi'

const debug = require('debug')('app:config')

const envSchema = Joi.object().keys({
  // General config
  APP_NAME: Joi.string().default('app'),
  PORT: Joi.string().default('8080'),

  // MONGODB
  MONGO_URI: Joi.string().default('mongodb://localhost'),
  MONGO_DBNAME: Joi.string().default(Joi.ref('APP_NAME'))

  // AMQP

  // CLOUDWATCH
}).unknown()

const { error, value: env } = Joi.validate(process.env, envSchema)
if (error) throw error

const config = {
  appName: env.APP_NAME,
  port: env.PORT,
  db: {
    mongodb: {
      uri: `${env.MONGO_URI}/${env.MONGO_DBNAME}`
    }
  }
}

debug(config)

export default config
