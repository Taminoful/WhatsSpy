// ==UserScript==
// @name         WhatsSpy
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Manuel Bernhard (Fusix) ♥
// @match        https://web.whatsapp.com/
// @grant        none
// ==/UserScript==
/* jshint -W097 */
var enabled = true, 
    isOnline = false;

window.onload = function() {
    Notification.requestPermission();
    var jq = document.createElement('script');
    var isFirstClicked = false;
    jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(jq);
    setInterval(function(){
        if(typeof jQuery != "undefined") {
            if(isFirstClicked === false && $("#pane-side > div > div > div").length >= 3) {
                isFirstClicked = true;
                for(var i = 0; i < $("#pane-side > div > div > div").length; i++) {
                    if(parseInt($($("#pane-side > div > div > div")[i]).attr("style").split(";")[3].split(" ")[1].trim().replace("%,","")) == 0) {
                        $("#pane-side > div > div > div:nth-child(" + (i + 1) + ") > div > div").click();
                    }
                }
            }
            mirEgal();
        }
    },500);
};

$(window).on("blur focus", function(e) {
    var prevType = $(this).data("prevType");
    if (prevType != e.type) {
        if(e.type == "focus") {
            enabled = false;
        } else {
            enabled = true;
        }
    }
});

function mirEgal() {
    if($("#main > header > div.chat-body > div.chat-status.ellipsify > span").text() == "online") {
        if(isOnline === true && enabled === true) return;
        isOnline = true;
        var notification = new Notification('WhatsSpy', {
            icon: $("#main > header > div.chat-avatar > div > img").attr("src"),
            body:  $("#main > header > div.chat-body > div.chat-main > h2 > span").text() + " ist nun online!",
        });
        setTimeout(function(){notification.close();},7000);
    } else {
       isOnline = false;
    }
}