/**
 * Created by shuiqin on 10/31/18.
 */
var a = 100;

function fn() {
  a = 1000;
  console.log(a);
  var a = 10;
  console.log(a);
}

fn();
console.log(a);