import { APIError } from '../lib/APIError'

export function retrieveSecretFromDb () {
  return new Promise((resolve, reject) => {
    throw new APIError('invalid', 400)
    // return reject(new APIError('invalid', 400))
    // return setTimeout(() => resolve('secrettttt'), 300)
  })
}
