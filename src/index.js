'use strict';
/*jslint node: true */

const vector = require('./src/types/vectors/vector.js')

let i = new vector(4,5,6)
console.log(i.toString())
let k = function() { }
k.prototype = vector
let kn = new k(1,2,3)
console.log('kn', kn)

const out = {
  /** Vector value type - designed to be flexible for use at any dimension.*/
  vector: vector
}
let j = new out.vector(2,2,2);
console.log(j.magnitude())
console.log(j.normalize())
console.log(j.normalize().add(i).subtract(j))
