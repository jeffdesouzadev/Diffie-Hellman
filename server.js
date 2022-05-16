const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;
let publicKey = undefined

const serverHello = function() {
  var config = {
    method: "get",
    url: "http://localhost:3001/json",
    headers: {},
  };
  return axios(config);
}



app.get('/connection', (req, res) => {
  //confirm that public key is set
  res.status(200).send({publicKey})
})

app.get('/serverHello', (req, res) => {
  const keys = req.query.keys
  const keyIndex = Math.floor(Math.random()*keys.length)
  publicKey = keys[keyIndex]
  res.status(200).send({'key': publicKey})
})

app.listen(PORT, ()=> {
  console.log(`listening on port ${PORT}`)
});

