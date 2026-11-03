// ==UserScript==
// @name AniSekaiDumper
// @namespace https://davoleo.net
// @author Davoleo
// @homepage https://github.com/Davoleo/scripts/tree/master/anisekaidumper
// @description Userscript for AnimeWorld that allows to dump-copy all the download links of an anime entry to the clipboard for external use.
// @contributionURL https://davoleo.net/donate
// @match https://www.animeworld.ac/play/*
// @grant GM_log
// @grant GM_registerMenuCommand
// @grant GM_setClipboard
// @grant GM_notification
// @run-at document-idle
// @version 1.0.1
// @downloadURL https://github.com/Davoleo/scripts/raw/master/anisekaidumper/anisekaidumper.user.js
// @updateURL https://github.com/Davoleo/scripts/raw/master/anisekaidumper/anisekaidumper.user.js
// @license MIT
// @noframes
// ==/UserScript==

//MAIN ENTRY POINT


(() => {
    'use strict';

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const chunks = 3
    const timeout = 5000

    const titleElem = document.querySelector("h1#anime-title");
    const animeTitle = titleElem.textContent;


    const episodesAnchors = document.querySelectorAll("li.episode a");
    const episodeCount = episodesAnchors.length;
    //Episodes Number
    if (episodeCount == 0) {
        GM_log("No episodes found.");
        return;
    }

    GM_registerMenuCommand("Copy-Dump Download Links",async function(event) {



        let episodesAnchorArray = Array.from(episodesAnchors.values())
        let links = ""

        while(episodesAnchorArray.length > 0)
        {
            const episodesAnchorChunk = episodesAnchorArray.splice(0, chunks)

            let promises = [];

            for(const episode of episodesAnchorChunk) {
                const id = episode.getAttribute("data-id")
                const api = `/api/episode/info?id=${id}&alt=0`

                promises.push(fetch(api).then(res => res.json()))

            }
            Promise.all(promises).then(responses => {
                for(const response of responses) {
                    console.log(response.grabber)
                    links += response.grabber + "\n"
                }
            })

            await sleep(timeout)
        }

        GM_setClipboard(links, "text");

        GM_notification({
            text: "DLinks have been dump-copied to clipboard",
            title: "AniSekaiDumper",
            timeout: 1500
        });

    }, 'c');

})();

