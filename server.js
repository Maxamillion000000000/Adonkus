const path = require('path')
const express = require('express')
const app = express()
app.use(express.static('public'))
app.get('/', (req, res) => res.send(path.join(__dirname,"public")))
app.get('/user', (req, res) => res.send('Hello user!'))
app.listen(3000, () => console.log('Example app listening on port 3000!'))
var buddyboy = "buddyboy"