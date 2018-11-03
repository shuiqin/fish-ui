/**
 * Created by shuiqin on 10/31/18.
 */
var obj = {
  count: 0,
  add: function () {
    !function () {
      setTimeout(()=>{
        console.log(this.count++)
      },0);
    }();
  }
}

obj.add(); // NaN