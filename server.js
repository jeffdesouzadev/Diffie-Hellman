const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;
const upperBound = 30
let publicKey = undefined

//note: Since this is for demonstration purposes, I am
//committing the private key instead of storing in my
//environment.  Please understand that I would never
//(ever) commit any ACTUAL credentials!

//one other note: I understand that this private key is
//also much too small to be actually used in any real
//Diffie Hellman implementation.  Perhaps I'll upgrade
//this project after this initial exploration of the
//problem space.
const privateKey = 11

const serverHello = function() {
  var config = {
    method: "get",
    url: "http://localhost:3001/json",
    headers: {},
  };
  return axios(config);
}



app.get('/receiveGA', (req, res) => {
  const ga = req.query.ga
  console.log('publicKey ^ client-secret is', ga)
  const mod = Math.pow(ga, privateKey) % upperBound
  console.log('publicKey ^ client ^ server is', Math.pow(ga, privateKey))
  console.log('...and the modulo is', mod)

  res.status(200).send({publicKey})
})

app.get('/serverHello', (req, res) => {
  const keys = req.query.keys
  const keyIndex = Math.floor(Math.random()*keys.length)
  publicKey = keys[keyIndex]
  res.status(200).send({'publicKey': publicKey, 'gb': Math.pow(publicKey, privateKey)})
})

app.listen(PORT, ()=> {
  console.log(`listening on port ${PORT}`)
});

