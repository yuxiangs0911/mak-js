define(function () {
    var string = {
        format: function (s, args) {
            if (arguments.length === 0) {
                return "";
            }
            var str = s;
            for (var i = 1, len = arguments.length; i < len; i++) {
                var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
                str = str.replace(re, arguments[i]);
            }
            return str;
        }
    };
    return string;
});