const NumberOfUnusualSize = require("./numbers_of_unusual_size.js");

let zero = new NumberOfUnusualSize(0);
let one = new NumberOfUnusualSize(1);
let two = new NumberOfUnusualSize(2);
//small additions
test('adds 1 + 2 to be 3', () => {
  expect((one.add(two)).toString()).toBe("3");
});
test('adds 1 + 0 to be 0', () => {
  expect((one.add(zero)).toString()).toBe("1");
});
test('adds 2 + 0 to be 3', () => {
  expect((two.add(zero)).toString()).toBe("2");
});

//larger additions
let a = new NumberOfUnusualSize(123456789);
let b = new NumberOfUnusualSize(111111111);
let c = new NumberOfUnusualSize(999999999);
let d = new NumberOfUnusualSize(109173452);
test(`adds ${a} + ${b} to be ${(a.getValue()+b.getValue()).toString()}`, () => {
  expect((a.add(b)).toString()).toBe((a.getValue()+b.getValue()).toString());
});
test(`adds ${c} + ${d} to be ${(c.getValue()+d.getValue()).toString()}`, () => {
  expect((c.add(d)).toString()).toBe((c.getValue()+d.getValue()).toString());
});

//very very large additions
let e = new NumberOfUnusualSize("123456789123456789123456789123456789");
let f = new NumberOfUnusualSize("555555555555555555555555555555555555");
test(`adds ${e} + ${f} to be 679012344679012344679012344679012344`, () => {
  expect((e.add(f)).toString()).toBe("679012344679012344679012344679012344");
});