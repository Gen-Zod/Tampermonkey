// ==UserScript==
// @name          Facebook Dark Style
// @namespace     
// @version       0.1.1
// @description   Darker Style for Facebook
// @author        Manuel Bissinger
// @match         https://www.facebook.com/*
// @homepageURL   https://github.com/r4v3n50u1/Tampermonkey/blob/master/FacebookDarkStyle.user.js
// @supportURL    https://github.com/r4v3n50u1/Tampermonkey/blob/master/FacebookDarkStyle.user.js
// @updateURL     https://github.com/r4v3n50u1/Tampermonkey/raw/master/FacebookDarkStyle.user.js
// @downloadURL   https://github.com/r4v3n50u1/Tampermonkey/raw/master/FacebookDarkStyle.user.js
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

addGlobalStyle('body { background-color: #111; }');
addGlobalStyle('#blueBarNAXAnchor, .titlebar { background-color: black !important; background-image: none !important; border: thin solid black !important;}');
