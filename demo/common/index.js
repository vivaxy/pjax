/**
 * @since 15-09-05 18:26
 * @author vivaxy
 */
'use strict';

var loading = document.querySelector('loading');

window.addEventListener('load', function () {
    loading.innerHTML = 'loaded';
}, false);

new Pjax()
    .on('loading', function (e) {
        console.log('loading', e);
        loading.innerHTML = 'loading';
    }).on('load', function (e) {
        console.log('load', e);
        loading.innerHTML = 'loaded';
    });

console.log('on page', pageName);
