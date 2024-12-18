"use strict";

/*------------- AOS Initialization -------------*/
AOS.init({
    duration: 1100
});

/*------------- Start of Async Drift Code -------------*/
!function() {
    var t = window.driftt = window.drift = window.driftt || [];
    if (!t.init) {
        if (t.invoked) return void (window.console && console.error && console.error("Drift snippet included twice."));
        t.invoked = !0, t.methods = [ "identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on" ], 
        t.factory = function(e) {
        return function() {
            var n = Array.prototype.slice.call(arguments);
            return n.unshift(e), t.push(n), t;
        };
        }, t.methods.forEach(function(e) {
        t[e] = t.factory(e);
        }), t.load = function(t) {
        var e = 3e5, n = Math.ceil(new Date() / e) * e, o = document.createElement("script");
        o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + n + "/" + t + ".js";
        var i = document.getElementsByTagName("script")[0];
        i.parentNode.insertBefore(o, i);
        };
    }
}();
drift.SNIPPET_VERSION = '0.3.1';
drift.load('sz2kpxvfxfff');
/*------------ End of Async Drift Code  ------------*/

/*------------ Toggle Mobile Menu  ------------*/
function toggleMenu() {
    const mobileMenu = document.getElementById("mobile-menu")

    const computedRight = window.getComputedStyle(mobileMenu).right;
    
    if(computedRight === "0px"){
        mobileMenu.style.right = "-100%"
    }else{
        mobileMenu.style.right = "0px"
    }
}