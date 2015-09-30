define(function () {
    var serialization = {
        deserialize: function (objectString) {
            var keys = {};
            var e, k, v,
                r = /([^&=]+)=?([^&]*)/g,
                a = /\+/g,
                d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
                param = objectString;

            var ch = param.charAt(0);
            if (ch === '?' || ch === '#') {
                param = param.slice(1);
            }
            while (e = r.exec(param)) {
                k = d(e[1]);
                v = d(e[2]);
                keys[k] = v;
            }
            return keys;
        }
    };
    return serialization;
});