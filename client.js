const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3001;

const clientHello = function(keys) {
  const config = {
    method: "get",
    url: "http://localhost:3000/serverHello",
    headers: {},
    params: { keys },
  };


  return axios(config);
}

const sendGA = function(ga) {
  const config = {
    method: "get",
    url: "http://localhost:3000/receiveGA",
    headers: {},
    params: { ga },
  };


  return axios(config);
}



app.listen(PORT, ()=> {
  console.log(`listening on port ${PORT}`)
});

const run = async function() {

  const upperBound = 30
  const publicKeys = [
     3, 5, 7, 11
  ]

  //note: Since this is for demonstration purposes, I am
  //committing the private key instead of storing in my
  //environment.  Please understand that I would never
  //(ever) commit any ACTUAL credentials! Haha.

  //one other note: I understand that this private key is
  //also much too small to be actually used in any real
  //Diffie Hellman implementation.  Perhaps I'll upgrade
  //this project after this initial exploration of the
  //problem space.
  const privateKey = 13

  let ch = null;
  try {
    console.log("Offering the server the choice of public key:", publicKeys)
    ch = await clientHello(publicKeys)
  } catch(err) {
    console.error('error!', err)
  }
  const publicKey = ch.data.publicKey
  const gb = ch.data.gb


  console.log('server-chosen publicKey is: ', publicKey)
  console.log('publicKey ^ server-secret is', gb)

  const gab = Math.pow(gb, privateKey)
  console.log('publicKey ^ server ^ client is', gab)

  const mod = gab % upperBound
  console.log('...and the modulo is ', mod)

  const ga = Math.pow(publicKey, privateKey)
  try {
    const send = await sendGA(ga)
  } catch(err) {
    console.error('error!', err)
  }

}

run();