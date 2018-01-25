// import { APIError } from '../lib/APIError'

export function retrieveSecretFromDb (t) {
  return new Promise((resolve, reject) => {
    // throw new APIError('invalid', 400)
    // return reject(new APIError('invalid', 400))
    return setTimeout(() => {
      if (t < 1) return resolve('never reach here')

      return resolve('secrettttt')
    }, 300)
  })
}
