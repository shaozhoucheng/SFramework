var core;
(function (core) {
    /**
     * 临时对象
     * @author ly
     *
     */
    core.Temp = {
        /**
         * 共享数组1
         */
        SharedArray1: [],
        /**
         * 共享数组2
         */
        SharedArray2: [],
        /**
         * 共享数组3
         */
        SharedArray3: [],
        /**
         * 共享点1
         */
        SharedPoint1: { x: 0, y: 0, z: 0 },
        /**
         * 共享点2
         */
        SharedPoint2: { x: 0, y: 0, z: 0 },
        /**
         * 不做任何事情的空方法，接收任意长度的数据，返回空
         */
        voidFunction: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        },
        /**
         * 用于替换的方法,接收任意长度的数据，返回null
         */
        willReplacedFunction: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (true) {
                core.ThrowError("\u9700\u8981\u88AB\u66FF\u6362\u7684\u65B9\u6CD5\uFF0C\u6CA1\u6709\u88AB\u66FF\u6362\uFF0C\u5806\u6808\u4FE1\u606F\uFF1A" + new Error().message);
            }
        },
        /**
         * 管线方法，用于符合函数的结构，并将数值传递下去
         */
        pipeFunction: function (arg) {
            return arg;
        },
        /**
         * 空对象
         */
        EmptyObject: {},
        /**
         * 空数组
         */
        EmptyArray: []
    };
    //冻结空对象，防止对此对象附加数据
    Object.freeze(core.Temp.EmptyObject);
    Object.freeze(core.Temp.EmptyArray);
})(core || (core = {}));
//# sourceMappingURL=Temp.js.map