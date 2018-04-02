/**
 * 对数字进行补0操作
 * @param value 要补0的数值
 * @param length 要补的总长度
 * @return 补0之后的字符串
 */
function zeroize(value, length) {
    if (length === void 0) { length = 2; }
    var str = "" + value;
    var zeros = "";
    for (var i = 0, len = length - str.length; i < len; i++) {
        zeros += "0";
    }
    return zeros + str;
}
var core;
(function (core) {
    /**
     * 加载脚本
     * @param url
     * @param callback
     * @param thisObj
     * @param args
     */
    function loadScript(url, callback, thisObj) {
        if (thisObj === void 0) { thisObj = null; }
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        var script = document.createElement("script");
        script.type = "text/javascript";
        //检测客户端类型
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    callback.apply(thisObj, args);
                }
            };
        }
        else {
            script.onload = function () {
                callback.apply(thisObj, args);
            };
        }
        script.src = url;
        // 调整为放到文档最后
        document.documentElement.appendChild(script);
    }
    core.loadScript = loadScript;
    function is(instance, ref) {
        return egret.is(instance, egret.getQualifiedClassName(ref));
    }
    core.is = is;
    /**
     * 移除可视对象
     *
     * @export
     * @param {egret.DisplayObject} display
     */
    function removeDisplay(display) {
        if (display && display.parent) {
            display.parent.removeChild(display);
        }
    }
    core.removeDisplay = removeDisplay;
})(core || (core = {}));
Object.defineProperties(String.prototype, {
    zeroize: {
        value: function (length) { return zeroize(this, length); },
        enumerable: false
    },
    substitute: {
        value: function (args) {
            var len = arguments.length;
            if (len > 0) {
                var obj;
                if (len == 1) {
                    obj = arguments[0];
                    if (typeof obj !== "object") {
                        obj = arguments;
                    }
                }
                else {
                    obj = arguments;
                }
                if ((obj instanceof Object) && !(obj instanceof RegExp)) {
                    return this.replace(/\{([^{}]+)\}/g, function (match, key) {
                        var value = obj[key];
                        return (value !== undefined) ? '' + value : '';
                    });
                }
            }
            return this;
        },
        enumerable: false
    },
    hash: {
        value: function () {
            var len = this.length;
            var hash = 5381;
            for (var i = 0; i < len; i++) {
                hash += (hash << 5) + this.charCodeAt(i);
            }
            return hash & 0x7fffffff;
        },
        enumerable: false
    }
});
String.zeroize = zeroize;
Object.defineProperties(Date.prototype, {
    format: {
        value: function (mask, local) {
            var d = this;
            return mask.replace(/"[^"]*"|'[^']*'|(?:d{1,2}|m{1,2}|yy(?:yy)?|([hHMs])\1?)/g, function ($0) {
                switch ($0) {
                    case "d": return gd();
                    case "dd": return zeroize(gd());
                    case "M": return gM() + 1;
                    case "MM": return zeroize(gM() + 1);
                    case "yy": return String(gy()).substr(2);
                    case "yyyy": return gy();
                    case "h": return gH() % 12 || 12;
                    case "hh": return zeroize(gH() % 12 || 12);
                    case "H": return gH();
                    case "HH": return zeroize(gH());
                    case "m": return gm();
                    case "mm": return zeroize(gm());
                    case "s": return gs();
                    case "ss": return zeroize(gs());
                    default: return $0.substr(1, $0.length - 2);
                }
            });
            function gd() { return local ? d.getDate() : d.getUTCDate(); }
            function gM() { return local ? d.getMonth() : d.getUTCMonth(); }
            function gy() { return local ? d.getFullYear() : d.getUTCFullYear(); }
            function gH() { return local ? d.getHours() : d.getUTCHours(); }
            function gm() { return local ? d.getMinutes() : d.getUTCMinutes(); }
            function gs() { return local ? d.getSeconds() : d.getUTCSeconds(); }
        },
        enumerable: false
    }
});
Array.copy = function (a, b) {
    a.forEach(function (item, idx) {
        b[idx] = a[idx];
    });
};
Array.ASC = 0;
Array.DESC = 1;
Object.defineProperties(Array.prototype, {
    pushOnce: {
        value: function (t) {
            if (!~this.indexOf(t)) {
                this.push(t);
            }
        },
        enumerable: false
    },
    remove: {
        value: function (t) {
            var idx = this.indexOf(t);
            if (~idx) {
                this.splice(idx, 1);
                return true;
            }
            return false;
        },
        enumerable: false
    },
    multiSort: {
        value: function (kArr, dArr) {
            this.sort(sortFunc);
            function sortFunc(a, b) {
                var isNullA = a == null || a == undefined;
                var isNullB = b == null || b == undefined;
                if (isNullA && isNullB)
                    return 0;
                if (isNullA)
                    return 1;
                if (isNullB)
                    return -1;
                if (!kArr) {
                    var mode = !!dArr;
                    if (a < b) {
                        return mode ? 1 : -1;
                    }
                    else if (a > b) {
                        return mode ? -1 : 1;
                    }
                    else {
                        return 0;
                    }
                }
                else {
                    for (var idx = 0, len = kArr.length; idx < len; idx++) {
                        var key = kArr[idx];
                        var mode = dArr ? !!dArr[idx] : false;
                        var av = a[key];
                        var bv = b[key];
                        var typea = typeof av;
                        var typeb = typeof bv;
                        if (typea == "object" || typeb == "object") {
                            core.ThrowError("multiSort value类型不应为object");
                            return 0;
                        }
                        else if (typea != typeb) {
                            core.ThrowError("multiSort value类型不一致");
                            return 0;
                        }
                        else if (av < bv) {
                            return mode ? 1 : -1;
                        }
                        else if (av > bv) {
                            return mode ? -1 : 1;
                        }
                        else {
                            continue;
                        }
                    }
                    return 0;
                }
            }
        },
        enumerable: false
    }
});
/****************************************Map********************************************/
var egret;
(function (egret) {
    (function () {
        var edp = egret.EventDispatcher.prototype;
        edp.on = edp.addEventListener;
        edp.off = edp.removeEventListener;
        var dob = egret.DisplayObject.prototype;
        dob.on = dob.addEventListener;
        dob.off = dob.removeEventListener;
        //重写bitmap  $Refresh
        var bpd = egret.Bitmap.prototype;
        bpd.refreshBMD = function () {
            var tex = this.texture;
            this.texture = null;
            this.texture = tex;
        };
        /**重写Bitmap.prototype.$refreshImageData用于支持egret的webgl渲染 */
        // let $rawRefreshImageData = bpd.$refreshImageData;
        // bpd.$refreshImageData = function () {
        //     $rawRefreshImageData.call(this);
        //     let values = this.$Bitmap;
        //     egret.sys.BIT
        //     let bmd = values[egret.sys.BitmapKeys.image];
        //     if (bmd) {
        //         values[egret.sys.BitmapKeys.sourceWidth] = bmd.width;
        //         values[egret.sys.BitmapKeys.sourceHeight] = bmd.height;
        //     }
        // }
        var htmlTextParser = new egret.HtmlTextParser();
        egret.TextField.prototype.setHtmlText = function (value) {
            this.textFlow = htmlTextParser.parser(value);
        };
        egret.TextField.prototype.setAutoSize = function () {
            this.width = NaN;
        };
    })();
})(egret || (egret = {}));
//# sourceMappingURL=Extend.js.map