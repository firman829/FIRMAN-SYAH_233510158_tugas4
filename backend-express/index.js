// index.js
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./db')

const app = express()
app.use(cors())
app.use(bodyParser.json())

// GET semua posts
app.get('/posts', (req, res) => {
  db.query('SELECT * FROM posts', (err, results) => {
    if (err) return res.status(500).send(err)
    res.json(results)
  })
})

// POST tambah post
app.post('/posts', (req, res) => {
  const { title, body } = req.body
  db.query(
    'INSERT INTO posts (title, body) VALUES (?, ?)',
    [title, body],
    (err, result) => {
      if (err) return res.status(500).send(err)
      res.json({ id: result.insertId, title, body })
    }
  )
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`)
})
