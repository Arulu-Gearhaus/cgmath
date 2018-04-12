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
  console.log(vec.length, vec)
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