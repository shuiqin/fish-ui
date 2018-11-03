/**
 * Created by shuiqin on 10/30/18.
 */
function tmpl(str, obj) {
  if (typeof str === 'string') {
    return str.replace(/<%=\s*([^%>]+)\s*%>/g, function () {
      var key = arguments[1];
      console.log('key', key);
      return obj[key];
    });
  }
}

function tmpl1(str, obj) {
  if (typeof str === 'string') {
    return str.replace(/{\s*([^}]+)\s*}/g, function () {
      var key = arguments[1];
      console.log("arguments:" + JSON.stringify(arguments) );
      /*
      * arguments:{"0":"{TEST}","1":"TEST","2":8,"3":"HELLP , {TEST} {NAME}"}
       arguments:{"0":"{NAME}","1":"NAME","2":15,"3":"HELLP , {TEST} {NAME}"}
       * */
      console.log('key', key);
      return obj[key];
    });
  }
}


var str1 = "HELLP , <%= TEST%> <%= NAME%>"

var obj1 = {TEST:'FS',NAME:'UII'};

tmpl(str1, obj1);

var str2 = "HELLP , {TEST} {NAME}"

var obj2 = {TEST:'FS1',NAME:'U21II'};

tmpl1(str2, obj2);