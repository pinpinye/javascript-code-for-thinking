function Animal(name, age){
    // 确定构造函数必须由new调用
  // if (new.target !== undefined) {
    this.name = name;
    this.age = age;
  // } else {
  //  throw new Error('必须使用 new 命令生成实例');
  //}
}

Animal.prototype.sayName = function(){
  console.log('I am ' + this.name);
}

Animal.prototype.sayAge = function(){
  console.log('I am ' + this.age + ' years old');
}

function Cat(name, age) {

  Animal.call(this, name, age);
}

// 道格拉斯，克罗克福德在prototypal inheritance in javascript一文中提出基于已有的的对象创建新对象 
// 取代chilld.prototype = new parent(), 可以解决二次调用使用new父级构造函数的问题
// 这个方法在ES5中通过Object.create规范化
function extend(child, parent) {   
  function F() {};
  F.prototype = parent.prototype;
  var prototype = new F(); // 拷贝原型
  prototype.constructor = child;
  child.prototype = prototype;
  child.super = parent.prototype; // 这里是对父级原型的引用
}


// 在ES6中，这里封装的extend方法可以用 Object.setPrototypeOf(Cat.prototype, Animal.prototype)直接设置原型替代;
// 直接使用setPrototypeOf修改原型会动态影响到访问任何[[Prototype]]已被更改的对象的代码；
// 如果考虑性能问题，那么应使用Object.create， child.prototype = Object.create(parent.prototype)。
extend(Cat, Animal);

// 不仅继承父类的同名方法。还可以实现子类定制的同名方法
Cat.prototype.sayName = function() {
  console.log("I am a cat");
  Cat.super.sayName.call(this); // 通过父级原型的引用调用，或者也可以直接通过Animal.prototype.sayName(this)调用
}

let myCat = new Cat('花花', 13);
myCat.sayName();
myCat.sayAge();

console.log(myCat instanceof Animal); // 打印出true
console.log(Animal.prototype.isPrototypeOf(myCat)); // 打印出true
console.log(myCat instanceof Cat); // 打印出true
console.log(Cat.prototype.isPrototypeOf(myCat)); // 打印出true

let myDog = new Animal('傻狗', 1);
                       
myDog.sayName();
myDog.sayAge();

// 模拟new 操作符做的事情
let creatChild = function(Parent) {
  if(typeof Parent !== 'function') {
    throw new Error('the first params of createChild should be a function')
  }
  let child = {};
  Object.setPrototypeOf(child, Parent.prototype); // 1. 添加一个__prtoto__指针指向指定父级的原型，其本质是 child.__prtoto__  = parent.ptototype
  Parent.apply(Parent, Array.prototype.slice(arguments,1)); // 2. 调用指定父级的构造函数 
  return child;
}

// 模拟new 操作符做的事情
let creatChild1 = function(Parent) {
  if(typeof Parent !== 'function') {
    throw new Error('the first params of createChild should be a function')
  }
  let child = Object.create(Parent.prototype); // 1.添加一个__prtoto__指针指向指定父级的原型, 其本质是child.__proto__ = Parent.prototype
  Parent.apply(child, Array.prototype.slice(arguments,1)); // 2. 调用指定父级的构造函数
  return child;
}

let myCat1 = creatChild(Cat, '小花花', 12);  
myCat1.sayName();
myCat1.sayAge();
console.log(myCat1 instanceof Animal); // 打印出true
console.log(Animal.prototype.isPrototypeOf(myCat1)); // 打印出true
console.log(myCat1 instanceof Cat); // 打印出true
console.log(Cat.prototype.isPrototypeOf(myCat1)); // 打印出true



