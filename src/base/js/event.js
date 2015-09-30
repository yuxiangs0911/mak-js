define(function () {
    var event = function (context) {
        this.context = context || this;
        this.callbacks = {};
    };
    event.prototype = {
        on: function (name, fn) {
            this.callbacks[name] = fn;
        },
        fire: function (name) {
            var fn = this.callbacks[name];
            if (fn) {
                fn.call(this.context, arguments);
            }
        }
    };
    return event;
});