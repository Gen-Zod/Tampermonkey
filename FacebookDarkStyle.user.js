// ==UserScript==
// @name          Facebook Dark Style
// @namespace     
// @version       0.1
// @description   Darker Style for Facebook
// @author        Manuel Bissinger
// @match         https://www.facebook.com/*
// @homepageURL   https://github.com/Gen-Zod/Tampermonkey/blob/master/m-blass%20Rating.user.js
// @supportURL    https://github.com/Gen-Zod/Tampermonkey/blob/master/m-blass%20Rating.user.js
// @updateURL     https://github.com/Gen-Zod/Tampermonkey/raw/master/m-blass%20Rating.user.js
// @downloadURL   https://github.com/Gen-Zod/Tampermonkey/raw/master/m-blass%20Rating.user.js
// @grant         none
// @run-at        document-end
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('._5vb_, ._5vb_ #contentCol { background-color: #333 !important; }');
addGlobalStyle('._5vb_.hasLeftCol #leftCol { background-color: #eee !important; }');
addGlobalStyle('#blueBarNAXAnchor, .titlebar { background-color: black !important; background-image: none !important; border: thin solid black !important;}');
