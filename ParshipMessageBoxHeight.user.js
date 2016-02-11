// ==UserScript==
// @name         Parship Message Box Height
// @namespace    
// @version      0.3
// @description  Increases the height of the message box at Parship
// @author       Manuel Bissinger
// @match        https://www.parship.de/messaging/writemessage/text?*
// @homepageURL   https://github.com/r4v3n50u1/Tampermonkey/blob/master/ParshipMessageBoxHeight.user.js
// @supportURL    https://github.com/r4v3n50u1/Tampermonkey/blob/master/ParshipMessageBoxHeight.user.js
// @updateURL     https://github.com/r4v3n50u1/Tampermonkey/raw/master/ParshipMessageBoxHeight.user.js
// @downloadURL   https://github.com/r4v3n50u1/Tampermonkey/raw/master/ParshipMessageBoxHeight.user.js
// @grant         none
// @run-at        document-end
// ==/UserScript==

// since it doesn't work
//$('#ps_writeMessage').css('height', '35em');

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
/* not needed as yet
function addGlobalHTML(element,attr,val) {
    var elem = document.getElementsByClassName(element)[0];
    var att = document.createAttribute(attr);
    att.value = val;
    elem.setAttributeNode(att);
}
*/

addGlobalStyle('#ps_writeMessage { height: 35em !important; }');
