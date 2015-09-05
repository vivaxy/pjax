/**
 * @since 15-09-05 12:42
 * @author vivaxy
 */
'use strict';
import EventEmitter from './event-emitter';

class Pjax extends EventEmitter {
    constructor(selector = 'a') {
        super();
        this.selector = selector;
        this._initialize();
    }

    _initialize() {
        let popStateHandler = (e) => {
            unbind();
            this._loadPage(e.state.url);
        };

        let event = 'click';
        let clickHandler = (e) => {
            e.preventDefault();
            unbind();
            let url = e.target.href;
            history.pushState({
                url: url
            }, 'loading', url);
            this._loadPage(url);
        };

        let bind = () => {
            window.addEventListener('popstate', popStateHandler, false);
            this._allElement((ele) => {
                ele.addEventListener(event, clickHandler, false);
            });
        };

        let unbind = () => {
            window.removeEventListener('popstate', popStateHandler, false);
            this._allElement((ele) => {
                ele.removeEventListener(event, clickHandler, false);
            });
        };
        bind();
        return this;
    }

    _allElement(callback) {
        Array.prototype.forEach.call(document.querySelectorAll(this.selector), callback);
        return this;
    }

    _loadScriptInOrder(state) {
        let queue = Array.prototype.slice.call(document.querySelectorAll('script'));
        let loadScript = () => {
            let script = queue.shift();
            if (script) {
                let newScript = document.createElement('script');
                script.type && (newScript.type = script.type);
                script.remove();
                if (script.src) {
                    newScript.addEventListener('load', loadScript, false);
                    newScript.src = script.src;
                    document.body.appendChild(newScript);
                    this.emit('load', {
                        type: 'script',
                        url: state.url,
                        title: state.title
                    });
                    return this;
                } else {
                    newScript.innerHTML = script.innerHTML;
                    document.body.appendChild(newScript);
                    return loadScript();
                }
            } else {
                this.emit('load', {
                    type: 'script',
                    url: state.url,
                    title: state.title
                });
                return this;
            }
        };
        return loadScript();
    }

    _loadPage(url) {
        this.emit('loading', {
            progress: 0
        });
        let xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', (ev) => {
            /**
             0    UNSENT    open() has not been called yet.
             1    OPENED    send() has not been called yet.
             2    HEADERS_RECEIVED    send() has been called, and headers and status are available.
             3    LOADING    Downloading; responseText holds partial data.
             4    DONE
             */
            let _xhr = ev.target;
            if (_xhr.readyState === 4) {
                if (_xhr.status >= 200 && _xhr.status < 300 || _xhr.status === 304) {
                    // 2** is valid response status, and 304 means get from the cache
                    // _this.xhr.responseType
                    let newDocument = document.implementation.createHTMLDocument('');
                    newDocument.documentElement.innerHTML = _xhr.responseText;
                    let state = {
                        url: url,
                        title: newDocument.title
                    };
                    history.replaceState(state, state.title, state.url);
                    
                    document.documentElement.replaceChild(newDocument.body, document.body);
                    document.documentElement.replaceChild(newDocument.head, document.head);

                    this._loadScriptInOrder(state);
                    this.emit('load', {
                        type: 'html',
                        url: state.url,
                        title: state.title
                    });
                }
            }
        }, false);
        xhr.open('GET', url, true);
        xhr.send();
    }
}

window.Pjax = window.Pjax || Pjax;
