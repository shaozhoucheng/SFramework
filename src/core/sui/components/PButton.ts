module shao.sui {
    //eui.Button 找不到怎么添加非透明区域点击 用这个做替代
    export class PButton extends eui.Image {
        public constructor() {
            super();
            this.setTouchUtil(true);
            this.touchEnabled = true;
            this.pixelHitTest = true;
        }

        protected touchUtil: TouchUtil;
        public set enabled(value: boolean) {
            if (this.enabled != value) {
                // this.filters = value ? null : FilterUtil.DarkGrayFilter;
            }
            this.setTouchUtil(value);
        }

        public setTouchUtil(value: boolean) {
            let util = this.touchUtil;
            if (util == undefined && value) {
                util = this.touchUtil = new TouchUtil(this);
            }
            if (util) {
                util.enabled = value;
            }
        }

		/**
		 * 绑定TOUCH_TAP的回调
		 * 
		 * @param {Function} handler
		 * @param {*} thisObject
		 * @param {number} [priority]
		 * @param {boolean} [useCapture]
		 * 
		 * @memberOf Button
		 */
        public bindTouch(handler: Function, thisObject: any, priority?: number, useCapture?: boolean) {
            this.on(egret.TouchEvent.TOUCH_TAP, handler, thisObject, useCapture, priority);
        }

		/**
		 * 解除TOUCH_TAP的回调的绑定
		 * 
		 * @param {Function} handler
		 * @param {*} thisObject
		 * @param {boolean} [useCapture]
		 * 
		 * @memberOf Button
		 */
        public looseTouch(handler: Function, thisObject: any, useCapture?: boolean) {
            this.off(egret.TouchEvent.TOUCH_TAP, handler, thisObject, useCapture);
        }
    }
}