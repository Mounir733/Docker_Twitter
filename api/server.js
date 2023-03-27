const express = require('express')
const app = express()

app.get('/api', (req, res) => {
  res.send({ message: 'Hello from the API!' })
})

app.listen(3000, () => {
  console.log('API server is running on http://localhost:3000')
})