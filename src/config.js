const Joi = require('joi')
const debug = require('debug')('app:config')

const envSchema = Joi.object().keys({
  // General config
  NODE_ENV: Joi.string().default('development'),
  APP_NAME: Joi.string().default('app'),
  PORT: Joi.string().default('8080'),

  // MONGODB
  MONGO_URI: Joi.string().default('mongodb://localhost/app'),

  // AWS
  AWS_ACCESS_KEY_ID: Joi.string(),
  AWS_SECRET_ACCESS_KEY: Joi.string(),
  AWS_REGION: Joi.string().default('ap-southeast-1')
}).unknown()

const { error, value: env } = Joi.validate(process.env, envSchema)
if (error) throw error

const config = {
  nodeEnv: env.NODE_ENV,
  appName: env.APP_NAME,
  port: env.PORT,
  isTest: env.NODE_ENV === 'test',
  isDev: env.NODE_ENV === 'development',
  db: {
    mongodb: {
      uri: env.MONGO_URI
    }
  },
  aws: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    region: env.AWS_REGION
  }
}

debug(config)

module.exports = config
