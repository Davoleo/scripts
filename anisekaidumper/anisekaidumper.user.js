// ==UserScript==
// @name AniSekaiDumper
// @namespace https://davoleo.net
// @author Davoleo
// @homepage https://github.com/Davoleo/scripts/tree/master/anisekaidumper
// @description Userscript for AnimeWorld that allows to dump-copy all the download links of an anime entry to the clipboard for external use.
// @contributionURL https://davoleo.net/donate
// @match https://www.animeworld.so/play/*
// @grant GM_log
// @grant GM_registerMenuCommand
// @grant GM_setClipboard
// @grant GM_notification
// @run-at document-idle
// @version 1.0.1
// @license MIT
// @noframes
// ==/UserScript==

//MAIN ENTRY POINT
(() => {
    'use strict';

    const titleElem = document.querySelector("h1#anime-title");
    const animeTitle = titleElem.textContent;

    //Episodes Number
    const episodeCountElem = document.querySelector("div.widget.info > .widget-body  div.row > dl:nth-child(2) > dd:nth-child(6)");
    if (!episodeCountElem) {
        GM_log("episode count element not available!");
        return;
    }

    const epDigits = Math.max(2, episodeCountElem.textContent.length);
    const epCount = Number(episodeCountElem.textContent);
    if (epCount) {
        const downloadElem = document.querySelector("div.widget.downloads #alternativeDownloadLink");
        if (!downloadElem) {
            GM_log("direct download link not available!");
            return;
        }
        const splitLink = downloadElem.href.split(/\_\d{1,3}/);
        
        GM_registerMenuCommand("Copy-Dump Download Links", function(event) {

            if (splitLink.length === 1 && epCount === 1) {
                GM_setClipboard(downloadElem.href, 'text');
                GM_notification({
                    text: "Single DLink copied",
                    title: "AniSekaiDumper",
                    timeout: 1500
                });
            }
            else {
                let links = "";
                for (let i = 1; i <= epCount; i++) {
                    links = links + splitLink[0] + '_' + String(i).padStart(epDigits, '0') + splitLink[1] + '\n';
                }
                GM_setClipboard(links, "text");

                if (splitLink.length !== 2)
                    GM_notification({
                        text: "Error during link splitting, clipboard might contain broken stuff",
                        title: "AniSekaiDumper",
                        timeout: 1500
                    });
                else
                    GM_notification({
                        text: "DLinks have been dump-copied to clipboard",
                        title: "AniSekaiDumper",
                        timeout: 1500
                    });
            }
        }, 'c');
    }
})();

