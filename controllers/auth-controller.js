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
        const result = checkPassword(password, query.password)
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
  // return cookie
  // save cookie in local storage
}

module.exports = {
  login,
  register
}