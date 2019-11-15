
function deepClone(o) {
  // let getType = (obj) => Object.prototype.toString.call(obj).split(" ")[1].slice(0,-1);
  if(o && typeof o === 'object' ) {
    let copy =  o instanceof Array ? [] : {}
    for(let key in o) {
      if (o[key] && typeof o[key]=== 'object')  {
         if(o[key] === o) {
           throw new Error('克隆的对象包含循环引用！')
         }
         copy[key] = deepClone(o[key])
      } else {
         copy[key] = o[key]
      }
    }
    return copy
  }
    return o
}


// 测试用例
let a = {
  a: null,
  aa: undefined,
  b: {b: 1},
  c: [1,2,3]
}
let aa = deepClone(a)
console.log(aa)

let b = [1,a,3, null]
let bb = deepClone(b)
console.log(bb)

console.log(deepClone(null))
console.log(deepClone())
console.log(deepClone(deepClone))

// 循环引用测试
let c = {
  a:1,
  b: {b: 1},
  c: [1,2,3]
}
c.copy = c
console.log(deepClone(c))
