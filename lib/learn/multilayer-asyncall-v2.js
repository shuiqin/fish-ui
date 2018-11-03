/**
 * Created by shuiqin on 10/31/18.
 */
// 2, 通过promise处理异步
const fs = require("fs");

function readFile(url) {
  return new Promise((resolve,reject)=>{
      fs.readFile(url,(err,data)=>{
      if(err) reject(err);
else{
    resolve(data.toString());
  }
})
})

}


readFile(__dirname + "/dadav1.js").then(data=>{
  console.log(data);
console.log("dsjkds");
return readFile(__dirname +  "/promise-call.js");
}).catch(err=>{
  console.log(err);
}).then(data=>{
  console.log(data);
}).catch(err=> {
  console.log(err);
});