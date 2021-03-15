(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/typeWriter/typeWriter"],{"24fe":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r={data:function(){return{content:{name:""}}},mounted:function(){this.typeWrite()},methods:{typeWrite:function(){var t=this;this.$request("/info").then((function(n){var e=n.BlogName,r=0,u=setInterval((function(){var n=e.substring(0,r);r++,t.$set(t.content,"name",n),t.test=t.text,n.length==e.length&&clearInterval(u)}),200)}))}}};n.default=r},2749:function(t,n,e){"use strict";var r;e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return r}));var u=function(){var t=this,n=t.$createElement;t._self._c},a=[]},"5b10":function(t,n,e){"use strict";e.r(n);var r=e("24fe"),u=e.n(r);for(var a in r)"default"!==a&&function(t){e.d(n,t,(function(){return r[t]}))}(a);n["default"]=u.a},"64a6":function(t,n,e){"use strict";e.r(n);var r=e("2749"),u=e("5b10");for(var a in u)"default"!==a&&function(t){e.d(n,t,(function(){return u[t]}))}(a);var i,o=e("f0c5"),c=Object(o["a"])(u["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],i);n["default"]=c.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/typeWriter/typeWriter-create-component',
    {
        'components/typeWriter/typeWriter-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("64a6"))
        })
    },
    [['components/typeWriter/typeWriter-create-component']]
]);
