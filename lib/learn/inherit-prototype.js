/**
 * Created by shuiqin on 10/31/18.
 */
function Parent() {
  this.name = 'Parent';
  this.say = function () {
    console.log(this.name);
  }
  this.setName = function (name) {
    this.name = name;
  }
}

function Child(name, childprop) {
  this.childprop = childprop;//强调私有 不共享
  if(!!name){
    this.name = name;
  }
}

Child.prototype = new Parent();
var child1 = new Child("shuiqin", "childprop1");
child1.say = function () {
  console.log("hello " + this.name);
}

var child2 = new Child(null, "childprop2");
child1.say();
child2.say();

var child3 = new Child(null, "childprop3");
child3.say();

child2.setName('jjj');
child2.say();
child3.say();


/**  原型链的方法所有对象公用 原型对象只有1份
child1.say == new Child().say
false
child2.say == new Child().say
true
 **/