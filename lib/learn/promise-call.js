/**
 * Created by shuiqin on 10/31/18.
 * 多层异步回调问题
 * setState()输出1,2,3,4,5 可以使用promise解决多层异步回调  
 */
function timeout1() {
  return new Promise(function(res, rej) {
    console.log(Date.now() + " start timeout1");
    setTimeout(res);
    //setTimeout(res, 2000);
  });
}

function timeout2() {
  return new Promise(function(res, rej) {
    console.log(Date.now() + " start timeout2");
    setTimeout(res);
    //setTimeout(res, 3000);
  });
}

function timeout3() {
  return new Promise(function(res, rej) {
    console.log(Date.now() + " start timeout3");
    setTimeout(res);
    //setTimeout(res, 4000);
  });
}

function timeout4() {
  return new Promise(function(res, rej) {
    console.log(Date.now() + " start timeout4");
    setTimeout(res);
    //setTimeout(res, 5000);
  });
}

timeout1()
  .then(timeout2)
  .then(timeout3)
  .then(timeout4)
  .then(function() {
    console.log(Date.now() + " timout4 callback");
  });




function fn1(resolve, reject) {
  setTimeout(function() {
    console.log('步骤一：执行');
    resolve('1');
  },500);
}

function fn2(resolve, reject) {
  setTimeout(function() {
    console.log('步骤二：执行');
    resolve('2');
  },100);
}

new Promise(fn1).then(function(val){
  console.log(val);
  return new Promise(fn2);
}).then(function(val){
  console.log(val);
  return 33;
}).then(function(val){
  console.log(val);
});