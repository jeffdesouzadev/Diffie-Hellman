const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3001;

app.get('/', (req, res) => {
  res.status(200).send('Hello World')
})

app.get('/json', (req, res) => {
  res.status(200).send({'key': 'value'})
})

app.listen(PORT, ()=> {
  console.log(`listening on port ${PORT}`)
});