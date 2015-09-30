/// <reference path="../../../_references.js" />

define(["jquery", "base", "tip", "event"], function ($, base, tip, event) {
    var validation = function (selector, settings) {
        this.$form = $(selector);
        this.settings = $.extend({
            mode: "tip", // inline
            tipSelector: ".tip",
            tipSuccessClass: "tip-success iconfont icon-duigou",
            tipErrorClass: "tip-error",
            itemSelector: ".J_validItem",
            inputSelecot: ".J_validInput"
        }, settings, this.$form.data());
        this.event = new event(this);
        this._init();
        this._bindEvent();
    };
    validation.prototype = {
        validList: {
            format: "[data-{0}]",
            defaultTip: "valid-default",
            server: "valid-server",
            require: "valid-require",
            range: {
                selector: "valid-range",
                min: "valid-range-min",
                max: "valid-range-max"
            },
            remote: {
                selector: "valid-remote",
                url: "valid-remote-url",
                params: "valid-remote-params",
                action: "valid-remote-action",
                otherParams: "valid-remote-params-other"
            },
            mobile: "valid-mobile"
        },
        _init: function () {
            var _this = this;
            this.$items = this.$form.find(this.settings.inputSelecot);
            this.$items.each(function () {
                var $this = $(this);
                $this.data(_this.validList.defaultTip, _this.getTip($this).text());
                _this.show($this, "error", _this.validList.server);
            });
        },
        _bindEvent: function () {
            var _this = this;
            // inline 
            if (this.settings.mode === "inline") {
                this.$form.on("focusout", this.settings.inputSelecot, function () {
                    var $this = $(this);
                    _this.validItem($this, "focusout");
                });
            }
            this.$form.on("submit", function () {
                var v = _this.valid();
                _this.event.fire("submit", v);
                return v;
            });
        },
        getTip: function ($input) {
            var $tip = $input.siblings(this.settings.tipSelector);
            if (!$tip.length) {
                $tip = $input.parent().siblings(this.settings.tipSelector);
            }
            if (!$tip.length) {
                $tip = $input.closest(this.settings.itemSelector).find(this.settings.tipSelector);
            }
            return $tip;
        },
        valid: function () {
            var _this = this;
            var v = true;
            this.$items.each(function () {
                var $this = $(this);
                if (!_this.validItem($this, "submit")) {
                    v = false;
                }
                if (_this.settings.mode === "tip" && v === false) {
                    return false;
                }
            });
            return v;
        },
        validItem: function ($input, action) {
            var _this = this;
            var val = $.trim($input.val());

            // require
            if ($input.filter(base.format(this.validList.format, this.validList.require)).length) {
                if (this.getType($input) === "checkbox") {
                    if (!$input.prop("checked")) {
                        this.show($input, "error", this.validList.require);
                        return false;
                    }
                    else {
                        this.show($input, "success");
                        return true;
                    }
                }
                else {
                    if (!val) {
                        this.show($input, "error", this.validList.require);
                        return false;
                    }
                    else {
                        this.show($input, "success");
                    }
                }
            }

            if (!val) {
                this.show($input, "default", this.validList.defaultTip);
                return;
            }
            // range
            if ($input.filter(base.format(this.validList.format, this.validList.range.selector)).length) {
                var len = val.length;
                if (len < $input.data(this.validList.range.min) || len > $input.data(this.validList.range.max)) {
                    this.show($input, "error", this.validList.range.selector);
                    return false;
                }
            }
            // mobile
            if ($input.filter(base.format(this.validList.format, this.validList.mobile)).length) {
                if (!base.isMobile(val)) {
                    this.show($input, "error", this.validList.mobile);
                    return false;
                }
            }
            // remote
            if ($input.filter(base.format(this.validList.format, this.validList.remote.selector)).length
                && $input.data(this.validList.remote.action) === action) {
                var v;
                var params = $input.data(this.validList.remote.otherParams);
                params = params ? JSON.parse(params) : {}
                params[$input.data(this.validList.remote.params)] = val;
                base.ajax({
                    type: "post",
                    url: $input.data(this.validList.remote.url),
                    data: params,
                    async: false,
                    success: function (data) {
                        if (!data) {
                            _this.show($input, "error", _this.validList.remote.selector);
                            v = false;
                        }
                        else {
                            v = true;
                        }
                    }
                });
                if (!v) {
                    return false;
                }
            }
            this.show($input, "success");
            return true;
        },
        // mode : success , error
        // type : require, server..
        show: function ($input, mode, type) {
            type = type || "error";
            var message = $input.data(type);
            if (this.settings.mode === "inline") {
                var $tip = this.getTip($input);
                if (mode === "success") {
                    $tip.removeClass(this.settings.tipErrorClass).addClass(this.settings.tipSuccessClass);
                    $tip.text("");
                }
                else if (mode === "error") {
                    if (!message) {
                        return;
                    }
                    $tip.removeClass(this.settings.tipSuccessClass).addClass(this.settings.tipErrorClass);
                    $tip.text(message);
                }
                else if (mode === "default") {
                    $tip.removeClass(this.settings.tipSuccessClass + " " + this.settings.tipErrorClass);
                    $tip.text(message);
                }
            }
            else {
                if (!message) {
                    return;
                }
                if (mode === "error") {
                    tip(message, this.$form);
                }
            }
        },
        getType: function ($input) {
            var el = $input[0];
            if ($input.attr("type") === "checkbox") {
                return "checkbox";
            }
            else {
                return "text";
            }
        }
    };

    return validation;
});