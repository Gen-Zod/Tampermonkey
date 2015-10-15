// ==UserScript==
// @name            fredorange Starbucks Mug Star Rating
// @namespace       
// @version			0.5
// @description		Adds a star rating to Starbucks mugs (Icon 08 Series) // Actually doesn't work perfectly because of CSRF issue!!! Workaround: Static mug lists.
// @homepageURL     https://github.com/r4v3n50u1/Tampermonkey/blob/master/fredorangeStarRating.user.js
// @supportURL      https://github.com/r4v3n50u1/Tampermonkey/blob/master/fredorangeStarRating.user.js
// @updateURL       https://github.com/r4v3n50u1/Tampermonkey/raw/master/fredorangeStarRating.user.js
// @downloadURL     https://github.com/r4v3n50u1/Tampermonkey/raw/master/fredorangeStarRating.user.js
// @author			r4v3n50u1
// @match			http://fredorange.com/*
// @exclude         http://fredorange.com/*do=ask*
// @grant			none
// @require			http://code.jquery.com/jquery-latest.js
// @run-at          document-end
// ==/UserScript==

// add function to repeat string num times
String.prototype.repeat = function( num )
{
    return new Array( num + 1 ).join( this );
};

$(document).ready(function() {
    var a_rateCities = []; 
    
    // list of cities are from http://mugs.m-blass.de/htf.php
    // arrays of cities; array number is equal to commonness of a city mug (1 = uncommon to 4 = impossible to find)
    a_rateCities[1] = ["Banff","Calgary","Canada","Edmonton","Montreal","Niagara Falls","Quebec","Toronto","Vancouver","Vancouver Island","Whistler","Oktoberfest I","Bali","Indonesia","Jakarta","Osaka","Tokyo","Kuala Lumpur","Penang","Sabah","Makati","Manila I","St. Petersburg I","Singapore I","Singapore II","Korea","Seoul","Alaska","Arizona","Atlanta","Austin","Boston","California","Charlotte","Chicago","Colorado","Dallas","Denver","Detroit","Florida","Fort Worth","Hamptons","Hawaii","Houston","Indianapolis","Lake Tahoe","Las Vegas","Los Angeles","Memphis","Miami","Nashville","New Mexico","New Orleans","New York","North Carolina","Ohio","Orange County","Orlando","Philadelphia","Phoenix","Pike Place Market","Pittsburgh","Portland","San Antonio","San Diego","San Francisco","Seattle II","St. Louis","Tampa","Twin Cities","Utah","Waikiki","Washington DC","Vietnam I"];
    a_rateCities[2] = ["Bahrain I","England I","Sapporo","Nijmegen I","Qatar I","Cluj Napoca","Krasnodar I","Sochi I","Seville","Sharjah","Cleveland","Jacksonville","Sacramento","Seattle I"];
    a_rateCities[3] = ["Zagreb","Corfu","Guanajuato I","Auckland","North Island","South Island","Lisbon","Portugal I"];
    a_rateCities[4] = ["Cancun I","Chihuahua","Culiacan","Guadalajara","Monterrey","Puerto Vallarta I","Zacatecas"];
    
    // ajax request ends in CSRF issue :(
    //var $regex = new RegExp("^[A-Z]+\\s?[A-Z]*\\s*[A-Z]*\\s{1}\\-{1}\\s{1}(\\w*\\.*\\s?\\w*\\s*\\w*)$"); 

    //get the rare cities from http://mugs.m-blass.de/htf.php and store it in an array for later use
    /*$.ajax({
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
    });*/

    var v_ratingString = ""; // rating string will be set inside the switch-case
    var v_ratingStar = '<img src="http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/16/Actions-rating-icon.png" />';

    $('.mugTitle > a').each(function() { // iterate through all the mugTitle-Elements
        var v_mugString = $(this).text(); // get the string from a mugTitle-Element
        
        CityLoop: for(i=1; i<a_rateCities.length; i++) { // iterate through the city arrays
            switch(i) { // Translate ranking number to string (german and english)
                case 1:
                    v_ratingString = "Selten / uncommon";
                    break;
                case 2:
                    v_ratingString = "Rar / rare";
                    break;
                case 3:
                    v_ratingString = "Sehr rar / very rare";
                    break;
                case 4:
                    v_ratingString = "Unmöglich / impossible";
                    break;
                default:
                    v_ratingString = "";
            }
            for(var v_city of a_rateCities[i]) { // iterate through each city
                var v_cityRegex = "^" + v_city + ".*$"; // RegEx to find city in text
                if(v_mugString.match(v_cityRegex)!==null) {
                    $(this).prepend('<span title="' + v_ratingString + '">' + v_ratingStar.repeat(i) + '</span> '); //Add star icons to city
                    break CityLoop;
                }
            }
        }
    });
});
