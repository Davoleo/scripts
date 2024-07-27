// ==UserScript==
// @name            Spotify Web Play Count
// @namespace       https://davoleo.net
// @homepage        https://github.com/Davoleo/scripts/tree/master/anisekaidumper
// @contributionURL https://davoleo.net/donate
// @version         0.1
// @downloadURL     https://github.com/Davoleo/scripts/raw/master/spotify_webplaycount/spotify_webplaycount.user.js
// @updateURL       https://github.com/Davoleo/scripts/raw/master/spotify_webplaycount/spotify_webplaycount.user.js
// @description     Adds Play Count to spotify web via third party client because spotify sucks
// @author          Davoleo
// @match           https://open.spotify.com/album/*
// @connect         api.t4ils.dev
// @grant           GM_xmlhttpRequest
// ==/UserScript==


//MAIN ENTRY POINT
(() => {
    'use strict';

    const lastSlash = window.location.pathname.lastIndexOf('/');
    const albumid = window.location.pathname.substring(lastSlash+1);
    console.log(albumid);

    GM_xmlhttpRequest({
        url: `https://api.t4ils.dev/albumPlayCount?albumid=${albumid}`,
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        responseType: "json",
        onload: res => addTrackData(res.response),
        onerror: console.error
    })


})();

function addTrackData(response) {
    console.log(response);

    const cssClass = `
        div[data-testid="tracklist-row"] > div[aria-colindex="3"]::before {
            content: attr(data-playcount);
            padding-right: 16px;
        }
    `;
    //First stylesheet is inaccessible
    //Inserting after all the @font-face's [index = 11] because they need to be at the top
    document.styleSheets[1].insertRule(cssClass, 11);

    const tracks = response.data.discs[0].tracks;
    
    const trackRows = document.querySelectorAll('[data-testid="tracklist-row"]');

    for (let i = 0; i < tracks.length; i++) {
        const playcount = (tracks[i].playcount).toLocaleString(undefined);
        const currentRow = trackRows[i];
        currentRow.lastChild.setAttribute('data-playcount', "Plays: " + playcount);
    }
}
