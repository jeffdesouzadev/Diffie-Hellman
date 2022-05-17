const NumberOfUnusualSize = require("./numbers_of_unusual_size.js");

let a = new NumberOfUnusualSize(1);
let b = new NumberOfUnusualSize(2);
test('adds 1 + 2 to equal 3', () => {
  expect((a.add(b)).toString()).toBe("3");
});