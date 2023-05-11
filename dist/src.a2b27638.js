// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/index.js":[function(require,module,exports) {
var _glimelab_endpoint = "http://127.0.0.1:8080";
var _glimelab_filter = "all";
function addNamespaceSelector() {
  var body = document.querySelector("body");
  console.log(body);
  var _default = "all";
  var options = [{
    title: "All (default)",
    value: "all"
  }, {
    title: "Web only",
    value: "web-only"
  }, {
    title: "Chat only",
    value: "chat-only"
  }];
  var isDefault = function isDefault(value) {
    return value == _default ? "selected" : "";
  };
  var optionsHtml = options.map(function (opt) {
    return "<option value=\"".concat(opt.value, "\" ").concat(isDefault(opt.value), ">").concat(opt.title, "</option>");
  });
  var wrapper = document.createElement("div");
  wrapper.id = "options-selector-wrapper";
  wrapper.innerHTML = "<form><label>Filter</label><select id=\"options-selector\"><option>Filter</option>".concat(optionsHtml, "</select>");
  body.appendChild(wrapper);
  document.getElementById("options-selector").addEventListener("change", function (e) {
    _glimelab_filter = e.target.value;
  });
}
function getMessageIds(chatBubbleId) {
  var URI = window.location.pathname.split("/");
  var serverId = URI[2];
  var channelId = URI[3];
  var idSplit = chatBubbleId.split("-");
  var messageId = idSplit[idSplit.length - 1];
  return {
    serverId: serverId,
    channelId: channelId,
    messageId: messageId
  };
}
function fetchGPTAnswer(GPTChatBubble, chatBubbleId) {
  var _getMessageIds = getMessageIds(chatBubbleId),
    serverId = _getMessageIds.serverId,
    channelId = _getMessageIds.channelId,
    messageId = _getMessageIds.messageId;
  fetch("".concat(_glimelab_endpoint, "/messages/?serverId=").concat(serverId, "&channelId=").concat(channelId, "&messageId=").concat(messageId)).then(function (response) {
    return response.json();
  }).then(function (json) {
    _messages[json.messageId] = {
      selected: json.versions.length - 1,
      versions: json.versions
    };
    var answer = _messages[json.messageId][_messages[json.messageId].selected].answer;
    setGPTResponse(GPTChatBubble, "".concat(answer), json.messageId);
  }).catch(function (_) {
    // console.log(err);
  });
}
function setGPTResponse(GPTChatBubble, response, messageId) {
  var responseEl = document.createElement("div").innerText = response;
  GPTChatBubble.style.display = "block";

  // update arrows

  GPTChatBubble.appendChild(el);
}
var _messages = {};
function addGPTButton() {
  var chatBubbles = document.querySelectorAll("li[id*=chat-messages]");
  var _loop = function _loop() {
    var chatBubble = chatBubbles[i];
    var content = chatBubble.querySelector("div[id*=message-content]").textContent;
    var findGptChatWraooer = chatBubble.querySelector("div[id=gpt-button-wrapper-".concat(chatBubble.id, "]"));
    if (!findGptChatWraooer) {
      findGptChatWraooer = document.createElement("div");
      findGptChatWraooer.id = "gpt-button-wrapper-".concat(chatBubble.id);
      var findGptChatBubble = chatBubble.querySelector("div[id=gpt-response-".concat(chatBubble.id, "]"));
      if (!findGptChatBubble) {
        findGptChatBubble = document.createElement("div");
        findGptChatBubble.id = "gpt-response-".concat(chatBubble.id);
      }
      findGptChatBubble.style.display = "none";

      // Create the arrows
      // <div><button>Prev</button><button>Next</button></div>

      var versionSelector = document.createElement("div");
      var prevButton = document.createElement("button");
      prevButton.innerText = "Previous";
      prevButton.onclick = function () {
        alert("Prev!");
      };
      var nextButton = document.createElement("button");
      nextButton.innerText = "Next";
      nextButton.onclick = function () {
        alert("Next!");
      };
      versionSelector.appendChild(prevButton);
      versionSelector.appendChild(nextButton);
      findGptChatBubble.appendChild(versionSelector);
      var findGptChatButton = document.createElement("button");
      findGptChatButton.id = "gpt-button-".concat(chatBubble.id);
      findGptChatButton.innerHTML = "<img style=\"height: 16px; width: 16px;\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAr5JREFUOI1tk11InnUYxn/X/3n8Wr6KgtDaigYFHXQQUQhRbESrBh1E0Fz6CiNIYoM62JhsoI/mmrYYRdJBDBakjjJoHTktomgnK6iDOvUotFWCH+/rnPk+z//qoAitXcf3fd3wu69LttmuXR+9uScN+TngENCMue6EoWp39i23kbYb/LN83eZKSJLxPIb1VLUum7eAGSCR9XXzLX+w2Jdt7DDQ+HhDqX35osz6Wjk7JqTmiaEuiTHBvKUJ4ZpNF/CAzRPV3uwP2aZ1arjb5j2gPcAjBFZjZAJok3RirWfwasel86Wll09VAUqTw+/K3FvpzZ5X6+TQ09FMy+oyvpzXpQ8leXE02A2VW7uHS4039hEYAw4YZos07W/YzKtFyu91oiNEc8aof613cG4bGTnoh+amG+cJfI/CBTVwH2IpzfOf81SvA7WotC0AD6chmf0fXnsoBH0hOILjaNzUS+t7OAFJZ5AfB5qC85UgsxqLeOffl6mluXdhyQ6vrfUMXl0rZ7OYM5LLpQW+coh3VeZ5BvisZgaCxSdWHNA3w6lNNxQXhQ+hqB3/hjkiryj6irMsFjGcMxxO68RIzayUFphDybHq3uLJ5kX6ZM62Tr4xCi4QY8DnecJGauoBnMQlmZYQa7QDW4JrUHzXvMiFUM/HwCnjqQjPYg38F1EaeQr4MeiOxhUgibX693PxoEy7/2QeOAlJ5/peTkp+NKJ/I1uaGNmPeDugsbD8Yv8aZkZ1W2c3erKFSjnrbWzgnko5e0EU+0oL/GQ4GPBUWoS7gUYpThuOr5YHv5RtSh+Odqhu65rhF8G0USJ8WOZ+pNOVcnbZ2C2Tw5cQqt7c3ee+vtrOLnz6TlPLZvVVyweAAngO6XSeJNNhK28LgePAwZjz2PrR7LfbtnG7ShMj+6U4BHQCy5iZoo6hm0eyX7fP/QWAi048PHhBHwAAAABJRU5ErkJggg==\" /> Ask ChatGPT-4";
      findGptChatButton.onclick = function (_) {
        var _getMessageIds2 = getMessageIds(chatBubble.id),
          serverId = _getMessageIds2.serverId,
          channelId = _getMessageIds2.channelId,
          messageId = _getMessageIds2.messageId;
        fetch("".concat(_glimelab_endpoint, "/messages"), {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            question: content,
            serverId: serverId,
            channelId: channelId,
            messageId: messageId,
            filter: _glimelab_filter
          })
        }).then(function (response) {
          return response.json();
        }).then(function (json) {
          _messages[json.messageId] = {
            selected: json.versions.length - 1,
            versions: json.versions
          };
          var answer = _messages[json.messageId][_messages[json.messageId].selected].answer;
          setGPTResponse(findGptChatBubble, "".concat(answer), messageId);
        }).catch(function (_) {
          setGPTResponse(findGptChatBubble, "Failure to fetch an answer.", messageId);
        });
      };
      chatBubble.appendChild(findGptChatWraooer);
      chatBubble.appendChild(findGptChatBubble);
      findGptChatWraooer.appendChild(findGptChatButton);
      fetchGPTAnswer(findGptChatBubble, chatBubble.id);
    }
  };
  for (var i = 0; i < chatBubbles.length; i++) {
    _loop();
  }
}
setInterval(addGPTButton, 300);
addNamespaceSelector();
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "37151" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map