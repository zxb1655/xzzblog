(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"10a4":function(t,e,n){"use strict";var o=n("de10"),r=n.n(o);r.a},"57d2":function(t,e,n){"use strict";(function(t){n("7959");var e=u(n("66fd")),o=u(n("6acc")),r=u(n("075d"));function u(t){return t&&t.__esModule?t:{default:t}}function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function a(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){i(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}wx.__webpack_require_UNI_MP_PLUGIN__=n,e.default.prototype.$request=r.default;var f=function(){n.e("colorui/components/cu-custom").then(function(){return resolve(n("bc14"))}.bind(null,n)).catch(n.oe)};e.default.component("cu-custom",f),e.default.config.productionTip=!1,o.default.mpType="app";var l=new e.default(a({},o.default));t(l).$mount()}).call(this,n("543d")["createApp"])},"6acc":function(t,e,n){"use strict";n.r(e);var o=n("b768");for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n("10a4");var u,c,a,i,f=n("f0c5"),l=Object(f["a"])(o["default"],u,c,!1,null,null,null,!1,a,i);e["default"]=l.exports},"9c17":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=r(n("66fd"));function r(t){return t&&t.__esModule?t:{default:t}}var u={onLaunch:function(){t.getSystemInfo({success:function(t){o.default.prototype.StatusBar=t.statusBarHeight;var e=wx.getMenuButtonBoundingClientRect();o.default.prototype.Custom=e,o.default.prototype.CustomBar=e.bottom+e.top-t.statusBarHeight}})},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")}};e.default=u}).call(this,n("543d")["default"])},b768:function(t,e,n){"use strict";n.r(e);var o=n("9c17"),r=n.n(o);for(var u in o)"default"!==u&&function(t){n.d(e,t,(function(){return o[t]}))}(u);e["default"]=r.a},de10:function(t,e,n){}},[["57d2","common/runtime","common/vendor"]]]);