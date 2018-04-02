/**
 * 对数字进行补0操作
 * @param value 要补0的数值
 * @param length 要补的总长度
 * @return 补0之后的字符串
 */
function zeroize(value: number, length: number = 2): string {
    let str = "" + value;
    let zeros = "";
    for (let i = 0, len = length - str.length; i < len; i++) {
        zeros += "0";
    }
    return zeros + str;
}


module core {
    /**
     * 加载脚本
     * @param url
     * @param callback
     * @param thisObj
     * @param args
     */
    export function loadScript(url: string, callback: Function, thisObj: any = null, ...args) {
        var script: any = document.createElement("script");
        script.type = "text/javascript";
        //检测客户端类型
        if (script.readyState) {//IE
            script.onreadystatechange = () => {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    callback.apply(thisObj, args);
                }
            }
        } else {//其他浏览器
            script.onload = () => {
                callback.apply(thisObj, args);
            }
        }
        script.src = url;
        // 调整为放到文档最后
        document.documentElement.appendChild(script);
    }

    export function is(instance: any, ref: { new (): any }): boolean {
        return egret.is(instance, egret.getQualifiedClassName(ref));
    }

    /**
     * 移除可视对象
     * 
     * @export
     * @param {egret.DisplayObject} display
     */
    export function removeDisplay(display: egret.DisplayObject) {
        if (display && display.parent) {
            display.parent.removeChild(display);
        }
    }

}

/****************************************扩展String****************************************/
interface String {
    /**
     * 替换字符串中{0}{1}{2}{a} {b}这样的数据，用obj对应key替换，或者是数组中对应key的数据替换
     */
    substitute(...args): string;
    substitute(args: any[]): string;
    /**
     * 对数字进行补0操作
     * @param length 要补的总长度
     * @return 补0之后的字符串
     */
    zeroize(length: number): string;
    /**
     * 将一个字符串转换成一个很小几率重复的数值<br/>
     * <font color="#ff0000">此方法hash的字符串并不一定唯一，慎用</font>
     */
    hash(): number;
}


Object.defineProperties(String.prototype, {
    zeroize: {
        value: function (length) { return zeroize(this, length) },
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
                } else {
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
interface StringConstructor {
    /**
     * 对数字进行补0操作
     * @param value 要补0的数值
     * @param length 要补的总长度
     * @return 补0之后的字符串
     */
    zeroize: (value: number, length: number) => string;

}

String.zeroize = zeroize;


/****************************************扩展Date****************************************/

interface Date {

    /**
     * 格式化日期
     * 
     * @param {string} mask 时间字符串
     * @param {boolean} [local] 是否基于本地时间显示，目前项目，除了报错信息，其他时间都用UTC时间显示
     * @returns {string} 格式化后的时间
     */
    format(mask: string, local?: boolean): string;
}

Object.defineProperties(Date.prototype, {
    format: {
        value: function (mask, local?: boolean) {
            let d: Date = this;
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
            function gd() { return local ? d.getDate() : d.getUTCDate() }
            function gM() { return local ? d.getMonth() : d.getUTCMonth() }
            function gy() { return local ? d.getFullYear() : d.getUTCFullYear() }
            function gH() { return local ? d.getHours() : d.getUTCHours() }
            function gm() { return local ? d.getMinutes() : d.getUTCMinutes() }
            function gs() { return local ? d.getSeconds() : d.getUTCSeconds() }
        },
        enumerable: false
    }
});


/****************************************扩展Array****************************************/

interface ArrayConstructor {
    /**
     * 将数组from的数据复制到数组to
     * 
     * @template T
     * @param {Array<T>} from
     * @param {Array<T>} to
     */
    copy<T>(from: Array<T>, to: Array<T>);

    /*降序*/
    DESC: number;
    /*升序*/
    ASC: number;
}
Array.copy = <T>(a: Array<T>, b: Array<T>) => {
    a.forEach((item, idx) => {
        b[idx] = a[idx];
    });
}

Array.ASC = 0;
Array.DESC = 1;

interface Array<T> {
    /**
     * 如果数组中没有要放入的对象，则将对象放入数组
     * 
     * @param {T} t 要放入的对象
     */
    pushOnce(t: T);

    /**
    * 
    * 删除某个数据
    * @param {T} t
    * @returns {boolean}   true 有这个数据并且删除成功
    *                      false 没有这个数据
    */
    remove(t: T): boolean;


    /**
     * 排序 支持多重排序
     * 降序, 升序
     * @param {string[]} kArr
     * @param {boolean[]} [dArr] 是否降序，默认升序
     */
    multiSort(kArr: string[], dArr?: boolean[]);
}

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
            let idx = this.indexOf(t);
            if (~idx) {
                this.splice(idx, 1);
                return true;
            }
            return false;
        },
        enumerable: false
    },
    multiSort: {
        value: function (kArr: string[], dArr?: boolean[]) {
            this.sort(sortFunc);
            function sortFunc(a: any, b: any): number {
                let isNullA = a == null || a == undefined;
                let isNullB = b == null || b == undefined;
                if (isNullA && isNullB) return 0;
                if (isNullA) return 1;
                if (isNullB) return -1;

                if (!kArr) {
                    let mode = !!dArr;
                    if (a < b) {
                        return mode ? 1 : -1;
                    }
                    else if (a > b) {
                        return mode ? -1 : 1;
                    }
                    else {
                        return 0;
                    }
                } else {
                    for (let idx = 0, len = kArr.length; idx < len; idx++) {
                        let key = kArr[idx];
                        let mode = dArr ? !!dArr[idx] : false;
                        let av = a[key];
                        let bv = b[key];
                        let typea = typeof av;
                        let typeb = typeof bv;
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


module egret {
    export interface Bitmap {
        /**
         * 刷新纹理
         */
        refreshBMD();
    }

    export interface EventDispatcher{
        on(type: string | number, listener: Function, thisObject?: any, useCapture?: boolean, priority?: number): void;
        once(type: string | number, listener: Function, thisObject?: any, useCapture?: boolean, priority?: number): void;
        off(type: string | number, listener: Function, thisObject: any, useCapture?: boolean): void;
        hasEventListener(type: string | number): boolean;
        willTrigger(type: string | number): boolean;
        dispatchEventWith(type: string | number, bubbles?: boolean, data?: any, cancelable?: boolean): boolean;
    }

    //  export interface DisplayObject{
    //     on(type: string | number, listener: Function, thisObject?: any, useCapture?: boolean, priority?: number): void;
    //     off(type: string | number, listener: Function, thisObject: any, useCapture?: boolean): void;
    // }


    export interface TextField {
        /**
         * 
         * 设置Html文本(慎用，废性能)
         * @param {string} value
         */
        setHtmlText(value: string);

        /**设置自动适配文本大小 在文本textfeildwidth 为NAN时  文本长度不会被截掉一部分 */
        setAutoSize();
    }
    export interface EventDispatcher {
        on(type: string | number, listener: Function, thisObject?: any, useCapture?: boolean, priority?: number): void;
        once(type: string | number, listener: Function, thisObject?: any, useCapture?: boolean, priority?: number): void;
        off(type: string | number, listener: Function, thisObject: any, useCapture?: boolean): void;
        hasEventListener(type: string | number): boolean;
        willTrigger(type: string | number): boolean;
        dispatchEventWith(type: string | number, bubbles?: boolean, data?: any, cancelable?: boolean): boolean;
    }
    (function () {
        var edp = EventDispatcher.prototype;
        edp.on = edp.addEventListener;
        edp.off = edp.removeEventListener;

        var dob = DisplayObject.prototype;
        dob.on = dob.addEventListener;
        dob.off = dob.removeEventListener;
        
        //重写bitmap  $Refresh
        var bpd = Bitmap.prototype;
        bpd.refreshBMD = function () {
            let tex = this.texture;
            this.texture = null;
            this.texture = tex;
        }
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
        const htmlTextParser = new HtmlTextParser();
        TextField.prototype.setHtmlText = function (value: string) {
            this.textFlow = htmlTextParser.parser(value);
        }

        TextField.prototype.setAutoSize = function () {
            this.width = NaN;
        }
    })();
}