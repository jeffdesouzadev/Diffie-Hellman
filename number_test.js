const NumberOfUnusualSize = require("./numbers_of_unusual_size.js");

let n = new NumberOfUnusualSize(123456789);
// n.toString(4)
let m = new NumberOfUnusualSize(123456780);
let p = 5
let q = 123456789
// console.log(n.equals(m))
// console.log(n.equals(p))
 console.log(`${n} compared to ${m}`, n.equals(m))