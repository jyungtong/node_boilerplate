import { retrieveSecretFromDb } from '../services/secretService'

export async function getSecret () {
  const secret = await retrieveSecretFromDb()
  return { secret }
}
