define(["jquery", "../core/event"], function ($, event) {
    var tip = function (message, wrapSelector, settings) {
        if (!(this instanceof tip)) {
            return new tip(message, wrapSelector, settings);
        }
        this.settings = $.extend({
            message: message,
            wrapSelector: wrapSelector || "body",
            timeout: 1200,
            auto: true
        }, settings);
        this.event = new event(this);
        this._init();
        this._bindEvent();
    };
    tip.prototype = {
        _init: function () {
            var $wrap = $(this.settings.wrapSelector);
            this.$tip = $("<div class='mak-tip'>");
            this.$tip.text(this.settings.message);
            this.$tip.appendTo(this.settings.wrapSelector);
            var position = $wrap.css("position");
            if ($wrap[0].tagName.toLowerCase() !== "body" && (!position || position === "static")) {
                $(this.settings.wrapSelector).css("position", "relative");
            }
            if ($wrap[0].tagName.toLowerCase() === "body") {
                this.$tip.css("position", "fixed");
            }
            if (this.settings.auto) {
                this.show();
                this.hide();
            }
        },
        _bindEvent: function () {
            var _this = this;
            this.$tip.on("click", function () {
                _this.$tip.remove();
            });
        },
        show: function () {
            this.$tip.css({
                "margin-left": -(this.$tip.outerWidth() / 2),
                "margin-top": -(this.$tip.outerHeight() / 2)
            });
            this.$tip.show();
        },
        hide: function () {
            var _this = this;
            setTimeout(function () {
                _this.$tip.remove();
                _this.event.fire("hide");
            }, this.settings.timeout);
        }
    };
    return tip;
});