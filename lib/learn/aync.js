/**
 * Created by shuiqin on 10/31/18.
 */
async function timeout() {
  console.log('hlll');
  throw 'my god, failure';
  return 'hello world';
}
//console.log(timeout());

timeout().then(result=>{
  console.log(result);
}).catch (err=>{
  console.log(err);
});
console.log('虽然在后面，但是我先执行');

function doubleAfter2seconds(num) {
  return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        resolve(2 * num);
      }, 2000);
    });
}

function getResult(){
  let result = doubleAfter2seconds(4);
  console.log("result:" + result);
}

async function getResult2(){
  let result = await doubleAfter2seconds(4);
  console.log("result33:" + result);
}


getResult();
getResult2();
/*
* result:[object Promise]
 my god, failure
 result33:8
* */

async function testResult() {
  let first = await doubleAfter2seconds(30);
  let second = await doubleAfter2seconds(50);
  let third = await doubleAfter2seconds(30);
  console.log(first + second + third);
}

testResult();