(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/feng-parse/components/wxParseVideo"],{"1f79":function(t,e,n){"use strict";n.r(e);var o=n("5b2b"),a=n.n(o);for(var u in o)"default"!==u&&function(t){n.d(e,t,(function(){return o[t]}))}(u);e["default"]=a.a},"5b2b":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"wxParseVideo",props:{node:{}},data:function(){return{playState:!0,videoStyle:"width: 100%;"}},methods:{play:function(){console.log("点击了video 播放"),this.playState=!this.playState}},mounted:function(){var e=this;t.$on("slideMenuShow",(function(t){console.log("捕获事件："+t),"show"==t&&e.playState&&(e.playState=!1)}))}};e.default=n}).call(this,n("543d")["default"])},"6ee2":function(t,e,n){"use strict";var o=n("efd5"),a=n.n(o);a.a},c47e:function(t,e,n){"use strict";n.r(e);var o=n("e3eb"),a=n("1f79");for(var u in a)"default"!==u&&function(t){n.d(e,t,(function(){return a[t]}))}(u);n("6ee2");var r,c=n("f0c5"),i=Object(c["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);e["default"]=i.exports},e3eb:function(t,e,n){"use strict";var o;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return o}));var a=function(){var t=this,e=t.$createElement;t._self._c},u=[]},efd5:function(t,e,n){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/feng-parse/components/wxParseVideo-create-component',
    {
        'components/feng-parse/components/wxParseVideo-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("c47e"))
        })
    },
    [['components/feng-parse/components/wxParseVideo-create-component']]
]);
