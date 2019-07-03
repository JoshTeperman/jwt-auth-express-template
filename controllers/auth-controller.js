const User = require('../models/User')
const { generateToken, generateUser, checkPassword } = require('../utils/auth-utils')

const register = async (req, res) => {
  const { username, password, role } = req.body
  if (username && password) {
    try {
      const query = await User.findOne({ username: username })
      if (query) {
        return res.status(403).send('user already exists')
      } else if (query === null) {
        const newUser = await generateUser(username, password, role)
        const token = await generateToken(newUser)
        return res.send({ token }) // why an object?
      }
    } catch(err) {
      return res.status(404).send('An error occurred')
    }
  } else {
    return res.status(403).send('Incorrect credentials - username & password required')
  }
}

const login = async (req, res) => {
  const { username, password } = req.body
  if (username && password ) {
    try {
      const query = await User.findOne({username: username})
      if (query === null) {
        res.status(403).send(`User doesn't exist`)
      } else {
        const result = await checkPassword(password, query.password)
        if (result) {
          const token = await generateToken(query)
          return res.send({ token })
        } else {
          res.status(403).send('invalid credentials')
        }
      }
    } catch(err) {
      res.status(404).send('An error occured')
    }
  } else {
    res.status(403).send('Invalid credentials - username & password required')
  }
}

module.exports = {
  login,
  register
}