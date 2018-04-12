'use strict'
/*jslint node: true */
/*
MIT License

Copyright (c) [year] [fullname]

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

/*
You can use the Vector.js library with either arrays, or the defined Vector classes associated with Vector.js
The various vector objects inherit from Array - they don't have ALL the functionality of Arrays due to quirks of how JS works
But what should be necessary has been added in using VectorBase and forcing Array functionality using call() and Array.prototype.

The benefit of using a Vector2 over something like a bare array, is that it adds some expected features like accessing coordinates by their cartesian labels (i.e. x, y, z).
*/

// VSCode doesn't support @callback ('''''because there is no """standard""" for jsdoc''''''')/s
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

/** Generic Vector - designed to be flexible enough to use as a 2d, 3d, or higher dimension vector.  
 * Actual number of dimensions is dependent on how many values are stored inside it.  
 * Vector is: 
 * - An Array (sort-of) -  Vector is a descendant of Array.
 * - Forgiving - many of it's operation methods can work with mismatched Vector lengths - smaller dimension'd vectors have missing values treated as zero. 
 * - Chainable - many of the functions provided on Vector can be chained one after the other  
 * _________
 * ```
 * let vec1 = new Vector(1,2)
 * let vec2 = new Vector(3,4)
 * let vec3 = vec1.normalize().add(vec2).subtract(vec1)
 * ```
 * _________
 * - May not work exactly like an array - some functionality may not have carried over despite extending Array - I'm still in the process of discovering what's missing. If something was missed it can probably be added back in (see how forEach is added back to Vector in the source for an example of how)
 
 */
class Vector extends Array {

  /** Creates a new Vector - handles parameters the same way as an Array constructor would - but only values of type number will work for Vector. 
   * @param {number[]} args
  */
  constructor(...args) {
    super(...args)
  }

  // relabeling of length to be dimensions - for those who really need to have it say dimensions instead of length.
  /** Returns the dimension this vector exists in */
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
   * @param {baseForEvery} func callback function
   * #### Different Lengths?
   * If one array is longer than the other, remaining pairs will have a zero in place of missing values from the shorter array.
   */
  static forEvery (left, right, func) {
    let longestLength = Math.max(left.length, left.length)
    for(let i = 0; i < longestLength; i++) {
      let l_val = left[i] || 0
      let r_val = right[i] || 0
      func(l_val, r_val, i, left, right)
    }
  }

  /** Much like a forEach, but iterates over two Vectors values at the same time. For each pair of values, 'func' is called with the 'left' (this vector) and 'right' (the other vector) values for a given index. Vectors with mismatched dimensions are allowed.
   * @param {Vector} right other/right vector
   * @param {baseForEvery} func callback function
   * #### Different Lengths?
   * If one array is longer than the other, remaining pairs will have a zero in place of missing values from the shorter array.
   */
  forEvery(right, func) {
    Vector.forEvery(this, right, func)
  }

  static add(left, right) {
    let out = new Vector()
    Vector.forEvery(left, right, function(l_val, r_val) {
      out.push(l_val + r_val)
    })
    return out
  }

  /**Adds another vector to this vector  
   * @param {Vector} otherVec the other vector (to add to this vector.)
   * @returns {Vector} a **(new)** vector, who's values are the result of subtraction
   * */ 
  add(otherVec) { 
    return Vector.add(this, otherVec)
  }
  /** Subtract the right vector from the left vector
   * @param {Vector} left an array representing a vector
   * @param {Vector} right an array representing a vector
   * @returns {Vector} a **(new)** vector, who's values are the result of the addition
   * */ 
  static subtract(left, right) { 
    let out = new Vector()
    this.forEvery(left, right, function(l_val, r_val){
      out.push(l_val - r_val)
    })
    return out
  }

  /** subtracts another vector from this vector.
   * @returns {Vector} a **(new)** vector, who's values are the result of the subtraction
   * */
  subtract(otherVec) {
    return Vector.subtract(this, otherVec)
  }

  /** Multiply a scalar with a vector
   * @param {Vector} vector
   * @param {number} scalar 
   * @returns {Vector} result of multiplying scalar with vector
   */
  static multiply(vector, scalar) {
    if(vector instanceof Vector && !isNaN(scalar)){
      let out = new Vector()
      return vector.forEach((val) => {
        out.push(val * scalar)
      })
      return out
    }
    return undefined
  }

  multiply(scalar) {
    return Vector.multiply(this, scalar)
  }
  
  /** Calculates the magnitude (or length) of a vector 
   * @param {Vector} A a vector
   * @returns {number} magnitude (length) of vector A -> ||A||
  */
  static magnitude(A) {
    let sumOfPowers = 0 // represents Ax^2 + Ay^2 + .. + An^2
    A.forEach( component => {
      sumOfPowers += component * component
    })
    return Math.pow(sumOfPowers, 0.5)
  }

  /** Calculates the magnitude (or length) of this vector 
   * @returns {number} magnitude (length) of this vector, ||this||
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

}

module.exports = Vector

