// 方法一 递归
// 考虑循环引用： 父级引用和同级引用
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


// .JSON.parse()和JSON.stringify()

// undefined、任意的函数、正则表达式类型以及 symbol 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 null（出现在数组中时)；
// 它会抛弃对象的constructor。也就是深拷贝之后，不管这个对象原来的构造函数是什么，在深拷贝之后都会变成Object；
// 如果对象中存在循环引用的情况无法正确处理。
