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
  child.prototype = parent.prototype;
  return child;
}

Cat = extend(Cat, Animal)


Cat.prototype.sayName1 = function(){
  console.log('I am a cat');
  this.sayName();
}


let myCat = new Cat('花花', 13);
myCat.sayName1();
myCat.sayAge();

let myDog = new Animal('傻狗', 1);
                       
myDog.sayName();
myDog.sayAge();




