/**
 * Created by shuiqin on 11/14/18.
 */
/**
 * 精确到指定位数的小数
 * @param {double}  非整数
 * @param {number} 保留小数位数
 * */
const round = (n, decimals = 0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);


/**
 * 删选值为true
 * @param {arr} 数组
 * */
const compact = arr => arr.filter(Boolean);


/**
 * 数字补0操作
 * @param {num} 数字
 * @param {len} 数字保留最多位数
 * */
const addZero1 = (num, len = 2) => (`0${num}`).slice(-len);
const addZero2 = (num, len = 2) => (`${num}`).padStart(len, '0');

/**
 * 计算数组重复的项及个数
 * @param {arrs}
 * @return {object}
 * */
const  countObjProp = (arrs) => {
  return arrs.reduce(function (obj, name) {
    obj[name] = obj[name]? ++obj[name]: 1;
    return obj;
  },{});
}

/**
 * 战平数组
 * */
const flatten = (arr, depth = 1) =>
depth != 1
  ? arr.reduce((a, v) => a.concat(Array.isArray(v) ? flatten(v, depth - 1) : v), [])
: arr.reduce((a, v) => a.concat(v), []);



