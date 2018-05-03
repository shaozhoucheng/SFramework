module core.sui {
	export class PageList<T, R extends BaseListItemRender<T>> extends egret.Sprite {

		public static ITEM_SELECTED: string = "ITEM_SELECTED";

		protected _renderClass: { new (): R };

		protected _columnWidth: number;

		protected _rowHeight: number;

		protected _train: boolean;

		protected _columnCount: number;

		protected _renderList: R[];

		protected _data: T[];

		public scroller: Scroller;

		public _renderRect: egret.Rectangle;

		protected startIndex: number;

		protected endIndex: number;

		protected _selectedIndex: number = -1

		public isNeedMoveToSelect: boolean = false;

		protected _selectFunction: Function;

		/**
		 * 额外参数
		 * 
		 * @protected
		 * @type {*}
		 * @memberOf NewPageList
		 */
		protected _params: any;

		public set params(value: any) {
			this._params = value;
			if (!this._renderList || !this._renderList.length) return;
			this._renderList.forEach(render => {
				if (render)
					render.params = value;
			});
		}


		/**
		 * 数据长度
		 * 
		 * @protected
		 * @type {number}
		 * @memberOf NewPageList
		 */
		protected dataLen: number;

		/**
		 * 等待刷新index
		 * 
		 * @protected
		 * @type {number[]}
		 * @memberOf NewPageList
		 */
		protected _waitUpdateIndexs: number[];

		/**触摸中 */
		protected _isInTouch: boolean = false;

		/**
		 * Creates an instance of NewPageList.
		 * 
		 * @param {{ new (): R }} renderClass   必须，需要加载的单元容器对象
		 * @param {number} columnWidth  必须，单元之间的宽度
		 * @param {number} rowHeight  必须，单元之间的高度
		 * @param {boolean} [train=true]  排列方式，true 为优先x排列再向下延伸,false 横排 为优先y排列再向右延伸 ，默认为 true
		 * @param {number} [columnCount=1] 每行\列最多排列数，默认为 1
		 * 
		 * @memberOf NewPageList
		 */
		public constructor(renderClass: { new (): R }, columnWidth: number, rowHeight: number, train: boolean = true, columnCount: number = 1) {
			super();
			this.touchEnabled = false;

			this._renderClass = renderClass;
			this._columnWidth = columnWidth;
			this._rowHeight = rowHeight;
			this._train = train;
			this._columnCount = columnCount;
			this.scroller = null;

			this._renderRect = new egret.Rectangle(0, 0, columnWidth, rowHeight);
			this._renderList = [];
			this._waitUpdateIndexs = [];

			this.on(<any>SuiEvent.SCROLL_POSITION_CHANGE, this.scrollPositionChange, this);

			this.on(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
			this.on(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
			this.on(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
		}

		protected onTouchBegin(e: egret.Event) {
			this._isInTouch = true;
		}

		protected onTouchEnd(e: egret.Event) {
			this._isInTouch = false;
		}


		/**绑定滚动 */
		public bindScroller(rect: egret.Rectangle, scrollType: number = 0) {
			let scroller = new sui.Scroller();
			scroller.scrollType = scrollType;
			scroller.bindObj(this, rect);
		}

		/**
		 * list 赋值
		 * 
		 * @param {T[]} [data]
		 * @param {*} [params] 额外参数
		 * @returns
		 * 
		 * @memberOf NewPageList
		 */
		public displayList(data?: T[], params?: any) {
			// this.clear();
			this._data = data;
			this._params = params;
			if (!data || !data.length) {
				this.dispose();
				this.dataLen = 0;
				return;
			}
			this.dataLen = data.length;
			for (let i = 0; i < this.dataLen; i++) {
				this._waitUpdateIndexs.pushOnce(i);
			}

			this.sortChildren();

			if (this.scroller && !this._isInTouch) {
				this.scroller.scrollToHead();
			}
			this.scrollPositionChange();

			if (this._selectedIndex == -1 || this._selectedIndex >= this.dataLen) {
				this.selectedIndex = 0;
			}
		}

		public scrollPositionChange(e?: egret.Event) {
			let rect = this.scrollRect;
			if (!this._data) return;
			let dlen = this.dataLen;
			let startIndex = undefined;
			let endIndex: number;
			//如果没有绑定滚动条的，那么就表示全在视野内，一次性全部加载渲染
			//如果绑定滚动条了，找到视野内最上（左）边的itemindex，作为起始点
			if (!rect) {
				startIndex = 0;
				endIndex = startIndex + dlen - 1;
			} else {
				let r = this._renderRect;
				for (let i = 0; i < dlen; i++) {
					let [x, y] = this.getRenderPosByIndex(i);
					r.setTo(x, y, this._columnWidth, this._rowHeight);
					if (startIndex == undefined) {
						if (rect.intersects(r)) {
							startIndex = i;
						}
					} else {
						if (!rect.intersects(r)) {
							endIndex = i;
							break;
						}
					}
				}
			}
			if (endIndex == undefined) endIndex = dlen - 1;
			endIndex = Math.min(endIndex, dlen - 1);
			this.startIndex = startIndex;
			this.endIndex = endIndex;
			this.doRenderListItem(startIndex, endIndex);
		}

		/**
	   * 渲染指定位置的render
	   * 
	   * @ protected
	   * @ param {number} start (起始索引)
	   * @ param {number} end (结束索引)
	   */
		protected doRenderListItem(start: number, end: number) {
			let render: R;
			let len = this._renderList.length;
			for (let i = 0; i < len; i++) {
				if (start <= i && i <= end) continue;
				render = this._renderList[i];
				if (!render) continue;
				this.recycleRender(render);
				this._renderList[i] = undefined;
			}
			let data = this._data;
			for (let i = start; i <= end; i++) {
				render = this.getOrCreateItemRenderAt(i);
				let tmp = render.getData();
				if (!tmp || tmp != data[i] || render["dataChange"] || this._waitUpdateIndexs.indexOf(i) != -1) {
					render.setData(data[i]);
					render.handleView();
					if (render["dataChange"]) {
						render["dataChange"] = false;
					}
					this._waitUpdateIndexs.remove(i);
				}

				let [x, y] = this.getRenderPosByIndex(i);
				render.x = x;
				render.y = y;
				this.addChild(render);
			}
		}


		protected getOrCreateItemRenderAt(index: number) {
			let render = this._renderList[index];
			if (!render) {
				render = ObjectPool.getObject(this._renderClass);
				render.on(<any>SuiEvent.ITEM_TOUCH_TAP, this.touchItemrender, this);
				if ("inited" in render) {
					if (!render["inited"]) {
						render["bindComponent"]();
					}
				}
				this._renderList[index] = render;
			}
			if ("index" in render) {
				render["index"] = index;
				render.isFirst = index == 0;
				render.isLast = index == this.dataLen - 1;
			}
			render.setChooseState(index == this.selectedIndex ? true : false);
			render.params = this._params;
			return render;
		}

		protected touchItemrender(e: egret.TouchEvent) {
			if (this._selectFunction && !this._selectFunction(e.target)) {
				return;
			}
			this.selectedItem = <R>e.target;
		}


		/**
		 * 回收Render
		 * 
		 * @protected
		 * 
		 * @memberOf NewPageList
		 */
		protected recycleRender(render: R) {
			if (render) {
				removeDisplay(render.renderView);
				ObjectPool.disposeObject(render);
			}
		}

		/**
		 * 据index取得位置
		 * 
		 * @protected
		 * @param {number} index
		 * @returns {[number, number]}
		 * 
		 * @memberOf NewPageList
		 */
		protected getRenderPosByIndex(index: number): [number, number] {
			let x: number;
			let y: number;
			let count = this._columnCount;
			let m: number = Math.floor(index / count);
			let n: number = index % count;
			if (this._train) {
				x = n * this._columnWidth;
				y = m * this._rowHeight;
			} else {
				x = m * this._columnWidth;
				y = n * this._rowHeight;
			}
			return [x, y]
		}

		protected sortChildren() {
			let len = this.dataLen;
			let m = Math.ceil(len / this._columnCount);
			let n = len % this._columnCount;
			if (this._train) {
				this.height = m * this._rowHeight;
				if (m > 1 || n == 0) n = this._columnCount;
				this.width = n * this._columnWidth;
			} else {
				this.width = m * this._columnWidth;
				if (m > 1 || n == 0) n = this._columnCount;
				this.height = n * this._rowHeight;
			}

			let g = this.graphics;
			let rect = this.scrollRect;
			g.clear();
			if (rect) {
				g.beginFill(0, 0);
				g.drawRect(rect.x, rect.y, rect.width, rect.height);
				g.endFill();
			}
		}

		public moveScroll(value: number) {
			if (!this.scrollRect) return;
			let rect: egret.Rectangle = this.scrollRect;
			let [rx, ry] = this.getRenderPosByIndex(value)
			let oldPos: number;
			let dis: number;
			if (!this.scroller) return;
			if (this.scroller.scrollType == 1) {
				oldPos = rect.x;
				rect.x = rx + (this._columnWidth - rect.width) / 2;
				if (rect.x <= 0) {
					rect.x = 0;
				}
				this.scrollRect = rect;
				dis = rect.x - oldPos;
			} else {
				oldPos = rect.y;
				rect.y = ry + (this._rowHeight - rect.height) / 2;
				if (rect.y <= 0) {
					rect.y = 0;
				}
				this.scrollRect = rect;
				dis = rect.y - oldPos;
			}
			this.scrollPositionChange();
			// let scroller = this.scroller;
			// if (scroller) {
			// 	scroller.doMoveScrollBar(-dis);
			// }
		}

		public getRenderList() {
			return this._renderList;
		}

		public dispose() {
			this.recycle();
		}

		public recycle() {
			this.clear();
			this.graphics.clear();
			this.width = 0;
			this.height = 0;
			this._data = undefined;
			this._selectedIndex = -1;
			this._waitUpdateIndexs = [];
			this.params = undefined;
		}

		public clear() {
			this._renderList.forEach(render => {
				if (render) {
					this.recycleRender(render);
				}
			});
			this._renderList.length = 0;
		}

		public moveTo(x: number, y: number) {
			this.x = x;
			this.y = y;
		}

		/**
	   * 强制刷新指定render
	   * 
	   * @param {string} key
	   * @param {*} value
	   * @param {*} data
	   * 
	   * @memberOf NewPageList
	   */
		public updateItemDataByData(key: string, value: any, data: any) {
			let [item, index] = this.getItemRenderAndIndex(key, value);
			if (item) {
				item.setData(data);
			} else {
				this._waitUpdateIndexs.pushOnce(index);
			}
			if (this._data && index in this._data) {
				this._data[index] = data;
			}
		}

		/**
		  * 强制刷新指定render
		  * 
		  * @param {*} data
		  * 
		  * @memberOf NewPageList
		  */
		public updateItemByData(data: any) {
			let index = this._data.indexOf(data);
			if (index == -1) return;
			let render = this._renderList[index];
			if (render) {
				render.setData(data);
			} else {
				this._waitUpdateIndexs.pushOnce(index);
			}
			this._data[index] = data;
		}

        /**
         * 强制刷新指定render
         * 
         * @param {string} key
         * @param {*} value
         * 
         * @memberOf PageList
         */
		public updateItemByKey(key: string, value: any) {
			let [item, index] = this.getItemRenderAndIndex(key, value);
			if (item) {
				item.refreshData();
			} else {
				this._waitUpdateIndexs.pushOnce(index);
			}
		}

		/**
		 * 整体更新
		 * 
		 * 
		 * @memberOf NewPageList
		 */
		public updateAll() {
			for (let i = 0; i < this.dataLen; i++) {
				let render = this._renderList[i];
				if (render) {
					render.refreshData();
				} else {
					this._waitUpdateIndexs.pushOnce(i);
				}
			}
		}

		/**
		* 
		* 通过搜索数据，获取Render
		* @param {string} key
		* @param {*} value
		* @returns
		*/
		public getItemRenderAndIndex(key: string, value: any): [R, number] {
			let data = this._data;
			if (!data) return [null, -1];
			let len = data.length;
			let item: R;
			let i = 0;
			for (; i < len; i++) {
				let dat = data[i];
				if (dat) {
					if (key in dat) {
						if (dat[key] == value) {
							item = this.getItemRenderAt(i);
							break;
						}
					}
				}

			}
			return [item, i];
		}

		/**
		*  
		* 通过搜索数据，获取Render
		* @param {string} key
		* @param {*} value
		* @returns
		*/
		public getItemRender(key: string, value: any): R {
			let data = this._data;
			if (!data) return null;
			let len = data.length;
			let item: R;
			let i = 0;
			for (; i < len; i++) {
				let dat = data[i];
				if (dat) {
					if (key in dat) {
						if (dat[key] == value) {
							return this.getItemRenderAt(i);
						}
					}
				}
			}
			return null;
		}

		/**
		* 
		* 通过搜索数据，获取Render
		* @param {string} key
		* @param {*} value
		* @returns
		*/
		public getItemRenderByData(value: T): R {
			let data = this._data;
			if (!data) return null;
			let i = data.indexOf(value);
			return this.getItemRenderAt(i);
		}

		/**
         * 
         * 根据索引获得视图
         * @param {number} index
         * @returns
         */
		public getItemRenderAt(index: number) {
			return this._renderList[index];
		}

		public set selectData(data: T) {
			if (this._data)
				this.selectedIndex = this._data.indexOf(data);
		}

		public get selectData(): T {
			if (!this._data) return undefined;
			return this._data[this._selectedIndex];
		}

		public get selectedItem(): R {
			let render = this._renderList[this._selectedIndex];
			return render;
		}

		private _height: number
		public set height(value: number) {
			if (this._height == value) return;
			this._height = value;
		}

		private _width: number
		public set width(value: number) {
			if (this._width == value) return;
			this._width = value;
		}

		public get height(): number {
			return this._height;
		}

		public get width(): number {
			return this._width;
		}

		public set selectedItem(value: R) {
			let data = value.getData();
			this.selectedIndex = this._data.indexOf(data);
		}

		public set selectedIndex(value: number) {
			//if (this._selectedIndex == value) return;
			let render = this._renderList[this._selectedIndex];
			if (render) {
				render.setChooseState(false);
			}
			this._selectedIndex = value;

			//滚动到选中处
			if (this.isNeedMoveToSelect) {
				this.moveScroll(this._selectedIndex);
			}

			render = this._renderList[this._selectedIndex];
			if (render) {
				render.setChooseState(true);
			}

			this.dispatchEventWith(PageList.ITEM_SELECTED)
		}

		public get selectedIndex(): number {
			return this._selectedIndex;
		}

		/**显示宽度 */
		public get showWidth(): number {
			if (!this.scrollRect) {
				return this.width;
			}
			return Math.min(this.width, this.scrollRect.width);
		}

		/**显示高度 */
		public get showHeight(): number {
			if (!this.scrollRect) {
				return this.height;
			}
			return Math.min(this.height, this.scrollRect.height);
		}

		public get dataLength(): number {
			return this.dataLen;
		}

		public getCurrentScrollRectPosition() {
			if (!this.scrollRect) return 0;
			return this.scrollRect.x;
		}

		public setScrollRectPosition(value: number) {
			if (!this.scrollRect) return;
			if (this._isInTouch) return;
			let rect = this.scrollRect;
			value = Math.min(this.width - rect.width, value);
			value = Math.max(value, 0);
			rect.x = value;
			this.scrollRect = rect;
			this.scrollPositionChange();

		}

		public set SelectFunction(func: Function) {
			this._selectFunction = func;
		}


	}
}