/// <reference path="../../_references.js" />

define(function () {
    var base = {
        generateId: function (name) {
            var id = name + "_" + String(Math.random()).slice(2);
            return id;
        }
    };
    return base;
});