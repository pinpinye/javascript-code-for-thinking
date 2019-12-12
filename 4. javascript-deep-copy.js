// 方法一
// .JSON.parse()和JSON.stringify()
// undefined、任意的函数、正则表达式类型以及 symbol 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 null（出现在数组中时)；
// 它会抛弃对象的constructor。也就是深拷贝之后，不管这个对象原来的构造函数是什么，在深拷贝之后都会变成Object；
// 如果对象中存在循环引用的情况无法正确处理。

// 方法二 递归
// 考虑循环引用： 父级引用和同级引用
function deepClone(o,parentWrap = null) {
  // let getType = (obj) => Object.prototype.toString.call(obj).split(" ")[1].slice(0,-1);
  // 遍历父级，看是否有循环引用
  // 保留一份引用
  let _parentWrap = parentWrap;
  while(_parentWrap) {
    if(o === _parentWrap.sourceParent) {
      return _parentWrap.currentParent
    }
    _parentWrap = _parentWrap.parentWrap
  }
  if(o && typeof o === 'object' ) {
    let copy =  o instanceof Array ? [] : {}
    for(let key in o) {
      if (o[key] && typeof o[key]=== 'object')  {
         // if(o[key] === o) {
           // throw new Error('克隆的对象包含循环引用！')
        // }
         copy[key] = deepClone(o[key], {
           sourceParent: o,
           currentParent: copy,
           parentWrap: parentWrap
           })
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

// 循环引用测试 上一层父级
let c = {
  a:1,
  b: {b: 1},
  c: [1,2,3]
}
c.copy = c
console.log(deepClone(c))

//间隔 多级循环引用测试 任意父级
c.copy1 = {a1: {b: {}}}
c.copy1.a1.b = c.copy1  
console.log(deepClone(c))

// 同级引用测试
c.copy1.a1.b = c.b
c.copy1.a1.b ===  c.b //true
let dd = deepClone(c) 
dd.copy1.a1.b === dd.b // false 不考虑同级引用会变成false

// --------------------------以下考虑同级引用--------------------------------------------------------
// 将源对象中的所有对象保存起来
function deepClone1(o, existObj) {
  // 使用hash表记录
  let existMap = existObj || new WeakMap();
  if(o && typeof o === 'object' ) {
    let copy =  o instanceof Array ? [] : {}
    // 判断对象是否已经存在
    if (existMap.get(o)) {
       return existMap.get(o)
     } 
    existMap.set(o, copy);
    for(let key in o) {
      if (o[key] && typeof o[key]=== 'object')  {
         copy[key] = deepClone1(o[key], existMap)
      } else {
         copy[key] = o[key]
      }
    }
    return copy
  }
    return o
}
 c = {
  a:1,
  b: {b: 1},
  c: [1,2,3]
}
// 循环引用测试 上一层父级
 c = {
  a:1,
  b: {b: 1},
  c: [1,2,3]
}
c.copy = c
console.log(deepClone1(c))

//间隔 多级循环引用测试 任意父级
c.copy1 = {a1: {b: {}}}
c.copy1.a1.b = c.copy1  
console.log(deepClone1(c))

// 同级引用测试
c.copy1.a1.b = c.b
c.copy1.a1.b ===  c.b //true
dd = deepClone1(c) 
dd.copy1.a1.b === dd.b // false 不考虑同级引用会变成false
