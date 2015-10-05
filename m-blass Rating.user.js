// ==UserScript==
// @name					m-blass star rating and direct mail
// @namespace			
// @version				0.1
// @description		Adds a star rating to rare mugs and the mail addresses get a mailto-Link
// @author				Manuel Bissinger
// @match					http://mugs.m-blass.de/*
// @grant					none
// @require				http://code.jquery.com/jquery-latest.js
// ==/UserScript==

String.prototype.repeat = function( num )
{
    return new Array( num + 1 ).join( this );
}

$(document).ready(function(){
    var a_rateCities = new Array();
    a_rateCities[1] = ["Banff","Calgary","Canada","Edmonton","Montreal","Niagara Falls","Quebec","Toronto","Vancouver","Vancouver Island","Whistler","Oktoberfest I","Bali","Indonesia","Jakarta","Osaka","Tokyo","Kuala Lumpur","Penang","Sabah","Makati","Manila I","St. Petersburg I","Singapore I","Singapore II","Korea","Seoul","Alaska","Arizona","Atlanta","Austin","Boston","California","Charlotte","Chicago","Colorado","Dallas","Denver","Detroit","Florida","Fort Worth","Hamptons","Hawaii","Houston","Indianapolis","Lake Tahoe","Las Vegas","Los Angeles","Memphis","Miami","Nashville","New Mexico","New Orleans","New York","North Carolina","Ohio","Orange County","Orlando","Philadelphia","Phoenix","Pike Place Market","Pittsburgh","Portland","San Antonio","San Diego","San Francisco","Seattle II","St. Louis","Tampa","Twin Cities","Utah","Waikiki","Washington DC","Vietnam I"];
    a_rateCities[2] = ["Bahrain I","England I","Sapporo","Nijmegen I","Qatar I","Cluj Napoca","Krasnodar I","Sochi I","Seville","Sharjah","Cleveland","Jacksonville","Sacramento","Seattle I"];
    a_rateCities[3] = ["Zagreb","Corfu","Guanajuato I","Auckland","North Island","South Island","Lisbon","Portugal I"];
    a_rateCities[4] = ["Cancun I","Chihuahua","Culiacan","Guadalajara","Monterrey","Puerto Vallarta I","Zacatecas"];
    
    var v_ratingString = "";
    var v_ratingStar = '<img src="http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/16/Actions-rating-icon.png" width="12" height="12" />';

    var v_cityRegex = "";
    var v_emailRegex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$';
    var v_subject = "Starbucks Mug Trading Request";
    
    $('td').each(function() {
        var v_mail = $(this).text();
        var v_nickname = "";
        if($(this).text().match(v_emailRegex)!=null) {
            v_nickname = $(this).prev().text();
            var v_body = 'Hi ' + v_nickname + ',\n\n';
            $(this).html('<a href="mailto:' + v_mail + '?subject=' + v_subject + '&body=' + v_body + '" target="_blank" style="background-color: transparent;">' + v_mail + '</a>');
            $(this).prev().append('<a href="http://mugs.m-blass.de/collection.php?nickname=' + v_nickname + '" target="_blank" style="float: right; margin-right: 50%; background-color: transparent;" title="Collection of ' + v_nickname + '"><img src="http://icons.iconarchive.com/icons/custom-icon-design/mono-business-2/16/coffee-icon.png" width="12" height="12" /></a>');
        }
        for(i=1; i<a_rateCities.length; i++) {
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
            StopCitySearch: for(j=0; j<a_rateCities[i].length; j++) {
                v_cityRegex = '^' + a_rateCities[i][j] + '\\s*$';
                if($(this).text().match(v_cityRegex)!=null) {
                    $(this).append(' <span title="' + v_ratingString + '">' + v_ratingStar.repeat(i) + '</span>');
                    break StopCitySearch;
                }
            }
        }
    });

});

