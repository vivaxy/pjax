(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @since 15-09-02 10:25
 * @author vivaxy
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var EventEmitter = (function () {
    function EventEmitter() {
        _classCallCheck(this, EventEmitter);

        this.events = {};
    }

    /**
     *
     * @param event
     * @param callback
     * @returns {EventEmitter}
     */

    _createClass(EventEmitter, [{
        key: 'on',
        value: function on(event, callback) {
            if (!this.events[event]) {
                this.events[event] = [];
            }
            this.events[event].push(callback);
            return this;
        }

        /**
         *
         * @param event
         * @returns {EventEmitter}
         */
    }, {
        key: 'emit',
        value: function emit(event) {
            var callbacks = this.events[event],
                _this = this,
                _arguments = arguments;
            if (callbacks) {
                callbacks.forEach(function (callback) {
                    callback.apply(_this, Array.prototype.slice.call(_arguments, 1));
                });
            }
            return this;
        }

        /**
         *
         * @param event
         * @param callback
         * @returns {EventEmitter}
         */
    }, {
        key: 'off',
        value: function off(event, callback) {
            if (this.events[event] && callback) {
                this.events[event].splice(this.events[event].indexOf(callback), 1);
            } else {
                this.events[event] = [];
            }
            return this;
        }
    }]);

    return EventEmitter;
})();

exports['default'] = EventEmitter;
module.exports = exports['default'];

},{}],2:[function(require,module,exports){
/**
 * @since 15-09-05 12:42
 * @author vivaxy
 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _eventEmitter = require('./event-emitter');

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

var Pjax = (function (_EventEmitter) {
    _inherits(Pjax, _EventEmitter);

    function Pjax() {
        var selector = arguments.length <= 0 || arguments[0] === undefined ? 'a' : arguments[0];

        _classCallCheck(this, Pjax);

        _get(Object.getPrototypeOf(Pjax.prototype), 'constructor', this).call(this);
        this.selector = selector;
        this._initialize();
    }

    _createClass(Pjax, [{
        key: '_initialize',
        value: function _initialize() {
            var _this = this;

            var popStateHandler = function popStateHandler(e) {
                unbind();
                _this._loadPage(e.state.url);
            };

            var event = 'click';
            var clickHandler = function clickHandler(e) {
                e.preventDefault();
                unbind();
                var url = e.target.href;
                history.pushState({
                    url: url
                }, 'loading', url);
                _this._loadPage(url);
            };

            var bind = function bind() {
                window.addEventListener('popstate', popStateHandler, false);
                _this._allElement(function (ele) {
                    ele.addEventListener(event, clickHandler, false);
                });
            };

            var unbind = function unbind() {
                window.removeEventListener('popstate', popStateHandler, false);
                _this._allElement(function (ele) {
                    ele.removeEventListener(event, clickHandler, false);
                });
            };
            bind();
            return this;
        }
    }, {
        key: '_allElement',
        value: function _allElement(callback) {
            Array.prototype.forEach.call(document.querySelectorAll(this.selector), callback);
            return this;
        }
    }, {
        key: '_loadScriptInOrder',
        value: function _loadScriptInOrder(state) {
            var _this2 = this;

            var queue = Array.prototype.slice.call(document.querySelectorAll('script'));
            var loadScript = function loadScript() {
                var _again2 = true;

                _function2: while (_again2) {
                    script = newScript = undefined;
                    _again2 = false;

                    var script = queue.shift();
                    if (script) {
                        var newScript = document.createElement('script');
                        script.type && (newScript.type = script.type);
                        script.remove();
                        if (script.src) {
                            newScript.addEventListener('load', loadScript, false);
                            newScript.src = script.src;
                            document.body.appendChild(newScript);
                            _this2.emit('load', {
                                type: 'script',
                                url: state.url,
                                title: state.title
                            });
                            return _this2;
                        } else {
                            newScript.innerHTML = script.innerHTML;
                            document.body.appendChild(newScript);
                            _again2 = true;
                            continue _function2;
                        }
                    } else {
                        _this2.emit('load', {
                            type: 'script',
                            url: state.url,
                            title: state.title
                        });
                        return _this2;
                    }
                }
            };
            return loadScript();
        }
    }, {
        key: '_loadPage',
        value: function _loadPage(url) {
            var _this3 = this;

            this.emit('loading', {
                progress: 0
            });
            var xhr = new XMLHttpRequest();
            xhr.addEventListener('readystatechange', function (ev) {
                /**
                 0    UNSENT    open() has not been called yet.
                 1    OPENED    send() has not been called yet.
                 2    HEADERS_RECEIVED    send() has been called, and headers and status are available.
                 3    LOADING    Downloading; responseText holds partial data.
                 4    DONE
                 */
                var _xhr = ev.target;
                if (_xhr.readyState === 4) {
                    if (_xhr.status >= 200 && _xhr.status < 300 || _xhr.status === 304) {
                        // 2** is valid response status, and 304 means get from the cache
                        // _this.xhr.responseType
                        var newDocument = document.implementation.createHTMLDocument('');
                        newDocument.documentElement.innerHTML = _xhr.responseText;
                        var state = {
                            url: url,
                            title: newDocument.title
                        };
                        history.replaceState(state, state.title, state.url);

                        document.documentElement.replaceChild(newDocument.body, document.body);
                        document.documentElement.replaceChild(newDocument.head, document.head);

                        _this3._loadScriptInOrder(state);
                        _this3.emit('load', {
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
    }]);

    return Pjax;
})(_eventEmitter2['default']);

window.Pjax = window.Pjax || Pjax;

},{"./event-emitter":1}]},{},[2]);
