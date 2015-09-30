define(["jquery", "../base", "../core/event"], function ($, base, event) {
    // tab
    var tab = function (selector, settings) {
        var _this = this;
        this.$tab = $(selector);
        this.settings = $.extend({
            defaultIndex: 0,
            selectedClass: "active",
            hierarchySelector: ">",
            tabSelector: ".js-tab-nav",
            tabItemSelector: "li",
            panelSelector: ".js-tab-panel"
        }, settings, this.$tab.data());
        this.settings.tabSelector = this.settings.hierarchySelector + this.settings.tabSelector;
        this.settings.tabItemSelector = this.settings.hierarchySelector + this.settings.tabItemSelector;
        this.settings.panelSelector = this.settings.hierarchySelector + this.settings.panelSelector;
        this.$tabNav = this.$tab.find(this.settings.tabSelector);
        this.$tabPanel = this.$tab.find(this.settings.panelSelector);
        this.event = new event(this);
        this._init();
        this._bindEvent();
    };
    tab.prototype = {
        _lastId: 0,
        _init: function () {
            var $tabs = this.$tabNav.find(this.settings.tabItemSelector);
            var $panels = this.$tabPanel.children();
            $tabs.each(function (i) {
                var $this = $(this);
                var id = $this.attr("data-tab-id");
                if (!id) {
                    id = base.generateId("tab");
                    $this.attr("data-tab-id", id);
                }
                $panels.eq(i).attr("data-tab-id", id);
            });
            this._lastId = $tabs.first().data("tab-id");
        },
        _bindEvent: function () {
            var _this = this;
            this.$tabNav.on("click", this.settings.tabItemSelector, function () {
                var $this = $(this);
                var id = $this.data("tab-id");
                _this.select(id);
            });
        },
        idTmpl: "[data-tab-id='{0}']",
        select: function (id) {
            var tabPanel = this.getTabPanel(id);
            var lastTabPanel = this.getTabPanel(this._lastId);

            lastTabPanel.$tab.removeClass(this.settings.selectedClass);
            tabPanel.$tab.show().addClass(this.settings.selectedClass);
            lastTabPanel.$panel.hide();
            tabPanel.$panel.show();

            this.event.fire("select", tabPanel, id, tabPanel.$tab.index())
            this._lastId = id;
        },
        selectByIndex: function (index) {
            var $tabs = this.$tabNav.find(this.settings.tabItemSelector);
            var id = $tabs.eq(index).data("tab-id");
            this.select(id);
        },
        getTabPanel: function (id) {
            var tabPanel = {};
            var f = base.format(this.idTmpl, id);
            tabPanel.$tab = this.$tabNav.find(this.settings.tabItemSelector).filter(f);
            tabPanel.$panel = this.$tabPanel.children().filter(f);
            return tabPanel;
        },
        reset: function () {
            var $nav = this.$tabNav.find(this.settings.tabItemSelector).eq(this.settings.defaultIndex);
            var id = $nav.data("tab-id");
            this.select(id);
        },
        getCurrent: function () {
            var $nav = this.$tabNav.find(this.settings.tabItemSelector).filter("." + this.settings.selectedClass);
            var id = $nav.data("tab-id");
            var tabPanel = this.getTabPanel(id);
            return tabPanel;
        }
    };
    return tab;
});