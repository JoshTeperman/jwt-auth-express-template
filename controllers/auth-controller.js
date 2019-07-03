const User = require('../models/User')
const { generateToken, generateUser } = require('../utils/auth-utils')

const login = (req, res) => {
  res.send('login post endpoint')
}

const register = async (req, res) => {
  const { username, password, role } = req.body
  if (username && password) {
    try {
      const query = await User.findOne({ username: username })
      if (query) {
        return res.status(403).send('user already exists')
      } else if (query === null) {
        console.log('else if');
        const newUser = await generateUser(username, password, role)
        console.log(newUser);
        const token = await generateToken(newUser)
        console.log(token);
        return res.send({ token }) // why an object?
      }
    } catch(err) {
      console.log(err.stack)
      return res.status(404).send('An error occurred')
    }
  } else {
    return res.status(403).send('Incorrect credentials')
  }
}

module.exports = {
  login,
  register
}