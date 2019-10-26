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
  child.super = parent.prototype; // 这里是引用
}

 extend(Cat, Animal)
Cat.prototype.sayName = function() {
  console.log("I am a cat");
  Cat.super.sayName.call(this); // 通过引用调用，或者也可以直接通过Animal.prototype.sayName(this)调用
}

let myCat = new Cat('花花', 13);
myCat.sayName();
myCat.sayAge();

let myDog = new Animal('傻狗', 1);
                       
myDog.sayName();
myDog.sayAge();



