// 1. constructor不是实例的属性，当你创建函数时，JS会为这个函数自动添加prototype属性，它的值是一个有 constructor 属性的对象，不是空对象。
// 一旦原型prototype被改写，constructor也会被改写
// 2. instanceof 不是判断右边的参数是不是左边参数的constructor属性，而是判断右边的参数的原型是否存在在左边参数的原型链上，
// 准确的来说这是用来判断对象和函数原型之间的关系, 只要用这个操作符来测试实例(instance)与原型链中出现过的构造函数,结果就会返回true. 
// 3.使用 Object.isPrototypeOf() 方法, 同样只要是原型链中出现过的原型, isPrototypeOf() 方法就会返回true
// 4.原型的动态性, 可以通过改变原型来影响所有现存的实例

function Foo(who) {
    this.me = who;
}
Foo.prototype.identify = function() {
    return "I am " + this.me;
};

function Bar(who) {
    Foo.call(this, who);
}
Bar.prototype = Object.create(Foo.prototype);

Bar.prototype.speak = function() {
    console.log("Hello, " + this.identify() + ".");
};

var b1 = new Bar("b1");
var b2 = new Bar("b2");

// Bar.prototype.speak = function(){ console.log("哈哈哈哈") };  // 会改变现有实例的行为
//  Bar.prototype.speak = null;

b1.speak();
b2.speak();

b1 instanceof Foo // true
b1 instanceof Bar // true
Foo.prototype.isPrototypeOf(b1) // true
Bar.prototype.isPrototypeOf(b1) // true
b1.constructor // Foo





// 5.Object.create 与 new的区别
// 两者都创建了一个新的对象，并设置了对象的__proto__
// new执行了构造函数, Object.create不执行，因此没有this
// Obeject.create相当于创建了一个新的原型对象，当第二个参数为空的时候，原型相当于目标对象的深拷贝。
// 而new实例没有创建新的原型，而是对构造函数原型的引用
// 6.Object.prototype 的 __proto__  属性是一个访问器属性（一个getter函数和一个setter函数）, 暴露了通过它访问的对象的内部[[Prototype]] (一个对象或 null)。

var Foo = {
    init: function(who) {
        this.me = who;
    },
    identify: function() {
        return "I am " + this.me;
    },
    test: []
};
var Bar = Object.create(Foo);

Bar.speak = function() {
    console.log("Hello, " + this.identify() + ".");
};

var b1 = Object.create(Bar);
b1.init("b1");
var b2 = Object.create(Bar);

b2.init("b2");
b1.speak();
b2.speak();



var Hit = Object.create(Bar);
var c1 = Object.create(Hit);
c1.test.push(123);
console.log('Foo', Foo.test)

Bar.isPrototypeOf(c1) // true
Foo.isPrototypeOf(c1) // true
// Hit.isPrototypeOf(c1) // true
// Bar已经被重写了，b1为何还有speak方法？ b1是如何判断Foo是它的原型呢？因为c1是些重写之前关联的深拷贝。
Bar = {};
Hit = {};
// Hit = null;
Bar.speak = function() { console.log("哈哈哈哈") }
// delete Bar.speak;
// delete Hit.speak;

Bar.isPrototypeOf(c1) // false
Foo.isPrototypeOf(c1) // true
Hit.isPrototypeOf(c1) // false


c1.init("c1");
c1.speak(); // 吃



// 7. Object.creat
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create
function Constructor(){}
o = new Constructor();
// 上面的一句就相当于:
o = Object.create(Constructor.prototype);
// 当然,如果在Constructor函数中有一些初始化代码,Object.create不能执行那些代码
// 创建一个以另一个空对象为原型,且拥有一个属性p的对象
o = Object.create({}, { p: { value: 42 } })
// 省略了的属性特性默认为false,所以属性p是不可写,不可枚举,不可配置的:
o.p = 24
o.p
//42
