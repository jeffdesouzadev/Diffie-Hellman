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

  //should be prime, but given the constraints, I'm adding
  //more options.  Also, should be small, but not THIS small
  const publicKeys = [
     1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  ]

  //note: Since this is for demonstration purposes, I am
  //committing the private key instead of storing in my
  //environment.  Please understand that I would never
  //(ever) commit any ACTUAL credentials! Haha.

  //one other note: I understand that private keys need
  //to be much much larger (2-4k digits) in any real
  //Diffie Hellman implementation.  Perhaps I'll upgrade
  //this project after this initial exploration of the
  //problem space.
  const privateKey = 13
  console.log('0. <START> client private key is ', privateKey)

  let cHello = null;
  try {
    console.log("1. <SEND> Server may choose public key:", publicKeys)
    cHello = await clientHello(publicKeys)
  } catch(err) {
    console.error('error!', err)
  }
  const publicKey = cHello.data.publicKey
  const gb = cHello.data.gb
  console.log('5. <Received> Server-chosen publicKey is: ', publicKey)
  console.log('6. <Received> publicKey ^ server-secret is', gb)

  const gab = Math.pow(gb, privateKey)
  console.log('7. <MATH> publicKey ^ server ^ client is', gab)

  const mod = gab % upperBound
  console.log('8. <MATH> ...and the modulo is ', mod)

  //send public key ^ client secret, so the server may combine
  const ga = Math.pow(publicKey, privateKey)
  console.log('9. <SEND> publicKey ^ client-secret is', ga)
  try {
    const send = await sendGA(ga)
  } catch(err) {
    console.error('error!', err)
  }
  console.log('13. PROFIT: we can now encrypt using our shared key:', mod)
}
run();