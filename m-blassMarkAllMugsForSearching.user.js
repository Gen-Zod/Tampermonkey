// ==UserScript==
// @name            m-blass Check all not owned mugs as searching for
// @namespace       
// @version			0.2
// @description		Marks all the mugs you don't have as searching for. Don't forget to click to save ;)
// @homepageURL     https://github.com/Gen-Zod/Tampermonkey/blob/master/m-blassMarkAllMugsForSearching.user.js
// @supportURL      https://github.com/Gen-Zod/Tampermonkey/blob/master/m-blassMarkAllMugsForSearching.user.js
// @updateURL       https://github.com/Gen-Zod/Tampermonkey/raw/master/m-blassMarkAllMugsForSearching.user.js
// @downloadURL     https://github.com/Gen-Zod/Tampermonkey/raw/master/m-blassMarkAllMugsForSearching.user.js
// @author			Manuel Bissinger
// @match			http://mugs.m-blass.de/bestand.php
// @grant			none
// @require			http://code.jquery.com/jquery-latest.js
// @run-at          document-end
// ==/UserScript==


$(document).ready(function(){
  $('tr').each(function () { 
    if($(this).children('td:nth-child(4)').children('input').prop("checked")==false) {  // checks if the "owns"-checkbox is checked and if not
      $(this).children('td:nth-child(6)').children('input').prop("checked", true);    // mark the "searching"-checkbox as checked
    }
  });
  $('tr>td:nth-child(4)>input').click(function() {
    if($(this).prop("checked")==true) {
      var t1=$(this).parent().nextAll().eq(1).children('input').prop({checked: false});
    } else {
      var t2=$(this).parent().nextAll().eq(1).children('input').prop({checked: true});
    }
  });
  $('tr>td:nth-child(5)>input').click(function() {
    if($(this).prop("checked")==true) {
      var t1=$(this).parent().nextAll().eq(0).children('input').prop({checked: false});
    } else {
      var t2=$(this).parent().nextAll().eq(0).children('input').prop({checked: true});
    }
  });
});
