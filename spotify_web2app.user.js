// ==UserScript==
// @name         Spotify Web -> App
// @namespace    https://davoleo.net
// @version      0.1
// @description  Opens Spotify app on the linked track
// @author       Davoleo
// @match        https://open.spotify.com/track/*
// @grant        none
// ==/UserScript==

//MAIN ENTRY POINT
(() => {
    'use strict';
    //window.location.href = window.location.href.replace(/https:\/\//, "spotify://");
    window.location.href = "spotify://" + window.location.href;
})();