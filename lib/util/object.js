/*
测试数据
var tableArr = [
  {'name': 'shuiqin', 'id': 1, 'arr': [1,2,3]},
  {'name': 'shuiqin22', 'id': 2, 'arr': [1,2,3]}
]
*/

/**
deepcopy对象/数组
优点： 简便 一行代码搞定
缺点： 原型链的属性方法不能copy， 自己对象的方法也不能copy
*/
const deepcopySimple = (source, target = {}) => {
  target = JSON.parse(JSON.stringify(source))
  return target
}

/*
deepcopy 对象/数组
优点： 能
*/
const deepcopy = (source, target = {}) => {
  let target = Array.isArray(source) ? [] : {}
  for(var k in source) {
    if (source.hasOwnProperty(key)){
      if (typeof source[key] === 'object'){
        target[key] = deepcopy(source[key])
      } else {
        target[key] = source[key]
      }
    }
  } 
  return target;
}

/*
deepcopy对象/数组

*/

/*
shallowcopy
浅copy
*/
const shallowcopy = (source, target = {}) => {
  let key;
  for (key in source) {
    if (source.hasOwnProperty(key)) {
      target[key] = source[key];
    }
  }
  return target;
} 