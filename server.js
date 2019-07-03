const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000;
app.use(cors())
app.use(require('./routes'))


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, (err) => {
  if(err) {
    console.log('🙈 could not connect to database')
  } else {
    console.log('🔥  connect to mongoDB 🔥')
  }
})

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))
