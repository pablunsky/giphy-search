const express = require('express')
const axios = require('axios').default
var cors = require('cors')
const app = express()
const port = 5000
require('dotenv').config()

const API_KEY = process.env.API_KEY
const API_URL = process.env.API_URL

let history = []

app.use(cors({
    origin: "*"
}))

app.get('/', (req, res) => {
    const url = new URL(API_URL)
    
    url.searchParams.append("api_key", API_KEY)
    url.searchParams.append("q", req.query.query)
    url.searchParams.append("limit", req.query.limit)
    url.searchParams.append("offset", req.query.offset)

    axios.get(url.toString())
        .then(response => {
            history.push(req.query.query)
            res.json(response.data)
        })
        .catch(error => res.status(500).json({message: `${error}`}))
})

app.get('/history', (req, res) => {
    res.json(history)
})

app.delete('/history', (req, res) => {
    history = []
    res.json({message: 'Success'})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})