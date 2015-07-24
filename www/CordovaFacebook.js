var CordovaFacebook = (function() {
    var SERVICE = "CordovaFacebook";
    var EVENT = "event";
    var PURCHASE = "purchase";
    var LOGIN = "login";
    var LOGOUT = "logout";
    var PROFILE = "profile";
    var GRAPH_REQUEST = "graphRequest";

    var eventsSent = 0;

    var exec = function() { cordova.exec.apply(cordova, arguments); }
    var defaultCallback = function() {};

    var exports = {};

    function convertProperties(obj) {
        if(obj == null) return obj;
        var converted = [];

        for(var key in obj) if(obj.hasOwnProperty(key)) {
            var val = obj[key];
            var type = typeof val;
            if(type === 'number') {
                type = (val % 1 === 0) ? 'integer' : 'double';
            } else if(type === 'object' || type === 'function') {
                console.log("CordovaFacebook: Warning: Dropping unsupported type " + type + " at key `" + key + "` in properties.");
                continue;
            }
            converted.push({ key: key, value: val, type: type });
        }
        return converted;
    }

    exports.logEvent = function logEventImpl(options) {
        options = options || {};
        var onSuccess = options.onSuccess || defaultCallback;
        var onFailure = options.onFailure || defaultCallback;

        exec(onSuccess, onFailure, SERVICE, EVENT, [options.name, options.value, convertProperties(options.properties)]);
    };

    exports.logPurchase = function logPurchaseImpl(options) {
        options = options || {};
        var onSuccess = options.onSuccess || defaultCallback;
        var onFailure = options.onFailure || defaultCallback;

        exec(onSuccess, onFailure, SERVICE, PURCHASE, [('' + options.amount), (options.currency || "USD"), convertProperties(options.properties)]);
    };

    exports.login = function(options) {
        options = options || {};
        var onSuccess = options.onSuccess || defaultCallback;
        var onFailure = options.onFailure || defaultCallback;

        exec(onSuccess, onFailure, SERVICE, LOGIN, [options.permissions]);
    };

    exports.graphRequest = function(options) {
        options = options || {};
        var onSuccess = options.onSuccess || defaultCallback;
        var onFailure = options.onFailure || defaultCallback;

        exec(onSuccess, onFailure, SERVICE, GRAPH_REQUEST, [options.path, options.params]);
    };

    function basicCall(action) {
        return function(options) {
            var onSuccess = (options && options.onSuccess) || defaultCallback;
            var onFailure = (options && options.onFailure) || defaultCallback;

            exec(onSuccess, onFailure, SERVICE, action, []);
        };
    }

    exports.logout = basicCall(LOGOUT);
    exports.profile = basicCall(PROFILE);

    return exports;
})();

if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.CordovaFacebook) {
    window.plugins.CordovaFacebook = CordovaFacebook;
}

if (typeof module != 'undefined' && module.exports) {
  module.exports = CordovaFacebook;
}