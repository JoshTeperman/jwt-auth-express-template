const User = require('../models/User')
const { generateToken, generateUser } = require('../utils/auth-utils')

const login = (req, res) => {
  res.send('login post endpoint')
}

const register = async (req, res) => {
  const { username, password, role } = req.body

  if (username && password) {
    const queryUser = await User.findOne({
      username: username
    })
    if (queryUser) {
      return res.status(403).send('user already exists')
    } else if (queryUser === null) {
      const newUser = await generateUser(username, password, role)
      const token = generateToken(newUser)
      // generate access token using jwt and the new User
      // return the token
    }
  }
}

module.exports = {
  login,
  register
}