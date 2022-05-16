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



app.get('/', (req, res) => {
  res.status(200).send('Hello World')
})

app.get('/json', (req, res) => {
  res.status(200).send({'key': 'value'})
})

app.listen(PORT, ()=> {
  console.log(`listening on port ${PORT}`)
});

const run = async function() {
  const publicKeys = [
    89,
    59,
    61,
    53,
    79,
    97,
    83,
    73,
    67,
    71
  ]
  let ch = null;
  try {
    ch = await clientHello(publicKeys)
  } catch(err) {
    console.error('error!', err)
  }
  const publicKey = ch.data.key
  //const publicKey = 71

  //note: Since this is for demonstration purposes, I am
  //committing the private key instead of storing in my
  //environment.  Please understand that I would never
  //(ever) commit any ACTUAL credentials! Haha.

  //one other note: I understand that this private key is
  //also much too small to be actually used in any real
  //Diffie Hellman implementation.  Perhaps I'll upgrade
  //this project after this initial exploration of the
  //problem space.
  const privateKey = 5210189

  console.log('server-chosen publicKey is: ', publicKey)
}

run();