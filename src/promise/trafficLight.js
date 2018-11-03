/**
 * Created by shuiqin on 10/26/18.
 */

function red() {
  console.log("red");
}

function green() {
  console.log('green');
}

function yellow() {
  console.log('yellow');
}

let light = ((timemer, cm)=>{
  return new Promise( (resolve, reject) => {
    setTimeout(()=>{
    cb();
    resolve();
  }, timmer);
  });
})
