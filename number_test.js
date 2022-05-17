const NumberOfUnusualSize = require("./numbers_of_unusual_size.js");

let n = new NumberOfUnusualSize(123456789);
// n.toString(4)
let m = new NumberOfUnusualSize(123456780);
let p = 5
let s = new NumberOfUnusualSize(99999)

let t = new NumberOfUnusualSize(12)

let q = 123456789
let x = t.add(s);
// console.log(`${s} added to ${t}`, `${x}`)
// console.log(s.add(t))
let y = s.multiply(t)
// console.log('multiply object', y)

let z = t.pow(6)
console.log('pow object', z)

// console.log(z.getValue())

// s.decrement()
// console.log(s)