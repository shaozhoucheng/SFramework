module core {
	/**
	 * 临时对象
	 * @author ly
	 *
	 */
    export const Temp = {
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
        voidFunction: function (...args): any { },

        /**
         * 用于替换的方法,接收任意长度的数据，返回null
         */
        willReplacedFunction: function (...args): any {
            if (DEBUG) {
                ThrowError(`需要被替换的方法，没有被替换，堆栈信息：${new Error().message}`);
            }
        },
        /**
         * 管线方法，用于符合函数的结构，并将数值传递下去
         */
        pipeFunction: function <T>(arg: T): T {
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
    }
    //冻结空对象，防止对此对象附加数据
    Object.freeze(Temp.EmptyObject);
    Object.freeze(Temp.EmptyArray);
}
