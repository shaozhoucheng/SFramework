module shao.sui {
	export class MPageList<T, R extends BaseListItemRender<T>> extends egret.EventDispatcher {
		public constructor() {
			super();
			this._renderList = [];
		}

		protected _renderList: R[];

		protected _data: T[];

		protected _selectedIndex: number = -1;

		/**
		 * 数据长度
		 * 
		 * @protected
		 * @type {number}
		 * @memberOf NewPageList
		 */
		protected dataLen: number;

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

		public displayList(data?: T[], params?: any) {
			this.clear();
			this._data = data;
			this._params = params;
			this.dataLen = data.length;
			if (!data || !data.length) {
				this.dispose();
				this.dataLen = 0;
				return;
			}

			//赋值
			let len = this._renderList.length;
			for (let i = 0; i < len; i++) {
				let render = this._renderList[i];
				if (render) {
					let data = this._data[i];
					render.params = this._params;
					if ("index" in render) {
						render["index"] = i;
					}
					render.setData(data);
				}
			}

			if (this._selectedIndex == -1 || this._selectedIndex >= this.dataLen) {
				this.selectedIndex = 0;
			}
		}

		public addItem(item: R) {
			if (item) {
				this._renderList.pushOnce(item);
				item.setChooseState(false);
				item.on(<any>SuiEvent.ITEM_TOUCH_TAP, this.touchItemrender, this);
			}
		}

		protected touchItemrender(e: egret.TouchEvent) {
			this.selectedItem = <R>e.target;
		}

		public getRenderList() {
			return this._renderList;
		}

		/**
		 *  清理数据
		 */
		public clear() {
			this._renderList.forEach(render => {
				if (render) {
					render.setData(undefined);
				}
			});
		}

		/**
		 * 销毁整个Mpagelist
		 */
		public dispose() {
			this.recycle();
			this._renderList.forEach(render => {
				if (render) {
					this.recycleRender(render);
				}
			});
			this._renderList.length = 0;
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
		 *  清理数据，并且销毁显示
		 */
		public recycle() {
			this.clear();
			this._selectedIndex = -1;
		}

		public set selectedIndex(value: number) {
			if (this._selectedIndex == value) return;
			let render = this._renderList[this._selectedIndex];
			if (render) {
				render.setChooseState(false);
			}
			this._selectedIndex = value;

			render = this._renderList[this._selectedIndex];
			if (render) {
				render.setChooseState(true);
			}

			this.dispatchEventWith(PageList.ITEM_SELECTED);
		}

		public get selectedIndex(): number {
			return this._selectedIndex;
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

		public set selectedItem(value: R) {
			this.selectedIndex = this._renderList.indexOf(value);
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
						if (dat[key] === value) {
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
						if (dat[key] === value) {
							item = this.getItemRenderAt(i);
							break;
						}
					}
				}

			}
			return [item, i];
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
				}
			}
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
			let render = this.getItemRender(key, value);
			if (render) {
				render.refreshData();
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
			}
			this._data[index] = data;
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
			}
			if (this._data && index in this._data) {
				this._data[index] = data;
			}
		}


	}
}