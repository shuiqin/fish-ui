/**
 * Created by shuiqin on 11/20/18.
 */

/**旧式数组插入*/
var LIMIT = 10000000;
var arr = new Array(LIMIT);
console.time("Array insertion time");
for(var i = 0; i < LIMIT; i++){
  arr[i] = i;
}
console.timeEnd("Array insertion time");


/**TypedArray 插入*/
var buffer = new ArrayBuffer(LIMIT * 4);//buffer直接操作内存 一个元素4个字节
var arr = new Int32Array(buffer);


console.time("ArrayBuffer insertion time");
for(var i = 0; i < LIMIT; i++){
  arr[i] = i;
}
console.timeEnd("ArrayBuffer insertion time");
/**
 *
 * Array insertion time: 28.8369140625ms
 VM399:19 ArrayBuffer insertion time: 25.88916015625ms

 注: 差值并不多 现代浏览器对同质数组做了优化 转成了内存连续的数组
 * */



/**旧式数组插入 异构数组插入 链式实现 性能低*/
var LIMIT = 10000000;
var arr = new Array(LIMIT);
arr.push({"arr":1});
console.time("Array insertion time");
for(var i = 0; i < LIMIT; i++){
  arr[i] = i;
}
console.timeEnd("Array insertion time");
// Array insertion time: 906.23681640625ms
