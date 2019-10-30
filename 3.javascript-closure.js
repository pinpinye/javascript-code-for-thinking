
// 1. 闭包是由函数以及创建该函数的词法环境组合而成,这个环境包含了这个闭包创建时所能访问的所有局部变量。
// 2. 理论上任何函数的创建都创建了闭包
// 3. 函数的作用域包含所有这些可以访问的局部变量和全局变量, 每次函数创建时, 会创建新的作用域的变量对象来保存这些变量，除了函数自己本身定义的变量之外，
//    还会复制一份父级作用域的【引用】添加到自己的作用域中。
// 4. 函数执行上下文，每个执行上下文是一个object， 主要有以下3个部分组成： 作用域链，变量对象以及this指针。
// 5. 闭包是javascript词法作用域和执行上下文共同作用的一种运行机制


// 闭包可以解决的几个问题： 
// 1. 外部如何访问函数内部的变量，将闭包作为函数的返回值
// 2. 创建私有变量， 只能通过公共方法访问
// 3. 如何让一个变量不销毁, 通过闭包来引用
// 4. 循环语句中的变量共享问题

// 闭包特点1: 在闭包内改变局部变量的值，会改变这个闭包的词法环境。同一次函数执行后返回的闭包，共享上层函数的变量。

var Counter = (function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  }   
})();

console.log(Counter.value()); /* logs 0 */
Counter.increment();
Counter.increment();
console.log(Counter.value()); /* logs 2 */
Counter.decrement();
console.log(Counter.value()); /* logs 1 */



// 闭包特点2: 通过多次执行函数返回的闭包，一个闭包内对变量的修改，不会影响到另外一个闭包中的变量。

function outer() {
  var a = 1;
  var b = 1;
  return function(){
    a++;
    console.log('a=', a);
    console.log('b=', b);
  }
}

var inner1 = outer();
var inner2 = outer();

inner1();
inner2(); // 这2个闭包的调用不会相互影响，虽然函数的词法作用域相同，但是执行作用域不同，outer函数执行了2次，创建了2次独立的执行环境活动对象，分别被inner1还有inner2引用。



// 闭包特点3 闭包将产生新的函数作用域


// 闭包在循环中被创建，但他们共享了同一个词法作用域，在这个作用域中存在一个变量c。
// 这是因为变量c使用var进行声明，由于变量提升，所以具有函数作用域。
// 当res里面保存的函数执行时，c的值被决定。由于循环在事件触发之前早已执行完毕，变量对象c等于10。
function outer2() {
  let res = [];
  let a = 0;
  for(var i = 0 ; i < 10 ; i++) {
    a++;
    var c = a;
    res[i] = function() {
      console.log(c);
    };
  }
  return res;
}


let res21 = outer2();

res21[0]();res21[1]();res21[2]();





// 使用闭包1： 使用匿名闭包立即执行 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closure
function outer4() {
  let res = [];
  let a = 0;
  for(var i = 0 ; i < 10 ; i++) {
    a++;
    var c = a;
    res[i] = function() {
      return c;
    }();
  }
  return res;
}


let res41 = outer4();

console.log(res41);

// 使用闭包2： 使用新的函数创建新的词法作用域

function outer5() {
  let res = [];
  let a = 0;
  for(var i = 0 ; i < 10 ; i++) {
    a++;
    var c = a;
    res[i] = showNum(c);
  }
  return res;
}

function showNum(num) {
  return function() {
    console.log(num);
  }
}

let res51 = outer5();

res51[0]();res51[1]();res51[2]();

// 由于性能问题应减少闭包的使用，使用let创建块级作用域，绑定了块作用域的变量，这意味着不再需要额外的闭包

function outer3() {
  let res = [];
  let a = 0;
  for(var i = 0 ; i < 10 ; i++) {
    a++;
    let c = a;
    res[i] = function() {
      console.log(c);
    };
  }
  return res;
}


let res31 = outer3();

res31[0]();res31[1]();res31[2]();


