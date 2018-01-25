import test from 'ava'
import { retrieveSecretFromDb } from '../secretService'

test('get secret', async t => {
  const res = await retrieveSecretFromDb(3)
  t.is('secrettttt', res)
})

test('never get secret', async t => {
  const res = await retrieveSecretFromDb(0)
  t.is('never reach here', res)
})
