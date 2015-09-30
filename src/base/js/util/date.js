define(function () {
    // Date
    // 格式化为日常日期
    // 默认：yyyy-MM-dd hh:mm:ss
    Date.prototype.format = function (format) {
        if (!format) {
            format = "yyyy-MM-dd hh:mm:ss";
        }
        var o = {
            "M+": this.getMonth() + 1, //month    
            "d+": this.getDate(),    //day    
            "h+": this.getHours(),   //hour    
            "m+": this.getMinutes(), //minute    
            "s+": this.getSeconds(), //second    
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter    
            "S": this.getMilliseconds() //millisecond    
        }
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    };
    // 格式化为日期 yyyy-MM-dd
    Date.prototype.formatDate = function () {
        return this.format("yyyy-MM-dd");
    };
    // 格式化为时间 hh:mm:ss
    Date.prototype.formatTime = function () {
        return this.format("hh:mm:ss");
    };
});