/**
 * @since 2015-09-21 13:03
 * @author vivaxy
 */
'use strict';
import Pjax from '../../src/pjax.js';

let loading = document.querySelector('loading');

window.addEventListener('load', () => {
    loading.innerHTML = 'loaded';
}, false);

new Pjax()
    .on('loading', e => {
        console.log('loading', e);
        loading.innerHTML = 'loading';
    }).on('load', e => {
        console.log('load', e);
        loading.innerHTML = 'loaded';
    });

console.log('on page', pageName);
