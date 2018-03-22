const { retrieveSecretFromDb } = require('../services/secretService')

module.exports = async function getSecret () {
  const secret = await retrieveSecretFromDb()
  return { secret }
}
