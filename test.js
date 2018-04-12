class MyArray extends Array {

  forEach(func) {
    Array.prototype.forEach.call(this, func)
  }

  static sayHi(name) { console.log('hello', name)}

  sayHi() { console.log('non-static hello', arguments[0] ? arguments[0] : 'world!')}

}

let a = new MyArray()

a.sayHi()

MyArray.sayHi()


// let a = new MyArray(1,2,3)

// console.log('index 0',a[0],'index -1', a[-1])
// Array.prototype.forEach.call(a, (val, ind) => console.log('proto:',ind, val))
// a.push('apple')
// a.shift()
// a.unshift('wonton')
// a.forEach((val,ind)=>console.log('mine',ind,val))
// console.log('length',a.length)