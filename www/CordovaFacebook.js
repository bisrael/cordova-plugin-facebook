var CordovaFacebook = (function() {
    var SERVICE = "CordovaFacebook";
    var EVENT = "event";
    var PURCHASE = "purchase";

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
        var onSuccess = options.onSuccess || defaultCallback;
        var onFailure = options.onFailure || defaultCallback;

        exec(onSuccess, onFailure, SERVICE, EVENT, [options.name, options.value, convertProperties(options.properties)]);
    };

    exports.logPurchase = function logPurchaseImpl(options) {
        var onSuccess = options.onSuccess || defaultCallback;
        var onFailure = options.onFailure || defaultCallback;

        exec(onSuccess, onFailure, SERVICE, PURCHASE, [('' + options.amount), (options.currency || "USD"), convertProperties(options.properties)]);
    };

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