/**
 * Created by shuiqin on 11/5/18.
 */
public int max_subarray(int[] A){
  max_ending_here = max_so_far = A[0];
  for(int n = 1; n < A.length; n++){
    max_ending_here = Math.max(max_ending_here + A[n], A[n]);
    max_so_far = Math.max(max_ending_here, max_so_far);
  }
  return max_so_far;
}


/*求数组最大数列和**/

  //max_subarray([-5, 1,-2,3])
function max_subarray(arr) {
  let max_ending_here , max_so_far;
  let start, end, start_here, end_here;
  max_ending_here = max_so_far = arr[0];
  start = end = 0;

  for(let j = 1; j < arr.length; j++){

    // + *
    let result = max_ending_here + arr[j];
    if ( result < arr[j]) {
      start_here = j;
      end_here = j;
      max_ending_here = arr[j];
    } else {
      max_ending_here = result;
      start_here = start;
      end_here = j;
    }

    if (max_ending_here > max_so_far) {
      start = start_here;
      end = end_here;
      max_so_far = max_ending_here;
    }
    /*max_ending_here = Math.max(max_ending_here + arr[j], arr[j]);
    max_so_far = Math.max(max_ending_here, max_so_far);*/
  }
  console.log(start, end);
  console.log(arr);
  console.log(arr.slice(start, end+1));//截取数组1
  return max_so_far;
}

/**TODO 获取最大数列乘积 这个实现错误*/
//(6) [-2, 3, 1, 9, -2, -4]
function max_productarray(arr) {
  let ending_here , max_so_far;
  let start, end, start_here, end_here;
  ending_here = max_so_far = arr[0];
  start = end = 0;
  for( var i = 1 ; i< arr.length; i++){
    start_here = i;
    ending_here = arr[i];
    for (let j = i; j < arr.length; j++) {
      ending_here = ending_here * arr[j];
      console.log("ending_here:" , ending_here);
      console.log("max_so_far:" , max_so_far);

      if (max_so_far < ending_here) {
        max_so_far =  ending_here;
        start = start_here;
        end = j;
      }
    }
  }
  console.log(start, end);
  console.log(arr);
  console.log(arr.slice(start, end+1));//截取数组1
  return max_so_far;
}