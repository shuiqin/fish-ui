// plugin.js
;(function(undefined) {
  "use strict"
  var _global;

  function Dialog(opt){
    this._initial(opt);
  }
  Dialog.prototype = {
    constructor: this,
    props:{
      templateId:"", //用户可以自定义整个模版 optional 若设置templateId需同时设置confirmClassName, cancelClassName, bodyClassName, closeClassName
      open: false, // optional : control the dialog is opened or not
      comfirm_txt: '确定',
      confirmClassName:'btn-ok', //required: in templateId param mode
      cancel: false,
      cancel_txt: '取消',
      cancelClassName:'btn-cancel',//required: in templateId param mode
      modal: false, // force to click the close btn to hide the dialog. click outside the dialog will not trigger the onrequestClose
      title:'Dialog',// the title of the dialog
      titleClassName:'dialog-title',
      titleStyle:'',
      bodyStyle:'',
      bodyClassName:'dialog-box',//required: in templateId param mode
      content: '', // dialog content
      contentStyle:'',
      contentClassName:'dialog-body',
      overlayStyle:'',
      overlayClassName:'dialog-container',
      closeText:'×',
      closeClassName:'close', //required: in templateId param mode
      closeStyle:'',
      confirm: function () {},
      close: function () {},
      cancle: function () {}
    },
    _initial: function(opt) {
      this.props = extend(this.props,opt,true); //配置参数
      this.tpl = this._parseTpl(this.props.templateId);
      this.dom = this._parseToDom(this.tpl)[0]; //存放在实例中的节点
      this.hasDom = false; //检查dom树中dialog的节点是否存在
      this.listeners = []; //自定义事件，用于监听插件的用户交互
      this.handlers = {};
      this.props.open ? this.show(): void 0;
    },
    _parseTpl: function(templateId) {
      var data = this.props;
      var tplStr = ` <div class="<% this.overlayClassName %>" style="<% this.overlayStyle %>">
        <div class="<% this.bodyClassName %>" style="<% this.bodyStyle %>">
            <span class="<%this.closeClassName%>" style="<% this.closeStyle %>"><% this.closeText %></span>
            <div class="<% this.titleClassName %>" style="<% this.titleStyle %>"><% this.title %></div>

            <div class="<% this.contentClassName %>" style="<% this.contentStyle %>">
                <% this.content %>
            </div>
            <div class="footer">
                <% if(this.cancel){ %>
                <span class="btn <% this.confirmClassName %>"><% this.comfirm_txt %></span>
                <span class="btn <% this.cancelClassName %>"><% this.cancel_txt %></span>
                <% } else{ %>
                <span class="btn <% this.confirmClassName %>" style="width: 100%"><% this.ok_txt %></span>
                <% } %>
            </div>
        </div>
      </div>`;
      if(!!templateId){
        tplStr = document.getElementById(templateId).innerHTML.trim();
      } else {
        tplStr = tplStr.trim();
      }
      return templateEngine(tplStr,data);
  },
    _parseToDom: function(str) { // 将字符串转为dom
      var div = document.createElement('div');
      if(typeof str == 'string') {
        div.innerHTML = str;
      }
      return div.childNodes;
    },
    show: function(callback){
      var _this = this;
      if(this.hasDom) return ;
      if(this.listeners.indexOf('show') > -1) {
        if(!this.emit({type:'show',target: this.dom})) return ;
      }
      document.body.appendChild(this.dom);
      this.hasDom = true;
      this.dom.onclick = function (event) {
        if(!_this.props.modal) {
          return _this.onrequestClose('close', event, this);
        }
      };
      this.dom.getElementsByClass(this.props.bodyClassName)[0].onclick = function (e) {
        event.stopPropagation();
        return false;
      };
      this.dom.getElementsByClass(this.props.closeClassName)[0].onclick = function(event){
        return _this.onrequestClose('close', event, this);

      };
      this.dom.getElementsByClass(_this.props.confirmClassName)[0].onclick = function(event){
        return _this.onrequestClose('confirm', event, this);
      };
      if(this.props.cancel){
        this.dom.getElementsByClass(this.props.cancelClassName)[0].onclick = function(event){
          return _this.onrequestClose('cancle', event, this);
        };
      }
      callback && callback();
      if(this.listeners.indexOf('shown') > -1) {
        this.emit({type:'shown',target: this.dom})
      }
      return this;
    },
    onrequestClose: function (type, event, context, callback) {
      this.hide();
      if(this.listeners.indexOf(type) > -1) {
        this.emit({type:type,target: this.dom})
      }
      !!this.props[type] && this.props[type].call(context,this.dom);
      event.stopPropagation();
      return false;
    },
    hide: function(callback){
      if(this.listeners.indexOf('hide') > -1) {
        if(!this.emit({type:'hide',target: this.dom})) return ;
      }
      document.body.removeChild(this.dom);
      this.hasDom = false;
      callback && callback();
      if(this.listeners.indexOf('hidden') > -1) {
        this.emit({type:'hidden',target: this.dom})
      }
      return this;
    },
    modifyTpl: function(template){
      if(!!template) {
        if(typeof template == 'string'){
          this.tpl = template;
        } else if(typeof template == 'function'){
          this.tpl = template();
        } else {
          return this;
        }
      }
      this.dom = this._parseToDom(this.tpl)[0];
      return this;
    },
    css: function(styleObj){
      for(var prop in styleObj){
        var attr = prop.replace(/[A-Z]/g,function(word){
          return '-' + word.toLowerCase();
        });
        this.dom.style[attr] = styleObj[prop];
      }
      return this;
    },
    width: function(val){
      this.dom.style.width = val + 'px';
      return this;
    },
    height: function(val){
      this.dom.style.height = val + 'px';
      return this;
    },

    on: function(type, handler){
      // type: show, shown, hide, hidden, close, confirm
      if(typeof this.handlers[type] === 'undefined') {
        this.handlers[type] = [];
      }
      this.listeners.push(type);
      this.handlers[type].push(handler);
      return this;
    },
    off: function(type, handler){
      if(this.handlers[type] instanceof Array) {
        var handlers = this.handlers[type];
        for(var i = 0, len = handlers.length; i < len; i++) {
          if(handlers[i] === handler) {
            break;
          }
        }
        this.listeners.splice(i, 1);
        handlers.splice(i, 1);
        return this;
      }
    },
    emit: function(event){
      if(!event.target) {
        event.target = this;
      }
      if(this.handlers[event.type] instanceof Array) {
        var handlers = this.handlers[event.type];
        for(var i = 0, len = handlers.length; i < len; i++) {
          handlers[i](event);
          return true;
        }
      }
      return false;
    }
  }
  
  // 工具函数
  // 对象合并
  function extend(o,n,override) {
    for(var key in n){
      if(n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)){
        o[key]=n[key];
      }
    }
    return o;
  }
  // 自定义模板引擎
  function templateEngine(html, data) {
    var re = /<%([^%>]+)?%>/g,
      reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
      code = 'var r=[];\n',
      cursor = 0;
    var match;
    var add = function(line, js) {
      js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
        (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
      return add;
    }
    while (match = re.exec(html)) {
      add(html.slice(cursor, match.index))(match[1], true);
      cursor = match.index + match[0].length;
    }
    add(html.substr(cursor, html.length - cursor));
    code += 'return r.join("");';
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
  }
  // 通过class查找dom
  if(!('getElementsByClass' in HTMLElement)){
    HTMLElement.prototype.getElementsByClass = function(n){
      var el = [],
        _el = this.getElementsByTagName('*');
      for (var i=0; i<_el.length; i++ ) {
        if (!!_el[i].className && (typeof _el[i].className == 'string') && _el[i].className.indexOf(n) > -1 ) {
          el[el.length] = _el[i];
        }
      }
      return el;
    };
    ((typeof HTMLDocument !== 'undefined') ? HTMLDocument : Document).prototype.getElementsByClass = HTMLElement.prototype.getElementsByClass;
  }


  // 暴露给全局对象
  _global = (function(){return this || (0,eval)('this');}())
  if (typeof module !== "undefined" && module.exports){
    module.exports = Dialog;
  } else if (typeof define === "function" && defined.amd){
    define(function(){return Dialog});
  } else {
    !('Dialog' in _global) && (_global.Dialog = Dialog);
  }
}());