
class Animal {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  sayName() {
    console.log('I am ' + this.name);
  }
  sayAge() {
    console.log('I am ' + this.age + ' years old');
  }
}

class Cat extends Animal {
  constructor(name, age, color) {
    super(name, age);
    this.color = color;
  }
  sayName() {
    console.log('I AM A CAT');
    super.sayName();
  }
  sayColor() {
    console.log('I look ' + this.color);
  }
}

let mycat = new Cat('花花', 13, 'blue')
mycat.sayName();
mycat.sayAge();
mycat.sayColor();
