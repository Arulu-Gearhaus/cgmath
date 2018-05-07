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
  Vector: Vector,

  /** Takes a negative angle value and returns it's equivalent positive value.
   * @param {number} deg angle value (must be degrees)
   * @return {number} Positive angle value. If a negative value was passed in, output will be in the range: [0, 360)
   */
  absDegree: function(deg) {
    return deg < 0 ? ((deg % 360) + 360) % 360 : deg
  },

  /** Convert a value in Radians to Degrees 
   * @param {number} rad value (in radians) 
   * @return {number} value (in degrees)
  */
  toDegrees: function(rad) {
    return rad * 180 / Math.PI
  },

  /** Convert a value in Degrees to Radians 
   * @param {number} deg value (in degrees)
   * @return {number} value (in radians)
  */
  toRadians: function(deg) {
    return deg * Math.PI / 180
  },
}

module.exports = out