function Animal(name, age){
  this.name = name;
  this.age = age;
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


function extend(child, parent) {
  function F() {};
  F.prototype = parent.prototype;
  var prototype = new F(); // 拷贝原型
  prototype.constructor = child;
  child.prototype = prototype;
  child.super = parent.prototype; // 这里是对父级原型的引用
}

extend(Cat, Animal)  // 在ES6中，这里封装的extend方法可以用 Object.setPrototypeOf(Cat.prototype, Animal.prototype)替代;

Cat.prototype.sayName = function() {
  console.log("I am a cat");
  Cat.super.sayName.call(this); // 通过父级原型的引用调用，或者也可以直接通过Animal.prototype.sayName(this)调用
}

let myCat = new Cat('花花', 13);
myCat.sayName();
myCat.sayAge();

let myDog = new Animal('傻狗', 1);
                       
myDog.sayName();
myDog.sayAge();



