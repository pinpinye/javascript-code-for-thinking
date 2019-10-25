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
  var prototype = new F();
  prototype.constructor = child;
  child.prototype = prototype;
  child.super = parent.prototype;
}

 extend(Cat, Animal)
Cat.prototype.sayName = function() {
  console.log("I am a cat");
  Cat.super.sayName.call(this);
}

let myCat = new Cat('花花', 13);
myCat.sayName();
myCat.sayAge();

let myDog = new Animal('傻狗', 1);
                       
myDog.sayName();
myDog.sayAge();



