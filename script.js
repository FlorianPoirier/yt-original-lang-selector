// ==UserScript==
// @name         yt-original-lang-selector
// @namespace    http://tampermonkey.net/
// @version      2024-12-12
// @description  Youtube video original language auto selector
// @author       fpoirier
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function setOriginalAudioLanguage() {
        const player = document.querySelector('video');

        if (!player) {
            console.error('Lecteur vidéo introuvable.');
            return;
        }

        const trackElements = player.audioTracks;

        if (trackElements && trackElements.length > 0) {
            let originalTrackFound = false;
            for (let i = 0; i < trackElements.length; i++) {
                const track = trackElements[i];

                // Check if any audio track is labeled as 'original'
                if (track.label && track.label.toLowerCase().includes('original')) {
                    track.enabled = true;
                    originalTrackFound = true;
                } else {
                    track.enabled = false;
                }
            }

            if (!originalTrackFound) {
                console.warn('Audio track labeled as original not found');
            }
        } else {
            console.warn('No alternative audio track available');
        }
    }

    function setOriginalTitleAndDescription() {
        const metaTag = document.querySelector('meta[property="og:title]');

        if (metaTag) {
            const originalTitle = metaTag.getAttribute('content');
            console.log(originalTitle);
        } else {
            console.error('Tag meta property og:title not found');
        }
    }

    const observer = new MutationObserver(() => {
        setOriginalAudioLanguage();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Assurez-vous que la langue est définie au chargement initial
    window.addEventListener('load', () => {
        setOriginalAudioLanguage();
        setOriginalTitleAndDescription();
    });

})();