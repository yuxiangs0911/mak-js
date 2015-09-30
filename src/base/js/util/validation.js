define(function () {
    var rinteger = /^\d+$/;
    var rmobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    var validation = {};
    validation.isInteger = function (v) {
        return rinteger.test(v);
    };
    validation.isMobile = function (v) {
        return rmobile.test(v);
    };
    return validation;
});