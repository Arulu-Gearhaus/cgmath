const Vector = require('./src/index').Vector

let v = new Vector(1.1,2.2,3.3)
console.log(v)
console.log(v.add(v))
console.log(v.magnitude(v))
console.log(v.dot(v)) // v·v should be ||v|| squared

function* getNextNumber() {
  let num = 0;
  while(num < 5) {
    yield num;
    num++
  }
}

myIter = getNextNumber()

console.log(myIter.next(), myIter.next(), myIter.next(), myIter.next(), myIter.next(), myIter.next())

for(const val of getNextNumber()) {
  console.log('Iterating...', val)
}