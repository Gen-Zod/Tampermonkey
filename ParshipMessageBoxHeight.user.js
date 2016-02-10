// ==UserScript==
// @name         Parship Message Box Height
// @namespace    
// @version      0.2
// @description  Increases the height of the message box at Parship
// @author       Manuel Bissinger
// @match        https://www.parship.de/messaging/writemessage/text?*
// @homepageURL   https://github.com/r4v3n50u1/Tampermonkey/blob/master/ParshipMessageBoxHeight.user.js
// @supportURL    https://github.com/r4v3n50u1/Tampermonkey/blob/master/ParshipMessageBoxHeight.user.js
// @updateURL     https://github.com/r4v3n50u1/Tampermonkey/raw/master/ParshipMessageBoxHeight.user.js
// @downloadURL   https://github.com/r4v3n50u1/Tampermonkey/raw/master/ParshipMessageBoxHeight.user.js
// @grant         none
// @require			http://code.jquery.com/jquery-latest.js
// @run-at        document-end
// ==/UserScript==

$('#ps_writeMessage').css('height', '35em');
