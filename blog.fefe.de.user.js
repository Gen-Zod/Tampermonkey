// ==UserScript==
// @name         blog.fefe.de
// @version      0.3.4
// @description  Dark Style for http://blog.fefe.de
// @author       r4v3n50u1
// @match        http*://blog.fefe.de/*
// @grant        none
// @homepageURL  https://github.com/r4v3n50u1/Tampermonkey/blob/master/blog.fefe.de.user.js
// @supportURL   https://github.com/r4v3n50u1/Tampermonkey/blob/master/blog.fefe.de.user.js
// @updateURL    https://github.com/r4v3n50u1/Tampermonkey/raw/master/blog.fefe.de.user.js
// @downloadURL  https://github.com/r4v3n50u1/Tampermonkey/raw/master/blog.fefe.de.user.js
// @require			http://code.jquery.com/jquery-latest.js
// @run-at       document-end
// ==/UserScript==

//add link icon and create class "permanentLink" for later use
$('body>ul').children('li').children('a:first-child').html('<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABGUlEQVQ4jY2SsUoDQRRFz4SwWFgEhYApYgghWFhY+AX+nN8QREKqIGrhD9gIopVYSQSLlBJD/IF4LHzCstkk+2CY2blz7nvzZqFCqF11rE5jjNR2FRa1rc5djU+1U6vgsRPjBjgEDmLdBM6rVpGp+e89danO6xugPnAEfAFPKaW8/LMpW199KNz3Td0NvaYOY/+2CJ+osxCn6p36EXuNgAehL6LKUnioZrmMWQl8ug6+VGuFyurqxTq4Wwarz+okqpmUwnHwKsRRPrP6Umjkq3pcbHpS50AD2E8pfecMMuAMaAHvwGNKafX5/PtNl2qjeO+VwyVRA+5jHqhNtaWOgYXa2+qg9nJNzMdC7VSp4t/kOoxmsd6eHfgFHmacfPzYmYQAAAAASUVORK5CYII=" class="permanentLink" />');
//style class "permanentLink"
$('.permanentLink').css({
    "padding": "5px 5px 0 0"
});

$('body').css({
    "background-color": "#222",
    "font-family": "helvetica, sans-serif",
    "font-size": "medium",
    "color": "#eee",
    "width": "960px",
    "margin": "30px 25%"
});
$('a').css({
    "color": "#eee"
});
$('h2>a').css({
    "color": "#fff !important"
});
$('li').css({
    "line-height": "1.5em",
    "background-color": "#333",
    "margin": "2px",
    "border-radius": "5px",
    "border": "solid thin black",
    "padding": "10px 15px",
    "list-style": "none"
});
$('li>p').css({
    "line-height": "1.5em",
    "margin-left": "1.5em"
});
