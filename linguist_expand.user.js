// ==UserScript==
// @name Linguist Expand
// @namespace Davoleo
// @author Davoleo
// @homepage https://davoleo.net
// @description Expands Github's Linguist language list on repositories to show every language instead of hiding the small percentage under "Other"
// @match https://github.com/*
// @require https://raw.githubusercontent.com/nodeca/js-yaml/master/dist/js-yaml.js
// @resource languageColors https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml
// @grant GM_getResourceText
// @grant GM_log
// @grant GM_xmlhttpRequest
// @connect api.github.com
// @run-at document-idle
// @version 1.0.0
// @license MIT
// @noframes
// ==/UserScript==

const languages = jsyaml.load(GM_getResourceText('languageColors'));

let langPercentagesMap = {}
let langColorsMap = {}

function request(url, options={}) {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      url,
      method: options.method || "GET",
      headers: options.headers || {Accept: "application/json",
                                   "Content-Type": "application/json"},
      responseType: options.responseType || "json",
      data: options.body || options.data,
      onload: res => resolve(res.response),
      onerror: reject
    })
  })
}

async function retrieveLanguages(user, repo) {
    try {
        return await request(`https://api.github.com/repos/${user}/${repo}/languages`, {
            headers: {
                Accept: "application/vnd.github.v3+json"
            }
        });
    }
    catch(e) {
        return null;
    }
}

function buildLanguagesSection() {
    
}

function buildBarSegmentSpan(name, color, percentage) {
    const segment = document.createElement('span');
    segment.style.setProperty('background-color', color, 'important');
    segment.style.width = percentage + '%';
    segment.style.setProperty('margin', '0', 'important')
    segment.setAttribute("itemprop", "keywords");
    segment.setAttribute("aria-label", name + ' ' + percentage);
    segment.setAttribute("data-view-component", "true");
    segment.setAttribute("class", "Progress-item color-bg-success-inverse lingustexpand");
    return segment;
}

function buildLanguageChip(owner, repo, name, color, percentage) {
    const chip = document.createElement('li');
    chip.classList.add('d-inline');

    const chipLink = document.createElement('a');
    chipLink.classList.add('d-inline-flex', 'flex-items-center', 'flex-nowrap', 'Link--secondary', 'no-underline', 'text-small', 'mr-3');
    chipLink.href = `/${owner}/${repo}/search?l=${name}`

    const svgText = `
    <svg style="color:${color};" aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" 
            width="16" data-view-component="true" class="octicon octicon-dot-fill mr-2">
        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8z"></path>
    </svg>
    `;
    const svgTMP = document.createElement('template');
    svgTMP.innerHTML = svgText;
    GM_log(svgTMP.content);
    chipLink.append(svgTMP.content);

    const chipName = document.createElement('span');
    chipName.classList.add('color-fg-default', 'text-bold', 'mr-1');
    chipName.textContent = name;
    chipLink.append(chipName);

    const chipValue = document.createElement('span');
    chipValue.textContent = percentage + '%';
    chipLink.append(chipValue);

    chip.append(chipLink);
    return chip;
}

(() => {
    'use strict';

    const originalLangSection = document.querySelector("#repo-content-pjax-container > div > div.Layout.Layout--flowRow-until-md.Layout--sidebarPosition-end.Layout--sidebarPosition-flowRow-end > div.Layout-sidebar > div > div:nth-child(5)");
    const mainContent = document.querySelector("#repo-content-pjax-container > div > div.Layout.Layout--flowRow-until-md.Layout--sidebarPosition-end.Layout--sidebarPosition-flowRow-end > div.Layout-main > div.Box.mb-3");
    
    const ownerRepo = window.location.pathname.split('/');


    if (ownerRepo.length === 3) {

        //languageBar.append(window.sessionStorage.getItem("user_session"));

        GM_log(ownerRepo);
        retrieveLanguages(ownerRepo[1], ownerRepo[2]).then((lang_vals) => {
            if (lang_vals !== null) {
                const total = Object.values(lang_vals).reduce((prev, curr) => prev + curr);
                Object.keys(lang_vals).forEach((lang) => {
                    langColorsMap[lang] = languages[lang].color;
                    langPercentagesMap[lang] = ((lang_vals[lang] / total) * 100).toFixed(1);
                });
            }

            GM_log(langColorsMap);
            GM_log(langPercentagesMap);

            const languageSection = document.createElement("div");
            languageSection.classList.add("mb-3");

            //const heading = document.createElement('h2');
            //heading.textContent = "Languages"
            //heading.classList.add("h4", "mb-3");
            //languageSection.append(heading);

            const bar = document.createElement('span');
            bar.classList.add("Progress", 'mb-2');
            bar.setAttribute("data-view-component", "true");
            Object.keys(langColorsMap).forEach((lang, i) => {
                const segment = buildBarSegmentSpan(lang, langColorsMap[lang], langPercentagesMap[lang]);
                //if (i !== 0) {
                //    segment.style.setProperty('margin-left', '1px');
                //}
                bar.appendChild(segment);
            });
            languageSection.append(bar);

            const languageUL = document.createElement('ul');
            Object.keys(langColorsMap).forEach((lang) => {
                const languageChip = buildLanguageChip(ownerRepo[1], ownerRepo[2], lang, langColorsMap[lang], langPercentagesMap[lang]);
                languageUL.append(languageChip);
            });
            languageSection.append(languageUL);
            
            mainContent.insertAdjacentElement('beforebegin', languageSection);

            originalLangSection.remove();
        });
    }
})();