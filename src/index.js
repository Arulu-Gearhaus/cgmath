'use strict';
/*jslint node: true */

const Vector = require('./types/vectors/vector.js')

const out = {
  /** Vector value type - designed to be flexible for use at any dimension.  
   * The dimension of a Vector is determined by it's length (Vector extends Array).  
   *   
   * -----
   * **Note**  
   * You CAN technically pass arguments that aren't type Number, but Vector will attempt to convert them to numbers (i.e. will try to parse float from strings). **Treats NaN values as zero.**
  */
  Vector: Vector
}

module.exports = out