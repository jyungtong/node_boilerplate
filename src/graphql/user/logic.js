const userMock = [
  {
    id: 1,
    name: 'alice',
    friends: [2, 3]
  },
  {
    id: 2,
    name: 'bob',
    friends: [1, 3]
  },
  {
    id: 3,
    name: 'caca',
    friends: [1, 2]
  }
]

const users = (root, { name, id }, context) => {
  const results = id ? userMock.filter(u => u.id === id) : userMock

  if (results.length < 1) throw new Error(`ID ${id} not found`)

  return results
}

const createUser = (root, { name }) => {
  const newUser = {
    id: userMock.length + 1,
    name
  }

  userMock.push(newUser)

  return newUser
}

const friends = ({ friends }, { id }) => {
  return id ? userMock.filter(u => u.id === id) : userMock.filter(user => friends.includes(user.id))
}

module.exports = {
  users,
  createUser,
  friends
}
