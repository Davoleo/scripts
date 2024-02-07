// ==UserScript==
// @name         Spotify Web -> App [DEPRECATED]
// @description  Forces Spotify app to open desktop app on open.spotify.com pages
// @namespace    https://davoleo.net
// @version      0.1
// @downloadURL  https://github.com/Davoleo/scripts/raw/master/spotify_web2app.user.js
// @updateURL    https://github.com/Davoleo/scripts/raw/master/spotify_web2app/spotify_webplaycount.user.js
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