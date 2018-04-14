'use strict'
/*jslint node: true */
//need to document with some mathy symbols? Here you go! · α ‖
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

// VSCode doesn't support @callback ('because there is no """standard""" for jsdoc')/s
// the below is so that we see a signature for forEvery's callback parameter rather than a generic 'arg1, arg2, arg3'
/**
 * @param {number} leftVal value from left array, at (index)
 * @param {number} rightVal value from right array, at (index)
 * @param {number} index the index these values came from. Ordered left to right, x=0, y=1, z=2, etc.
 * @param {Vector} leftVector the left vector being iterated over
 * @param {Vector} rightVector the right vector being iterated over
 * @returns {null}
 */
function baseForEvery(leftVal, rightVal, index, leftVector, rightVector){}
// Disregard this - it's purely to provide a signature for the forEvery function's callback

/** ## Vector
 * Dynamically sized vector class (dimension depends on it's contents). 
 * Vector is: 
 * - Actually an Array -  Vector is a descendant of Array.
 * - Forgiving - many of it's operation methods can work with mismatched Vector lengths - smaller dimension'd vectors have missing values treated as zero. 
 * - Open to seeing others - You can use an array of numbers in place of any vector parameter.
 * - Chainable - many of the functions provided on Vector can be chained one after the other  
 * _________
 * ```
 * let vec1 = new Vector(1,2)
 * let vec2 = new Vector(3,4)
 * let vec3 = vec1.normalize().add(vec2).subtract(vec1)
 * ```
 * _________
 * - May not work exactly like an array - some functionality may not have carried over despite extending Array - I'm still in the process of discovering what's missing. If something was missed it can probably be added back in (see how forEach is added back to Vector in the source for an example of how)
 
 ### Performance
 Operations such as Add or Multiply allocate a new array whenever they are called.
 All such functions take an (optional) Vector as their final parameter - passing this vector in will cause it's values to be over-written with the result of the operation.
 */
class Vector extends Array {

  /** Creates a new Vector - handles parameters the same way as an Array constructor would - but only values of type number will work for Vector. 
   * @param {number[]} args
  */
  constructor(...args) {
    super(...args)
  }

  /* _________
   * ### Note
   * `dimension` is an alias of Array.prototype.length. It exists because the 'length' of a vector is it's dimension - and when reading/reasoning about code involving vectors the term 'Dimension' may be more relevant to the reader.*/
  /** The dimension of this vector*/
  get dimension() { return this.length }

  // Hard coded coordinate labels. Lets you use a vector by refering to myVec.x rather than myVec[0]. unfotunately anything over 4 dimensions must resort to using array notation. 
  get x() { return this[0] }
  get y() { return this[1] }
  get z() { return this[2] }
  get w() { return this[3] }
  set x(val) { this[0] = val }
  set y(val) { this[1] = val }
  set z(val) { this[2] = val }
  set w(val) { this[3] = val }

  /**
   * @param {function(number, number, Array):null} callbackfn 
   */
  forEach(callbackfn) {
    Array.prototype.forEach.call(this, callbackfn)
  }
    /** Much like a forEach, but iterates over two arrays. For each pair of values, 'func' is called with the 'left' and 'right' values for a given index. Arrays with mismatched lengths are allowed.
   * @param {Vector} left left vector
   * @param {Vector} right right vector
   * @param {baseForEvery} func callback function. If func returns true it will end forEvery iteration early.
   * #### Different Lengths?
   * If one array is longer than the other, remaining pairs will have a zero in place of missing values from the shorter array.
   */
  static forEvery (left, right, func) {
    let longestLength = Math.max(left.length, left.length)
    for(let i = 0; i < longestLength; i++) {
      let l_val = left[i] || 0
      let r_val = right[i] || 0
      if(func(l_val, r_val, i, left, right))
        return
    }
  }

  /** Much like a forEach, but iterates over two Vectors values at the same time. For each pair of values, 'func' is called with the 'left' (this vector) and 'right' (the other vector) values for a given index. Vectors with mismatched dimensions are allowed.
   * @param {Vector} right other/right vector
   * @param {baseForEvery} func callback function. If func returns true it will end forEvery iteration early.
   * #### Different Lengths?
   * If one array is longer than the other, remaining pairs will have a zero in place of missing values from the shorter array.
   */
  forEvery(right, func) {
    Vector.forEvery(this, right, func)
  }

    /**Adds another vector to this vector  
   * @param {Vector} v1 first vector 
   * @param {Vector} v2 the second vector being added to the first
   * @param {Vector} out (optional) vector to store the result. By default, a new vector will be created and returned.
   * @returns {Vector} the result from addition. If 'out' was passed in a reference to that vector is returned insteadaddition*/
  static add(v1, v2, out=undefined) {
    if(!(out instanceof Vector)){
      out = new Vector()
    }

    Vector.forEvery(v1, v2, function(l_val, r_val, index) {
      if(out.length <= index) {
        out.push(l_val + r_val)
      } else {
        out[index] = l_val + r_val
      }
    })
    return out
  }

  /**Adds another vector to this vector  
   * @param {Vector} otherVec the other vector (to add to this vector.)
   * @param {Vector} out (optional) vector to store the result. By default, a new vector will be created and returned.
   * @returns {Vector} the result from addition. If 'out' was passed in a reference to that vector is returned insteadaddition*/
  add(otherVec, out=undefined) { 
    return Vector.add(this, otherVec, out)
  }

  /** Subtract the right vector from the left vector
   * @param {Vector} left an array representing a vector
   * @param {Vector} right an array representing a vector
   * @param {Vector} out (optional) vector to store the result. By default, a new vector will be created and returned.
   * @returns {Vector} the result from subtraction. If 'out' was passed in a reference to that vector is returned insteadaddition
   * */ 
  static subtract(left, right, out=undefined) { 
    if(!(out instanceof Vector)){
      out = new Vector()
    }
    this.forEvery(left, right, function(l_val, r_val, index){
      if(out.length <= index) {
        out.push(l_val - r_val)
      } else {
        out[index] = l_val - r_val
      }
    })
    return out
  }

  /** subtracts another vector from this vector.
   * @param {Vector} other the vector subtracting from this vector.
   * @param {Vector} out (optional) vector to store the result. By default, a new vector will be created and returned.
   * @returns {Vector} the  resulting vector from subtraction. If 'out' was passed in a reference to that vector is returned instead.
   * */
  subtract(otherVec, out) {
    return Vector.subtract(this, otherVec, out)
  }

  /** Multiply a scalar with a vector
   * @param {Vector} vector
   * @param {number} scalar 
   * @returns {Vector} result of multiplying scalar with vector
   */
  static multiply(vector, scalar) {
    if(vector instanceof Vector && !isNaN(scalar)){
      // console.log('ok to multiply')
      let out = new Vector()
      vector.forEach((val) => {
        out.push(val * scalar)
      })
      return out
    }
    // console.log('rejecting', vector, scalar)
    return undefined
  }

  multiply(scalar) {
    return Vector.multiply(this, scalar)
  }
  
  /** Calculates the magnitude (or length) of a vector 
   * @param {Vector} A a vector
   * @returns {number} magnitude (length) of vector A -> ‖A‖
  */
  static magnitude(A) {
    let sumOfPowers = 0 // represents Ax^2 + Ay^2 + .. + An^2
    A.forEach( component => {
      sumOfPowers += component * component
    })
    return Math.pow(sumOfPowers, 0.5)
  }

  /** Calculates ‖A‖, the magnitude (or length) of this vector 
   * @returns {number} magnitude (length) of this vector
  */
  magnitude() {
    return Vector.magnitude(this)
  }

  /** Normalizes vector A, returning a new vector who's orientation is the same but magnitutde is 1 
   * @param {Vector} A an array representing a vector
   * @returns {Vector} a **(new)** vector with a magnitutde of 1 (it's normalized)
  */
  static normalize(A) {
    /* 1 / ||a|| */
    let inverseMagnitude = 1 / this.magnitude(A) 
    let normalized = new Vector()
    A.forEach(function(component) {
      normalized.push(component * inverseMagnitude)
    })
    return normalized
  }

  /** Calculates the normal vector from this vector - and returns it  
   * This vector will _**not be changed**_ by calling normalize!*/
  normalize() {
    return Vector.normalize(this)
  }

  /**Calculates the dot product of two vectors, v1 and v2.  
   * (aka 'sum of products')  
   * ### Hot Dot Product Facts
   * - If P·Q = 0, then vectors P and Q are perpendicular. Note that cosine(90) is zero.
   * - P·Q = ‖P‖‖Q‖cosα - where "α is the 'planar angle' between the lines connecting the origin to the points represented by P and Q" - (Lengyel, Eric)
   * @param {*} otherVec 
   */
  static dot(v1, v2) {
    let out = 0
    Vector.forEvery(v1, v2, (lval, rval) => {
      out += v1 * v2
    })
    return out
  }

  /**Calculates the dot product of this vector and otherVector.  
   * (aka 'sum of products')
   * @param {*} otherVec 
   */
  dot(otherVector) {
    return Vector.forEvery(this, otherVector)
  }



  toString() {
    let out = this.join(',')
    return `<${out}>`;
  }

  /** Compare two vectors, in order, value by value 
   * @param {Vector} v1 vector which will be compared with the other vector
   * @param {Vector} v2 second vector which will be compared with the first
  */
  static equals(v1, v2) {
    let isEqual = true
    this.forEvery(v1, v2, function(lval, rval) {
      if(lval !== rval){
        isEqual = false
        return true //return true, indicating iterationg does need to stop
      }
    })
    return isEqual
  }

  /** Compare to another vector, in order, value by value
   * @param {Vector} other The other vector which will be compared to this*/
  equals(other) {
    return Vector.equals(this, other)
  }
}

module.exports = Vector

// console.log(new Vector(1,2,3).toString())
//console.log(Vector.add([1,1,1],[2,2,2]))