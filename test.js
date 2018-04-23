const Vector = require('./src/index').Vector

let v = new Vector(1.1,2.2,3.3)
console.log(v)
console.log(v.add(v))
console.log(v.magnitude(v))
console.log(v.dot(v)) // v·v should be ||v|| squared