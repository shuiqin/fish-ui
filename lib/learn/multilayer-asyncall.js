/**
 * Created by shuiqin on 10/31/18.
 */
const fs = require("fs");

//第一种的常用的回调函数，本身没有什么问题，但是问题是出现多个回调函数的嵌套式时，会形成回调地狱，既不利于读也不利于管理
function fn() {
  fs.readFile(__dirname + '/dadav1.js',(err,data)=>{
    if(err){
      return err;
    }else{
      console.log(data.toString());
  fs.readFile(__dirname + '/promise-call.js',(err,data)=>{
    if(err){
      return err;
    }else{
      console.log(data.toString());
}
});
}
});
}
console.log("fdsf11")

fn();
console.log("fdsf")

