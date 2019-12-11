// https://stackoverflow.com/questions/2800964/benefits-of-prototypal-inheritance-over-classical/16872315#16872315
// 1. constructor不是实例的属性，当你创建函数时，JS会为这个函数自动添加prototype属性，它的值是一个有 constructor 属性的对象，不是空对象。
// 一旦原型prototype被改写，constructor也会被改写
// 2. instanceof 不是判断右边的参数是不是左边参数的constructor属性，而是判断右边的参数的原型是否存在在左边参数的原型链上，
// 准确的来说这是用来判断对象和函数原型之间的关系, 只要用这个操作符来测试实例(instance)与原型链中出现过的构造函数,结果就会返回true. 
// 3.使用 Object.isPrototypeOf() 方法, 同样只要是原型链中出现过的原型, isPrototypeOf() 方法就会返回true
// 4.原型的动态性, 可以通过改变原型来影响所有现存的实例
// 5.所有构造器/函数的__proto__都指向Function.prototype，它是一个空函数（Empty function）
// 6.所有对象的__proto__都指向其构造器的prototype


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

 // 以下会改变现有实例的行为
// Bar.prototype.speak = function(){ console.log("哈哈哈哈") }; 
// Bar.prototype.speak = null;
// 不会改变现有实例的行为，因为本质是浅拷贝, 实例里面已经保存了对原型中属性的引用
// Bar.prototype = {}

b1.speak();
b2.speak();

b1 instanceof Foo // true
b1 instanceof Bar // true
Foo.prototype.isPrototypeOf(b1) // true
Bar.prototype.isPrototypeOf(b1) // true
b1.constructor // Foo





// 7.Object.create 与 new的区别
// 两者都创建了一个新的对象，并设置了对象的__proto__，new设置构造函数的prototype为__proto__, Object.create以传入对象本身设置_prototype__
// new执行了构造函数, Object.create不执行
// Obeject.create，当第二个参数为空的时候，其生成的原型相当于目标对象的【浅拷贝】。
// 8. Object.prototype 的 __proto__  属性是一个访问器属性（一个getter函数和一个setter函数）, 暴露了通过它访问的对象的内部[[Prototype]] (一个对象或 null)。
// 9. ES6用setPrototypeOf使得原型委托的方式更加语义化, 但是性能较差，不建议使用

var Foo = {
    init: function(who) {
        this.me = who;
    },
    identify: function() {
        return "I am " + this.me;
    }
};
// 使用ES5的Object.create
var Bar = Object.create(Foo);

// 使用ES6的setPrototypeOf
var Col = {};
Object.setPrototypeOf(Col, Foo);

// 定义2个一样的函数
Bar.speak = function() {
    console.log("Hello, " + this.identify() + ".");
};
Col.speak = function() {
    console.log("Hello, " + this.identify() + ".");
};
// 继续创建新的对象
var b1 = Object.create(Bar);

var c1 = {};
Object.setPrototypeOf(c1, Col);


var d1 = Object.create(Bar, {aaaa: {value: 2222}});

// Object.create 和 setPrototypeOf行为一样
b1.init("b1");
b1.speak();
c1.init("c1");
c1.speak();


// 尝试重写原型
Bar.isPrototypeOf(b1) // true
Foo.isPrototypeOf(c1) // true
// Bar已经被重写了
Bar = {};

Bar.speak = function() { console.log("speak!!") }
Col.speak = function() { console.log("speak!!") }
Bar.sing = function() { console.log("sing a song") }
Col.sing = function() { console.log("sing a song") }

b1.init("b1"); 
b1.speak();  // Hello, I am b1. Bar被重写，切断了原型的联系，h1还是按旧的原型方法执行，说明在b1的__proto__中已经保存了对Bar的speak属性的引用。除非直接delete该属性

c1.init("c1");
c1.speak();  // "speak"，speak已经被更新了 由于是同一个引用，所以会同步更新

/* 
// 打印b1.__proto__
speak: ƒ ()  //重写前的Bar
__proto__: 
    identify: ƒ ()
    init: ƒ (who)
    __proto__: Object
    
// 打印c1.__proto__
 
sing: ƒ ()  // 最新的Col
speak: ƒ ()   
__proto__: 
    identify: ƒ ()
    init: ƒ (who)
    __proto__: Object
    
// 打印 d1
aaaa: 222
__proto__:
speak: ƒ ()
__proto__: Objec
Bar.isPrototypeOf(b1) // false
Foo.isPrototypeOf(c1) // true    
Bar.__proto__.isPrototypeOf(b1) // true
Foo.__proto__.isPrototypeOf(c1) // true    
*/
    
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create
function Constructor(){}
o = new Constructor();
// 上面的一句就相当于:
o = Object.create(Constructor.prototype);
// 创建一个以另一个空对象为原型,且拥有一个属性p的对象
o = Object.create({}, { p: { value: 42 } })
// 省略了的属性特性默认为false,所以属性p是不可写,不可枚举,不可配置的:
o.p = 24
o.p  //42
