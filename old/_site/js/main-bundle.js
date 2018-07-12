/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		1: 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData === 0) {
/******/ 			return new Promise(function(resolve) { resolve(); });
/******/ 		}
/******/
/******/ 		// a Promise means "currently loading".
/******/ 		if(installedChunkData) {
/******/ 			return installedChunkData[2];
/******/ 		}
/******/
/******/ 		// setup Promise in chunk cache
/******/ 		var promise = new Promise(function(resolve, reject) {
/******/ 			installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 		});
/******/ 		installedChunkData[2] = promise;
/******/
/******/ 		// start chunk loading
/******/ 		var head = document.getElementsByTagName('head')[0];
/******/ 		var script = document.createElement('script');
/******/ 		script.type = 'text/javascript';
/******/ 		script.charset = 'utf-8';
/******/ 		script.async = true;
/******/ 		script.timeout = 120000;
/******/
/******/ 		if (__webpack_require__.nc) {
/******/ 			script.setAttribute("nonce", __webpack_require__.nc);
/******/ 		}
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "-bundle.js";
/******/ 		var timeout = setTimeout(onScriptComplete, 120000);
/******/ 		script.onerror = script.onload = onScriptComplete;
/******/ 		function onScriptComplete() {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var chunk = installedChunks[chunkId];
/******/ 			if(chunk !== 0) {
/******/ 				if(chunk) {
/******/ 					chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/ 				}
/******/ 				installedChunks[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		head.appendChild(script);
/******/
/******/ 		return promise;
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1).CollapsingMenu();

var InfiniteScroll = __webpack_require__(2).JekyllInfiniteScroll;
var infiniteScroll = new InfiniteScroll();

var ProcessingLoader = __webpack_require__(4).ProcessingLoader;
var processingLoader = new ProcessingLoader();
processingLoader.load();
infiniteScroll.on('fetched', function() {
    processingLoader.load();
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

exports.CollapsingMenu = function () {

  $(document).ready( function() {

    $(window).scroll( function() {
      var docViewTop = $(window).scrollTop();
      if (docViewTop > 100) {
        $(".nav .container").removeClass('nav-lg');
        $(".nav .container").addClass('nav-sm');
      }
      else {
        $(".nav .container").removeClass('nav-sm');
        $(".nav .container").addClass('nav-lg');
      }
    });

    $('.nav-toggle').on('click', function(e) {
          $('.nav-links').slideToggle();
          e.preventDefault();
    });

    $(window).resize(function(){
        var w = $(window).width();
        if(w > 500 && $('.nav-links').is(':hidden')) {
            $('.nav-links').removeAttr('style');
        }
    });

  });

}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

exports.JekyllInfiniteScroll = JekyllInfiniteScroll;

var Emitter = __webpack_require__(3);
Emitter(JekyllInfiniteScroll.prototype);
function JekyllInfiniteScroll() {
  var self = this;

  this.postListSelector = '.posts';
  this.postSelector = 'article.post';

  this.navSelector = '.navigation';
  this.navNextSelector = '.next';

  this.postURLs;
  this.pageURLs;
  this.isFetching = false;
  this.shouldFetchPosts = false;
  this.loadNewPostsThreshold = 1000;

  this.nextLink = $(self.navSelector+' '+self.navNextSelector).attr('href');
  // Remove the navigation.
  if ($(self.navSelector).length > 0) {
    this.shouldFetchPosts = true;
  }
  $(self.navSelector).html('<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');

  $(window).scroll(function(e){
    self.onScroll();
  });
}

JekyllInfiniteScroll.prototype.fetchPosts = function() {
  this.isFetching = true;
  var self = this;
  self.emit('fetching');
  $.ajax({
    type: "GET",
    url: this.nextLink,
    cache: true,
    dataType: "html",
    success: function(data) {
      // Find loaded posts and append to page.
      data = $(data);
      var loadedPosts = data.find(self.postSelector);
      var lastPost = $(self.postListSelector+' '+self.postSelector+':last');
      lastPost.after(loadedPosts);
      // Get the new next page link.
      self.nextLink = data.find(self.navSelector+' '+self.navNextSelector).attr('href');
      if (!self.nextLink) self.fetchedAllPosts();
      // Done.
      self.isFetching = false;
      self.emit('fetched');
    }
  });
};


JekyllInfiniteScroll.prototype.fetchedAllPosts = function() {
  this.isFetching = false;
  $(this.navSelector).fadeOut();
};

JekyllInfiniteScroll.prototype.onScroll = function() {
  // Are we close to the end of the page? If we are, load more posts
  if (!this.nextLink || this.isFetching) return;

  var windowHeight = $(window).height();
  var windowScrollPosition = $(window).scrollTop();
  var bottomScrollPosition = windowHeight + windowScrollPosition;
  var documentHeight = $(document).height();

  // If we've scrolled past the loadNewPostsThreshold, fetch posts
  if ((documentHeight - this.loadNewPostsThreshold) < bottomScrollPosition) {
    this.fetchPosts();
  }
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Expose `Emitter`.
 */

if (true) {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports.ProcessingLoader = ProcessingLoader;

function ProcessingLoader() {
    this.sketches = {};
}

ProcessingLoader.prototype.load = function() {
    var self = this;
    var sketches = $('.processing-sketch');
    for (var i = 0; i < sketches.length; i++) {
        var canvas = $(sketches[i]);
        if (canvas.data('processing-status')) continue;
        var source = canvas.data('processing-sources');
        canvas.data('processing-status', 'loading');
        __webpack_require__.e/* require.ensure */(0).then((function(require) {
            var $script = __webpack_require__(5);
            $script('/js/libs/processing.min.js', function() {
                Processing.disableInit();
                var ResponsiveCanvas = __webpack_require__(6).ResponsiveCanvas;
                var responsiveCanvas = new ResponsiveCanvas(canvas.parent());
                Processing.loadSketchFromSources(canvas[0], [source], function(sketch) {
                    responsiveCanvas.resize();
                    canvas.data('processing-status', 'loaded');
                });
            });
        }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
    }
}


/***/ })
/******/ ]);