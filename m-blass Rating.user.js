// ==UserScript==
// @name            m-blass Starbucks city mug star rating and direct mail
// @namespace       
// @version			0.3
// @description		Adds a star rating to Starbucks mugs, a user-collection-link-icon and the mail addresses get a mailto-Link
// @homepageURL     https://github.com/Gen-Zod/Tampermonkey/blob/master/m-blass%20Rating.user.js
// @supportURL      https://github.com/Gen-Zod/Tampermonkey/blob/master/m-blass%20Rating.user.js
// @updateURL       https://github.com/Gen-Zod/Tampermonkey/raw/master/m-blass%20Rating.user.js
// @downloadURL     https://github.com/Gen-Zod/Tampermonkey/raw/master/m-blass%20Rating.user.js
// @author			Manuel Bissinger
// @match			http://mugs.m-blass.de/*
// @grant			none
// @require			http://code.jquery.com/jquery-latest.js
// @run-at          document-end
// ==/UserScript==

// add function to repeat string num times
String.prototype.repeat = function( num )
{
    return new Array( num + 1 ).join( this );
}

$(document).ready(function(){
    var $regex = new RegExp("^[A-Z]+\\s?[A-Z]*\\s*[A-Z]*\\s{1}\\-{1}\\s{1}(\\w*\\.*\\s?\\w*\\s*\\w*)$"); 
    var a_rateCities = [];
    
    //get the rare cities from http://mugs.m-blass.de/htf.php and store it in an array for later use
    $.ajax({
        url: "http://mugs.m-blass.de/htf.php", 
        dataType: "text",
        async: false,
        success: function(data) {
        var $page = $(data);
        var $lists = $page.find('.dritte:lt(4)');
        var $x = 1;
        var $a_cities = [];
        $lists.each(function() {
            var $line = $(this).parent().nextAll().children('td[valign="top"]');
            $a_cities[$x] = [];
            $line.each(function() {
                var $city_line = $(this).text();
                if($city_line.match($regex)) { 
                    var $city=$city_line.replace($regex, "\$1");
                    $a_cities[$x].push($city);
                }
            });
            $x++;
        });    
        a_rateCities = $a_cities.reverse(); // reverse the array from Impossible->Uncommon to Uncommon->Impossible for better star ranking
    }
    });

    var v_ratingString = ""; // rating string will be set inside the switch-case
    var v_ratingStar = '<img src="http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/16/Actions-rating-icon.png" width="12" height="12" />';

    var v_cityRegex = ""; // RegEx will be set inside the loop
    var v_mailRegex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$';
    var v_mailAddress = ""; // mail address will be set inside the loop
    var v_mailSubject = "Starbucks Mug Trading Request";
    var v_mailBody = ""; // mail body will be set inside the loop, because it'll be contain the nickname of a user
    var v_nickname = ""; // nickname will be set inside the loop
    var v_tdString = ""; // String of a td-element will be set inside the loop

    // iterate through all the td-Elements
    $('td').each(function() {
        v_tdString = $(this).text(); // get the string from a td-Element
        if(v_tdString.match(v_mailRegex)!=null) { // check if it's a mail address
            v_mailAddress = v_tdString; // store mail address in variable (for readability of code)
            v_nickname = $(this).prev().text(); //get the nickname for the mail address
            v_mailBody = 'Hi ' + v_nickname + ',\n\n';
            // change the mail td string to a mailto-link
            $(this).html('<a href="mailto:' + v_mailAddress + '?subject=' + v_mailSubject + '&body=' + v_mailBody + '" target="_blank" style="background-color: transparent;">' + v_mailAddress + '</a>');
            // add an icon-link to the mug collection of the user next to the nickname
            $(this).prev().append('<a href="http://mugs.m-blass.de/collection.php?nickname=' + v_nickname + '" target="_blank" style="float: right; margin-right: 50%; background-color: transparent;" title="Collection of ' + v_nickname + '"><img src="http://icons.iconarchive.com/icons/custom-icon-design/mono-business-2/16/coffee-icon.png" width="12" height="12" /></a>');
        }

        // iterate through the city arrays
        for(i=0; i<4; i++) {
            var k = i+1;
            // Translate ranking number to string (german and english)
            switch(k) {
                case 1:
                    v_ratingString = "Selten / uncommon"
                    break;
                case 2:
                    v_ratingString = "Rar / rare"
                    break;
                case 3:
                    v_ratingString = "Sehr rar / very rare"
                    break;
                case 4:
                    v_ratingString = "Unmöglich / impossible"
                    break;
                default:
                    v_ratingString = ""
            }
            // iterate through each city
            StopCitySearch: for(var v_city in a_rateCities[i]) {
                v_cityRegex = '^' + v_city + '\\s*$'; // RegEx to find city in text
                if($(this).text().match(v_cityRegex)!=null) {
                    //Add star icons to city
                    $(this).append(' <span title="' + v_ratingString + '">' + v_ratingStar.repeat(k) + '</span>');
                    break StopCitySearch;
                }
            }
        }
    });
});
