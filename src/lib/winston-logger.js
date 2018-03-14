import winston from 'winston'
import WinstonAwsCloudWatch from 'winston-aws-cloudwatch'
import config from '../config'

/*
 * Extract required config
 */
const {
  appName,
  nodeEnv,
  isTest,
  aws
} = config

const cloudWatchTransport = new (WinstonAwsCloudWatch)({
  createLogGroup: true,
  createLogStream: true,
  logGroupName: appName,
  logStreamName: nodeEnv,
  awsConfig: aws
})

const consoleTransport = new (winston.transports.Console)(
  {
    json: true,
    colorize: true
  }
)

const logger = new (winston.Logger)({
  transports: !isTest
    ? [consoleTransport, cloudWatchTransport]
    : [consoleTransport]
})

export default logger
