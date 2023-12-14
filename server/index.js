const express = require('express')
const path = require('path')
const app = express();
const PORT = 3000
const clientPath = path.resolve(__dirname, '../client/dist')
// const cors = require('cors')
const db = require('./db')
app.use(express.json());
app.use(express.static(clientPath))
// app.use(cors)
app.get('/api/links', db.getLinks)


//Render Website
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'))
})

//update Links
app.put('/api/links/:id', db.updateLinks)

//Create Links
app.post('/api/links', db.createLinks)

//Delete Links
app.delete('/api/links/:id', db.deleteLinks)

//Start Server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})