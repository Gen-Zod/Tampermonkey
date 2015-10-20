// ==UserScript==
// @name         blog.fefe.de
// @namespace    http://your.homepage/
// @version      0.1
// @description  Dark Style for http://blog.fefe.de
// @author       Manuel Bissinger
// @match        http://blog.fefe.de/*
// @grant        none
// @homepageURL  https://github.com/Gen-Zod/Tampermonkey/blob/master/blog.fefe.de.user.js
// @supportURL   https://github.com/Gen-Zod/Tampermonkey/blob/master/blog.fefe.de.user.js
// @updateURL    https://github.com/Gen-Zod/Tampermonkey/raw/master/blog.fefe.de.user.js
// @downloadURL  https://github.com/Gen-Zod/Tampermonkey/raw/master/blog.fefe.de.user.js
// @run-at       document-end
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

addGlobalStyle('body { background-color: #222; font-family: sans-serif; font-size: medium; color: #eee; width: 960px; margin: 30px 25%; }');
addGlobalStyle('a { color: #eee; }');
addGlobalStyle('h2>a { color: #fff !important; }');
addGlobalStyle('li { line-height: 1.5em; background-color: #333; margin: 2px; border-radius: 5px; border: solid thin black; padding: 10px 15px; list-style: none; }');
addGlobalStyle('li>p { line-height: 1.5em; margin-left: 1.5em; }');
