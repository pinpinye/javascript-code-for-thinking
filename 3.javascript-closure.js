
// 闭包是由函数以及创建该函数的词法环境组合而成,这个环境包含了这个闭包创建时所能访问的所有局部变量。通过改变这个局部变量的值，会改变这个闭包的词法环境。
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

// 然而在一个闭包内对变量的修改，不会影响到另外一个闭包中的变量。



// 闭包在循环中被创建，但他们共享了同一个词法作用域，在这个作用域中存在一个变量item。
// 这是因为变量item使用var进行声明，由于变量提升，所以具有函数作用域。
// 当onfocus的回调执行时，item.help的值被决定。由于循环在事件触发之前早已执行完毕，变量对象item（被三个闭包所共享）已经指向了helpText的最后一项。

function showHelp(help) {
  document.getElementById('help').innerHTML = help;
}

function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i];
    document.getElementById(item.id).onfocus = function() {
      showHelp(item.help);
    }
  }
}

setupHelp(); 

// 使用闭包创建新的词法作用域

// 匿名闭包立即执行 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closure

// 使用let减少闭包，创建块级作用域，绑定了块作用域的变量，这意味着不再需要额外的闭包
