module shao {

	/**
	 * 动画的全局对象
	 * @author 
	 *
	 */
	export const Global = (function () {

		let _callLater: CallLater;

		let _tweenManager: TweenManager;
		/**
    	 *  当前这一帧的时间
    	 */
		let _now: number = 0;
    	/**
    	 * 按照帧，应该走的时间
    	 * 每帧根据帧率加固定时间
    	 * 用于处理逐帧同步用
    	 */
		let _frameNow: number = 0;

		let _version: string = "";

		let _reConnect: boolean = true;

		let _dataParsed: boolean = false;



		return {
			initTick, callLater, clearCallLater, getTween, removeTween, setVersion, setConnect, setDataParsed,
			get tweenManager() {
				return _tweenManager || (_tweenManager = new TweenManager());
			},
			/**
			 *  当前这一帧的时间
			 */
			get now() {
				return _now;
			},
			/**
			 * 按照帧，应该走的时间
			 * 每帧根据帧率加固定时间
			 * 用于处理逐帧同步用
			 */
			get frameNow() {
				return _frameNow;
			},

			/**
			 *  版本管理
			 */
			get version() {
				// console.log("version is " + _version);
				return _version;
			},

			get connect() {
				return _reConnect;
			},

			get dataParesd() {
				return _dataParsed;
			}
		};

		function initTick() {
			let ticker = egret.ticker as any;
			let render = ticker.render;
			let delta = 1000 / 30;
			let callLater = _callLater;

			_callLater = new CallLater();
			_tweenManager || (_tweenManager = new TweenManager());

			ticker.render = () => {
				let now = Date.now();
				let old = this.now;
				if (DEBUG) {
					_now = now;
					_frameNow += delta;
					_callLater.tick(now);
					render.call(ticker, true, now - old);
					_tweenManager.tick(now - old);
				} else {
					try {
						_now = now;
						_frameNow += delta;
						_callLater.tick(now);
						render.call(ticker);
						_tweenManager.tick(now - old);
					} catch (e) {
						let msg = e.message;
						if (msg) {
							ReportError(msg);
						}
					}
				}

			}
		}

		function setVersion(value: string) {
			return _version = value;
		}

		function setConnect(value: boolean) {
			return _reConnect = value;
		}

		function setDataParsed() {
			return _dataParsed = true;
		}


		/**
		 * 延迟执行
		 * 
		 * @static
		 * @param {Function} callback (description)
		 * @param {number} [time] (description)
		 * @param {*} [thisObj] (description)
		 * @param args (description)
		 */
		function callLater(callback: Function, time?: number, thisObj?: any, ...args) {
			return _callLater.callLater(callback, Global.now, time, thisObj, ...args);
		}

		/**
		 * 清理延迟
		 * 
		 * @static
		 * @param {Function} callback (description)
		 * @param {*} [thisObj] (description)
		 * @returns (description)
		 */
		function clearCallLater(callback: Function, thisObj?: any) {
			return _callLater.clearCallLater(callback, thisObj);
		}

		/**
		 * 获取Tween
		 * 
		 * @static
		 * @param {*} target 要对那个对象做Tween处理
		 * @param {*} props Tween的附加属性 (如： `{loop:true, paused:true}`).
		 * All properties default to `false`. Supported props are:
		 * <UL>
		 *    <LI> loop: sets the loop property on this tween.</LI>
		 *    <LI> useTicks: uses ticks for all durations instead of milliseconds.</LI>
		 *    <LI> ignoreGlobalPause: sets the {{#crossLink "Tween/ignoreGlobalPause:property"}}{{/crossLink}} property on
		 *    this tween.</LI>
		 *    <LI> override: if true, `createjs. this.removeTweens(target)` will be called to remove any other tweens with
		 *    the same target.
		 *    <LI> paused: indicates whether to start the tween paused.</LI>
		 *    <LI> position: indicates the initial position for this tween.</LI>
		 *    <LI> onChange: specifies a listener for the {{#crossLink "Tween/change:event"}}{{/crossLink}} event.</LI>
		 * </UL>
		 * @param {*} pluginData 插件数据
		 * @param {boolean} override 是否覆盖
		 * @returns {Tween} tween的实例
		 */
		function getTween(target: any, props?: any, pluginData?: any, override?: boolean) {
			return _tweenManager.get(target, props, pluginData, override);
		}

		function removeTween(target: any) {
			if (target) _tweenManager.removeTweens(target);
		}
	})();
}



















