const NumberOfUnusualSize = require("./numbers_of_unusual_size.js");

let zero = new NumberOfUnusualSize(0);
let one = new NumberOfUnusualSize(1);
let two = new NumberOfUnusualSize(2);
let three = new NumberOfUnusualSize(3);
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
let g = new NumberOfUnusualSize("123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789");
let h = new NumberOfUnusualSize("555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555");
test(`adds ${e} + ${f} to be 679012344679012344679012344679012344`, () => {
  expect((e.add(f)).toString()).toBe("679012344679012344679012344679012344");
});
test(`adds ${g} + ${h} to be 679012344679012344679012344679012344679012344679012344679012344679012344679012344679012344679012344679012344`, () => {
  expect((g.add(h)).toString()).toBe("679012344679012344679012344679012344679012344679012344679012344679012344679012344679012344679012344679012344");
});

//small multiplications

test(`multiplies ${zero} x ${three} to be ${("0")}`, () => {
  expect((zero.multiply(three)).toString()).toBe( "0" );
});

test(`multiplies ${one} x ${three} to be ${("3")}`, () => {
  expect(one.multiply(three).toString()).toBe( "3" );
});
test(`multiplies ${two} x ${three} to be ${("6")}`, () => {
  expect( (two.multiply(three)).toString() ).toBe( "6" );
});
test(`multiplies ${three} x ${zero} to be ${("3")}`, () => {
  expect((three.multiply(zero)).toString()).toBe( "0" );
});