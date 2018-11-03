/**
 * Created by shuiqin on 10/31/18.
 */
const fs = require('fs');
//3,使用generator处理回调
function generatorFile(url) {
  fs.readFile(url,(err,data)=>{
    if(err) return err;
else{
    console.log(data.toString());
    gen.next();
  }
})
}

function* generatorRead() {
  yield generatorFile(__dirname + "/dadav1.js");
  yield generatorFile(__dirname + "/promise-call.js");
}

var gen = generatorRead();
gen.next();
