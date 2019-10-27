
class Animal {
  constructor(name, age) {
    // 如果Animal不能独立使用、必须继承后才能使用的类 可以使用new.target判断
    if (new.target === Animal) {   
      throw new Error('本类不能实例化');
    }
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
