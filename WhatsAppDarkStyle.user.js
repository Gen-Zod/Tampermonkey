// ==UserScript==
// @name         WhatsApp Dark Style
// @namespace    
// @version      0.2
// @description  Darker Style for WhatsApp website
// @author       Manuel Bissinger
// @match        https://web.whatsapp.com/
// @homepageURL   https://github.com/Gen-Zod/Tampermonkey/blob/master/WhatsAppDarkStyle.user.js
// @supportURL    https://github.com/Gen-Zod/Tampermonkey/blob/master/WhatsAppDarkStyle.user.js
// @updateURL     https://github.com/Gen-Zod/Tampermonkey/raw/master/WhatsAppDarkStyle.user.js
// @downloadURL   https://github.com/Gen-Zod/Tampermonkey/raw/master/WhatsAppDarkStyle.user.js
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
function addGlobalHTML(element,attr,val) {
    var elem = document.getElementsByClassName(element)[0];
    var att = document.createAttribute(attr);
    att.value = val;
    elem.setAttributeNode(att);
}

addGlobalStyle('.app-wrapper { background-color: #111 !important; }');
addGlobalStyle('.app-wrapper::before { background-color: #000 !important; }');
addGlobalStyle('.drawer-header { background-color: #069 !important; }');
addGlobalStyle('.pane-header { background-color: #222 !important; }');
addGlobalStyle('.pane-chat-body { background-color: #222 !important; }');
//addGlobalHTML('.input-search','class','autofocus');
