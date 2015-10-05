// ==UserScript==
// @name            m-blass Starbucks city mug star rating and direct mail
// @namespace       
// @version			0.1
// @description		Adds a star rating to Starbucks mugs and the mail addresses get a mailto-Link
// @supportURL      https://gist.github.com/Gen-Zod/c6507b8341f3598f4120
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
    // arrays of cities; array number is equal to commonness of a city mug (1 = uncommon to 4 = impossible to find)
    var a_rateCities = new Array();
    // list of cities are from http://mugs.m-blass.de/htf.php
    a_rateCities[1] = ["Banff","Calgary","Canada","Edmonton","Montreal","Niagara Falls","Quebec","Toronto","Vancouver","Vancouver Island","Whistler","Oktoberfest I","Bali","Indonesia","Jakarta","Osaka","Tokyo","Kuala Lumpur","Penang","Sabah","Makati","Manila I","St. Petersburg I","Singapore I","Singapore II","Korea","Seoul","Alaska","Arizona","Atlanta","Austin","Boston","California","Charlotte","Chicago","Colorado","Dallas","Denver","Detroit","Florida","Fort Worth","Hamptons","Hawaii","Houston","Indianapolis","Lake Tahoe","Las Vegas","Los Angeles","Memphis","Miami","Nashville","New Mexico","New Orleans","New York","North Carolina","Ohio","Orange County","Orlando","Philadelphia","Phoenix","Pike Place Market","Pittsburgh","Portland","San Antonio","San Diego","San Francisco","Seattle II","St. Louis","Tampa","Twin Cities","Utah","Waikiki","Washington DC","Vietnam I"];
    a_rateCities[2] = ["Bahrain I","England I","Sapporo","Nijmegen I","Qatar I","Cluj Napoca","Krasnodar I","Sochi I","Seville","Sharjah","Cleveland","Jacksonville","Sacramento","Seattle I"];
    a_rateCities[3] = ["Zagreb","Corfu","Guanajuato I","Auckland","North Island","South Island","Lisbon","Portugal I"];
    a_rateCities[4] = ["Cancun I","Chihuahua","Culiacan","Guadalajara","Monterrey","Puerto Vallarta I","Zacatecas"];
    
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
        for(i=1; i<a_rateCities.length; i++) {
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
            StopCitySearch: for(j=0; j<a_rateCities[i].length; j++) {
                v_cityRegex = '^' + a_rateCities[i][j] + '\\s*$'; // RegEx to find city in text
                if($(this).text().match(v_cityRegex)!=null) {
                    //Add star icons to city
                    $(this).append(' <span title="' + v_ratingString + '">' + v_ratingStar.repeat(i) + '</span>');
                    break StopCitySearch;
                }
            }
        }
    });
});