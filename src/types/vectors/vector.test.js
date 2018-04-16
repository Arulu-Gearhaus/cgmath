'use strict'
/*jslint node: true */
/*
MIT License

Copyright (c) 2018 Arulu Mays

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

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

it('Should have getters for (x,y,z,w)', function() {
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

/* Theorem 1.1(Mathematics for 3d Game Programming & Computer Graphics 2nd Edition)
  Given any two scalars `a` and `b` and any three vectors P, Q, and R, the following properties hold:
  1) P + Q = Q + P  (Commutative Property)
  2) (P + Q) + R = P + (Q + R)  (Associative Property)
  3) (ab)P = a(bP)  (Associative Property [scalar])
  4) a(P+Q) = aP + aQ (Distributive Property)
  5) (a+b)P = aP + bP (Distributive Property [scalar])
*/

it('should be that Vector evinces the Commutative Property P+Q = Q+P', function() {
  let P1 = new Vector() // < Max, Max, Max, Max >
  let Q1 = new Vector() // < Min, Min, Min, Min >
  for(let i = 0; i < 4; i++) {
    P1.push(0)
    Q1.push(Number.MAX_SAFE_INTEGER/2)

    expect(P1.add(Q1).equals(Q1.add(P1))).to.equal(true)
  }
})

/** I found here that exceeding the MAX_SAFE_INTEGER does lead to unexpected
 * results when division is included. A floating point value may unexpectedly round up or down apparently.
 */
it('should be that Vector evinces the Associative Property (P + Q) + R = P + (Q + R)', function() {
  let P1 = new Vector() // < Max, Max, Max, Max >
  let Q1 = new Vector() // < Min, Min, Min, Min >
  let R1 = new Vector() // < Min, Min, Min, Min >
  for(let i = 0; i < 4; i++) {
    P1.push(Number.MIN_SAFE_INTEGER/2)
    Q1.push(Number.MAX_SAFE_INTEGER/2)
    R1.push(Number.MAX_SAFE_INTEGER/2)
    let PQR = R1.add(P1.add(Q1))
    let RQP = P1.add(Q1.add(R1))
    // console.log('PQR', PQR, 'RQP', RQP)
    expect(PQR.equals(RQP)).to.equal(true)
  }
})

it('should be that Vector evinces the [Scalar] Associative Property (ab)P = a(bP)', function() {
  let P1 = new Vector() // < Max, Max, Max, Max >
  let P2 = new Vector() // < Min, Min, Min, Min >
  for(let i = 1; i <= 4; i++) {
    P1.push(Number.MIN_SAFE_INTEGER/2)
    P2.push(Number.MAX_SAFE_INTEGER/2)
    let a = i
    let b = -i
    expect(P1.multiply(a*b).equals(P1.multiply(b).multiply(a))).to.equal(true)
    expect(P2.multiply(a*b).equals(P2.multiply(b).multiply(a))).to.equal(true)
  }
})

it('should be that Vector evinces the Distributive Property a(P+Q) = aP + aQ', function() {
  let P1 = new Vector() // < Max, Max, Max, Max >
  let Q1 = new Vector() // < Min, Min, Min, Min >
  for(let i = 1; i <= 4; i++) {
    P1.push(Number.MIN_SAFE_INTEGER/2)
    Q1.push(Number.MAX_SAFE_INTEGER/2)
    let a = i
    let aPQ = P1.add(Q1).multiply(a) // (PQ)a
    let aP = P1.multiply(a)
    let aQ = Q1.multiply(a)
    expect(aPQ.equals(aP.add(aQ))).to.equal(true)
  }
})

it('should be that Vector evinces the [Scalar] Distributive Property (a+b)P = aP + bP', function() {
  let P1 = new Vector() // < Max, Max, Max, Max >
  let P2 = new Vector() // < Min, Min, Min, Min >
  for(let i = 1; i <= 4; i++) {
    P1.push(Number.MIN_SAFE_INTEGER/2)
    P2.push(Number.MAX_SAFE_INTEGER/2)
    let a = i
    let b = -i
    let aP1 = P1.multiply(a)
    let aP2 = P2.multiply(a)
    let bP1 = P1.multiply(b)
    let bP2 = P2.multiply(b)
    expect(P1.multiply(a+b).equals(aP1.add(bP1))).to.equal(true)
    expect(P2.multiply(a+b).equals(aP2.add(bP2))).to.equal(true)
    
  }
})

/* Theorem 1.2 (Mathematics for 3d Game Programming & Computer Graphics 2nd Edition)
The following properties should hold true:
For vectors P, Q and scalar 'a'
1) ‖P‖>= 0
2) ‖P‖== 0 if and only if P = <0,0,...,0>
3) ‖aP‖ == |a|*‖P‖
4) ‖P+Q‖ <= ‖P‖ + ‖Q‖
*/

it('should be that the Magnitude of a vector should be greater than or equal to zero', function() {
  let P0 = new Vector() // < 0, 0 ,0 ,0 >
  let P1 = new Vector() // < Max, Max, Max, Max >
  let P2 = new Vector() // < Min, Min, Min, Min >
  for(let i = 0; i < 4; i++) {
    P0.push(0)
    P1.push(Number.MAX_SAFE_INTEGER/2)
    P2.push(Number.MIN_SAFE_INTEGER/2)
  
    expect(P0.magnitude() >= 0).to.equal(true)
    expect(P1.magnitude() >= 0).to.equal(true)
    expect(P2.magnitude() >= 0).to.equal(true)
  }
})

it('Only a `zero` vector (all values are zero) should have a magnitude of zero ', function() {
  let P0 = new Vector() // < 0, 0 ,0 ,0 >
  let P1 = new Vector() // < Max, Max, Max, Max >
  let P2 = new Vector() // < Min, Min, Min, Min >
  for(let i = 0; i < 4; i++) {
    P0.push(0)
    P1.push(Number.MAX_SAFE_INTEGER/2)
    P2.push(Number.MIN_SAFE_INTEGER/2)
    expect(P0.magnitude()).to.equal(0, "Zero vector should have a magnitude of zero")
    expect(P1.magnitude()).to.not.equal(0, "Non zero vectors should have a magnitude greater than zero")
    expect(P2.magnitude()).to.not.equal(0, "Non zero vectors should have a magnitude greater than zero")
  }
})

it('should be that ‖aP‖ is the same value as |a|*‖P‖ (`a` is the scalar value) ', function() {
  let P0 = new Vector() // < 0, 0 ,0 ,0 >
  let P1 = new Vector() // < Max, Max, Max, Max >
  let P2 = new Vector() // < Min, Min, Min, Min >
  for(let i = 0; i < 4; i++) {
    P0.push(0)
    P1.push(Number.MAX_SAFE_INTEGER/2)
    P2.push(Number.MIN_SAFE_INTEGER/2)
    let a1 = (i + 1)
    let a2 = -1 * (i + 1)
    // multiple all P vectors by a positive scalar
    expect(P0.multiply(a1).magnitude()).to.equal(P0.magnitude() * Math.abs(a1), `Vector ‖aP‖ Should equal |a|*‖P‖`)
    expect(P1.multiply(a1).magnitude()).to.equal(P1.magnitude() * Math.abs(a1), `Vector ‖aP‖ Should equal |a|*‖P‖`)
    expect(P2.multiply(a1).magnitude()).to.equal(P2.magnitude() * Math.abs(a1), `Vector ‖aP‖ Should equal |a|*‖P‖`)

    // now do it again with a negative scalar
    expect(P0.multiply(a2).magnitude()).to.equal(P0.magnitude() * Math.abs(a2), `Vector ‖aP‖ Should equal |a|*‖P‖`)
    expect(P1.multiply(a2).magnitude()).to.equal(P1.magnitude() * Math.abs(a2), `Vector ‖aP‖ Should equal |a|*‖P‖`)
    expect(P2.multiply(a2).magnitude()).to.equal(P2.magnitude() * Math.abs(a2), `Vector ‖aP‖ Should equal |a|*‖P‖`)
  }
})

it('should be that ‖P+Q‖ is less than or equal to ‖P‖ + ‖Q‖ ', function() {
  let P0 = new Vector() // < 0, 0 ,0 ,0 >
  let P1 = new Vector() // < Max, Max, Max, Max >
  let P2 = new Vector() // < Min, Min, Min, Min >Number.MIN_SAFE_INTEGER)
  let Q1 = new Vector() // <1, 2, 3, 4>
  let Q2 = new Vector() // <-1, -2, -3, -4>
  for(let i = 0; i < 4; i++) {
    P0.push(0)
    P1.push(Number.MAX_SAFE_INTEGER/2)
    P2.push(Number.MIN_SAFE_INTEGER/2)
    Q1.push(i+1)
    Q2.push(-1*(i+1))
    expect(P0.add(Q1).magnitude() <= (P0.magnitude() + Q1.magnitude())).to.equal(true)
    expect(P1.add(Q1).magnitude() <= (P1.magnitude() + Q1.magnitude())).to.equal(true)
    expect(P2.add(Q1).magnitude() <= (P2.magnitude() + Q1.magnitude())).to.equal(true)
    
    expect(P0.add(Q2).magnitude() <= (P0.magnitude() + Q2.magnitude())).to.equal(true)
    expect(P1.add(Q2).magnitude() <= (P1.magnitude() + Q2.magnitude())).to.equal(true)
    expect(P2.add(Q2).magnitude() <= (P2.magnitude() + Q2.magnitude())).to.equal(true)
  }
})

/* Properties regarding dot product
  P·Q = Q·P
  (aP)·Q = a(P·Q)
  P·(Q·R) = P·Q + P·R
  P·P = ‖P‖^2
*/

it('should be such that P·Q = Q·P', function() {
  let P0 = new Vector() // < 0, 0 ,0 ,0 >
  let P1 = new Vector() // < Max, Max, Max, Max >
  let P2 = new Vector() // < Min, Min, Min, Min >Number.MIN_SAFE_INTEGER)
  let Q1 = new Vector() // <1, 2, 3, 4>
  let Q2 = new Vector() // <-1, -2, -3, -4>
  for(let i = 0; i < 4; i++) {
    P0.push(0)
    P1.push(Number.MAX_SAFE_INTEGER/2)
    P2.push(Number.MIN_SAFE_INTEGER/2)
    Q1.push(i+1)
    Q2.push(-1*(i+1))
    console.log(P0, Q1, P0.dot(Q1), Q1.dot(P0))
    expect(P0.dot(Q1)).to.equal(Q1.dot(P0))
    expect(P1.dot(Q1)).to.equal(Q1.dot(P1))
    expect(P2.dot(Q1)).to.equal(Q1.dot(P2))
    expect(P0.dot(Q2)).to.equal(Q2.dot(P0))
    expect(P1.dot(Q2)).to.equal(Q2.dot(P1))
    expect(P2.dot(Q2)).to.equal(Q2.dot(P2))
    
    expect(P0.dot(P1)).to.equal(P1.dot(P0))
    expect(P0.dot(P2)).to.equal(P2.dot(P0))
    expect(P1.dot(P2)).to.equal(P2.dot(P1))
  }
})

it('should be such that (aP)·Q = a(P·Q)', function() {
  let P0 = new Vector() // < 0, 0 ,0 ,0 >
  let P1 = new Vector() // < Max, Max, Max, Max >
  let P2 = new Vector() // < Min, Min, Min, Min >Number.MIN_SAFE_INTEGER)
  let Q1 = new Vector() // <1, 2, 3, 4>
  let Q2 = new Vector() // <-1, -2, -3, -4>
  for(let i = 0; i < 4; i++) {
    P0.push(0)
    P1.push(Number.MAX_SAFE_INTEGER/2)
    P2.push(Number.MIN_SAFE_INTEGER/2)
    Q1.push(i+1)
    Q2.push(-1*(i+1))
    let a = i
    
    expect(P0.multiply(a).dot(Q1)).to.equal(Q1.dot(P0) * (a))
    expect(P1.multiply(a).dot(Q1)).to.equal(Q1.dot(P1) * (a))
    expect(P2.multiply(a).dot(Q1)).to.equal(Q1.dot(P2) * (a))
    expect(P0.multiply(a).dot(Q2)).to.equal(Q2.dot(P0) * (a))
    expect(P1.multiply(a).dot(Q2)).to.equal(Q2.dot(P1) * (a))
    expect(P2.multiply(a).dot(Q2)).to.equal(Q2.dot(P2) * (a))
    
    expect(P0.multiply(a).dot(P1)).to.equal(P1.dot(P0) * (a))
    expect(P0.multiply(a).dot(P2)).to.equal(P2.dot(P0) * (a))
    expect(P1.multiply(a).dot(P2)).to.equal(P2.dot(P1) * (a))
  }
})