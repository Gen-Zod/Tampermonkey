// ==UserScript==
// @name         ebay Kleinanzeigen Starbucks mug ranking
// @namespace    
// @version      0.1
// @description  Adds a Star ranking to rare or uncommon Starbucks mugs on ebay Kleinanzeigen. 
// @author       r4v3n50u1
// @match        http://www.ebay-kleinanzeigen.de/*
// @homepageURL   https://github.com/r4v3n50u1/Tampermonkey/blob/master/ebayKAStarbucksRanking.user.js
// @supportURL    https://github.com/r4v3n50u1/Tampermonkey/blob/master/ebayKAStarbucksRanking.user.js
// @updateURL     https://github.com/r4v3n50u1/Tampermonkey/raw/master/ebayKAStarbucksRanking.user.js
// @downloadURL   https://github.com/r4v3n50u1/Tampermonkey/raw/master/ebayKAStarbucksRanking.user.js
// @contributor   http://mugs.m-blass.de/htf.php
// @grant        none
// @require			http://code.jquery.com/jquery-latest.js
// ==/UserScript==

// add function to repeat string num times
String.prototype.repeat = function( num )
{
    return new Array( num + 1 ).join( this );
}
$(document).ready(function(){
    // arrays of cities; array number is equal to commonness of a city mug (1 = uncommon to 4 = impossible to find)
    var a_rateCities = new Array();
    // list of cities are from http://mugs.m-blass.de/htf.php
    a_rateCities[1] = ["Banff","Calgary","Canada","Edmonton","Montreal","Niagara Falls","Quebec","Toronto","Vancouver","Vancouver Island","Whistler","Oktoberfest I","Bali","Indonesia","Jakarta","Osaka","Tokyo","Kuala Lumpur","Penang","Sabah","Makati","Manila I","St. Petersburg I","Singapore I","Singapore II","Korea","Seoul","Alaska","Arizona","Atlanta","Austin","Boston","California","Charlotte","Chicago","Colorado","Dallas","Denver","Detroit","Florida","Fort Worth","Hamptons","Hawaii","Houston","Indianapolis","Lake Tahoe","Las Vegas","Los Angeles","Memphis","Miami","Nashville","New Mexico","New Orleans","New York","North Carolina","Ohio","Orange County","Orlando","Philadelphia","Phoenix","Pike Place Market","Pittsburgh","Portland","San Antonio","San Diego","San Francisco","Seattle II","St. Louis","Tampa","Twin Cities","Utah","Waikiki","Washington DC","Vietnam I"];
    a_rateCities[2] = ["Bahrain I","England I","Sapporo","Nijmegen I","Qatar I","Cluj Napoca","Krasnodar I","Sochi I","Seville","Sharjah","Cleveland","Jacksonville","Sacramento","Seattle I"];
    a_rateCities[3] = ["Zagreb","Corfu","Guanajuato I","Auckland","North Island","South Island","Lisbon","Portugal I"];
    a_rateCities[4] = ["Cancun I","Chihuahua","Culiacan","Guadalajara","Monterrey","Puerto Vallarta I","Zacatecas"];
    
    var v_ratingString = ""; // rating string will be set inside the switch-case
    var v_ratingStar = '<img src="http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/16/Actions-rating-icon.png" />';

    var v_cityRegex = ""; // RegEx will be set inside the loop
    
    $('h2.text-module-begin > a').each(function() {
        // iterate through the city arrays
        StopCitySearch: for(i=1; i<a_rateCities.length; i++) {
            // Translate ranking number to string (german and english)
            switch(i) {
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
            for(var v_city of a_rateCities[i]) {
                v_cityRegex = new RegExp('^.*[city|mug|becher|tasse|starbucks]*.*' + v_city + '.*[city|mug|becher|tasse|starbucks]*.*$', 'i');
                if($(this).text().match(v_cityRegex)!=null) {
                    //Add star icons to city
                    $(this).prepend('<span title="' + v_ratingString + '">' + v_ratingStar.repeat(i) + '</span> ');
                    break StopCitySearch;
                }
            }
        }
    });
});
