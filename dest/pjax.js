(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define('Pjax', ['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.Pjax = mod.exports;
  }
})(this, function (exports) {
  /**
   * @since 15-09-05 12:42
   * @author vivaxy
   */
  'use strict';
});
