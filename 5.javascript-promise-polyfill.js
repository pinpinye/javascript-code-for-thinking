
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let index = 0;
    let result = [];
    if (promises.length === 0) {
      resolve(result);         
    } else {
      function processValue(i, data) {
        result[i] = data; 
        if (++index === promises.length) {
          resolve(result);
        }
      } 
      for (let i = 0; i < promises.length; i++) {
        // promises[i] 可能是普通值 
        Promise.resolve(promises[i]).then((data) => {
          processValue(i, data);
        }, (err) => {
          reject(err);
          return;
        }); 
      } 
    }  
  });
}
