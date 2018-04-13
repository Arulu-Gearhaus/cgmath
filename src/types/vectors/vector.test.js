const expect = require('chai').expect
const Vector = require('./vector.js')

function expectEqual(suspect, expected, message) {
  expect(suspect).to.equal(expected, `${message}: Expected ${expected}, but got ${suspect}`)
}

it('Should create a vector with specific values', function() {
  let expected = [0,1,2,3]
  let vec = new Vector(...expected)
  expected.forEach((value, index) => {
    expect(vec[index]).to.equal(value)
  })
})

it('Shoudl have getters for (x,y,z,w)', function() {
  let expected = [0,1,2,3]
  let vec = new Vector(...expected)
  
  expectEqual(vec.x, expected[0], 'X Get')
  expectEqual(vec.y, expected[1], 'Y Get')
  expectEqual(vec.z, expected[2], 'Z Get')
  expectEqual(vec.w, expected[3], 'W Get')
})

it('Should have setters for (x,y,z,w)', function() {
  let vec = new Vector(4)
  vec.x = -1
  vec.y = -2
  vec.z = -3
  vec.w = -4
  expectEqual(vec.x, -1, 'X Set')
  expectEqual(vec.y, -2, 'Y Set')
  expectEqual(vec.z, -3, 'Z Set')
  expectEqual(vec.w, -4, 'W Set')
})

it('Should know its own dimension', function() {
  let vec = new Vector() 
  expect(vec.dimension).to.equal(0, 
    `Expected dimension to be 0, was ${vec.dimension}`)
  vec.push(1)
  expect(vec.dimension).to.equal(1,
    `Expected dimension to be 1, was ${vec.dimension}`)
  vec.push(2)
  expect(vec.dimension).to.equal(2,
    `Expected dimension to be 2, was ${vec.dimension}`)
  vec.push(3)
  expect(vec.dimension).to.equal(3,
    `Expected dimension to be 3, was ${vec.dimension}`)
  vec.push(4)
  expect(vec.dimension).to.equal(4,
    `Expected dimension to be 4, was ${vec.dimension}`)
})

/* Theorem 1.2 (Mathematics for 3d Game Programming & Computer Graphics 2nd Edition)
The following properties should hold true:
For vectors P, Q and scalar 'a'
a) ||P||>= 0
b) ||P||== 0 if and only if P = <0,0,...,0>
c) ||aP|| == |a|*||P||
d) ||P+Q|| <= ||P|| + ||Q||
*/

it('should be that the Magnitude of a vector should be greater than or equal to zero', function() {
  let P0 = new Vector(0,0,0)
  let P1 = new Vector(Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER)
  let P2 = new Vector(Number.MIN_SAFE_INTEGER,Number.MIN_SAFE_INTEGER,Number.MIN_SAFE_INTEGER)
  
  expect(P0.magnitude() >= 0).to.equal(true)
  expect(P1.magnitude() >= 0).to.equal(true)
  expect(P2.magnitude() >= 0).to.equal(true)
})

it('Only a `zero` vector (all values are zero) should have a magnitude of zero ', function() {
  let P0 = new Vector(0,0,0)
  let P1 = new Vector(Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER)
  let P2 = new Vector(Number.MIN_SAFE_INTEGER,Number.MIN_SAFE_INTEGER,Number.MIN_SAFE_INTEGER)
  expect(P0.magnitude()).to.equal(0, "Zero vector should have a magnitude of zero")
  expect(P1.magnitude()).to.not.equal(0, "Non zero vectors should have a magnitude greater than zero")
  expect(P2.magnitude()).to.not.equal(0, "Non zero vectors should have a magnitude greater than zero")
})

it('should be that ||aP|| is the same value as |a|*||P|| (`a` is the scalar value) ', function() {
  let P0 = new Vector(0,0,0)
  let P1 = new Vector(Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER)
  let P2 = new Vector(Number.MIN_SAFE_INTEGER,Number.MIN_SAFE_INTEGER,Number.MIN_SAFE_INTEGER)
  let Q1 = new Vector(1,2,3)
  let Q2 = new Vector(-1,-2,-3)
  let a1 = 4
  let a2 = -4
  // multiple all P vectors by a positive scalar
  expect(P0.multiply(a1).magnitude()).to.equal(P0.magnitude() * Math.abs(a1), `Vector ||aP|| Should equal |a|*||P||`)
  expect(P1.multiply(a1).magnitude()).to.equal(P1.magnitude() * Math.abs(a1), `Vector ||aP|| Should equal |a|*||P||`)
  expect(P2.multiply(a1).magnitude()).to.equal(P2.magnitude() * Math.abs(a1), `Vector ||aP|| Should equal |a|*||P||`)

  // now do it again with a negative scalar
  expect(P0.multiply(a2).magnitude()).to.equal(P0.magnitude() * Math.abs(a2), `Vector ||aP|| Should equal |a|*||P||`)
  expect(P1.multiply(a2).magnitude()).to.equal(P1.magnitude() * Math.abs(a2), `Vector ||aP|| Should equal |a|*||P||`)
  expect(P2.multiply(a2).magnitude()).to.equal(P2.magnitude() * Math.abs(a2), `Vector ||aP|| Should equal |a|*||P||`)
})

it('should be that ||P+Q|| is less than or equal to ||P|| + ||Q|| ', function() {
  let P0 = new Vector(0,0,0)
  let P1 = new Vector(Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER)
  let P2 = new Vector(Number.MIN_SAFE_INTEGER,Number.MIN_SAFE_INTEGER,Number.MIN_SAFE_INTEGER)
  let Q1 = new Vector(1,2,3)
  let Q2 = new Vector(-1,-2,-3)
  expect(P0.add(Q1).magnitude() <= (P0.magnitude() + Q1.magnitude())).to.equal(true)
  expect(P1.add(Q1).magnitude() <= (P1.magnitude() + Q1.magnitude())).to.equal(true)
  expect(P2.add(Q1).magnitude() <= (P2.magnitude() + Q1.magnitude())).to.equal(true)
  
  expect(P0.add(Q2).magnitude() <= (P0.magnitude() + Q2.magnitude())).to.equal(true)
  expect(P1.add(Q2).magnitude() <= (P1.magnitude() + Q2.magnitude())).to.equal(true)
  expect(P2.add(Q2).magnitude() <= (P2.magnitude() + Q2.magnitude())).to.equal(true)
  
})
