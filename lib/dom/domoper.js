/**
 * Created by shuiqin on 11/3/18.
 */

/*获取页面dom所有的节点类型 并去重*/
function getAllNodes(elem) {
  var nodeArrs = new Set();
  var nodes = elem.querySelectorAll('*');
  for (var i = 0; i < nodes.length; i++){
    nodeArrs.add(nodes[i].localName);
  }
  return nodeArrs;
}