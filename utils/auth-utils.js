const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateHash = (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds)
}

const generateToken = ({ username }) => {
  return jwt.sign({ username }, process.env.JWT_SECRET, {expiresIn: '7d'})
}

const generateUser = async (username, password, role) => {
  const hash = await generateHash(password)
  const newUser = new User({
      username: username,
      password: hash,
      role: role
  })
  return await newUser.save()
}

module.exports = {
  generateUser,
  generateToken
}