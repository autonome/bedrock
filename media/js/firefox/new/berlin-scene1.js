/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* global YT */
/* eslint no-unused-vars: [2, { "varsIgnorePattern": "onYouTubeIframeAPIReady" }] */

// YouTube API hook has to be in global scope
function onYouTubeIframeAPIReady() {
    'use strict';

    Mozilla.firstRunOnYouTubeIframeAPIReady();
}

(function($) {
    'use strict';

    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    function onYouTubeIframeAPIReady() {

        // lazy load video when visitor clicks the placeholder.
        var videoLink = document.querySelector('.video-play');
        var videoId = videoLink.getAttribute('data-id');

        videoLink.setAttribute('role', 'button');

        videoLink.addEventListener('click', function(e) {
            e.preventDefault();

            new YT.Player(videoLink, {
                height: '703',
                width: '1250',
                videoId: videoId,
                playerVars: {
                    modestbranding: 1, // hide YouTube logo.
                    rel: 0, // do not show related videos on end.
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });

            function onPlayerReady(event) {
                event.target.playVideo();

                window.dataLayer.push({
                    'event': 'video-play',
                    'videoTitle': 'Firefox. Aus Gründen'
                });
            }

            function onPlayerStateChange(event) {
                if (event.data === YT.PlayerState.ENDED) {

                    window.dataLayer.push({
                        'event': 'video-complete',
                        'videoTitle': 'Firefox. Aus Gründen'
                    });
                }
            }
        });
    }

    Mozilla.firstRunOnYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

    // use custom adjust link for Android/iOS
    $('.os_android .download-link, .os_ios .download-link').attr('href', 'https://mzl.la/2GEZ3uu');
})(window.jQuery);
