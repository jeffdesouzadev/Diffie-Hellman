const NumberOfUnusualSize = require("./numbers_of_unusual_size.js");

let n = new NumberOfUnusualSize(123456789);
// n.toString(4)
let m = new NumberOfUnusualSize(123456780);
let p = 5
let s = new NumberOfUnusualSize(111)

let t = new NumberOfUnusualSize(19)

let q = 123456789
let x = t.add(s);
console.log(`${s} added to ${t}`, `${x}`)

let y = t.multiply(s)
console.log('multiply object', y)