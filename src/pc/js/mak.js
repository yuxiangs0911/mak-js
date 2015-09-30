define([
    "base/js/base",
    "base/js/util/datetime",
    "base/js/util/repeatRequest",
    "base/js/util/serialization",
    "base/js/util/string",
    "base/js/util/validation",
    "base/js/widget/tab",
    "base/js/widget/tip",
    "base/js/widget/validation",
], function (base, datetime, repeatRequest, serialization, string, validation, tab, tip, widgetValidation) {
    base.datetime = datetime;
    base.repeatRequest = repeatRequest;
    base.serialization = serialization;
    base.string = string;
    base.validation = validation;

    // widget
    base.widget.tab = tab;
    base.widget.tip = tip;
    base.widget.validation = widgetValidation;

    return base;
});