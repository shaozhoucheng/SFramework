module shao {

	/**
	 * 方向性容器
	 * @author dcx
	 * 
	 */
	export class OrientationContainer extends egret.Sprite {

		/**
		 * 过滤函数, 参数是child显示对象, 返回值为true表示忽略计算位置
		 */
		protected _filter: Function;
		protected _orientation: string;
		protected _space: number;
		protected _childStartX: number = 0;
		protected _childStartY: number = 0;
		protected _width: number = 0;
		protected _height: number = 0;
		protected thisObj: any;
		/**
		 * 是否需要对齐
		 * 
		 * @protected
		 * @type {boolean}
		 * @memberOf OrientationBox
		 */
		protected _isAlign: boolean = true;

		protected _validated: boolean = true;

		protected _defaltFilter(d: egret.DisplayObject): boolean {
			return !d.visible;
		}

		public constructor(space: number = 5, orientation: string = OrientationType.HORIZONTAL, filter?: Function, thisObj?: any) {
			super();
			this._space = space;
			this._orientation = orientation;
			this._filter = filter || this._defaltFilter;
			this.thisObj = thisObj || this;
			this.on(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
			this.on(egret.Event.ADDED, this.onValidate, this);
			this.off(egret.Event.REMOVED, this.onValidate, this);
		}

		protected onValidate(e: egret.Event) {
			let target: egret.IEventDispatcher = e.target as egret.IEventDispatcher;
			if (target == this) return;
			if (e.type == egret.Event.ADDED) {
				target.addEventListener(egret.Event.RESIZE, this.onValidate, this);
			}
			else if (e.type == egret.Event.REMOVED) {
				target.removeEventListener(egret.Event.RESIZE, this.onValidate, this);
			}
			if (!this._validated) {
				this._validated = true;
			}
		}

		protected onEnterFrame(e?: egret.Event) {
			if (!this._validated) return;
			this._validated = false;
			this.layout();
		}

		/**
		 * 设置容器里子对象的初始计算位置
		 */
		public setChildStartPostion(childX: number, childY: number): void {
			if (this._childStartX == childX && this._childStartY == childY) return;
			this._childStartX = childX;
			this._childStartY = childY;
			this.layout();
		}

		public get childStartX(): number {
			return this._childStartX;
		}

		public get childStartY(): number {
			return this._childStartY;
		}

		/**
		 * 设置对齐
		 * 
		 * 
		 * @memberOf OrientationBox
		 */
		public set isAlign(value: boolean) {
			this._isAlign = value;
		}

		public doForceLayout(): void {
			this._validated = true;
		}

		/**
		 * 布局
		 * <p> 侦听子对象add/remove事件, 并相应的添加/删除子对象的resize事件
		 */
		protected layout() {
			this._width = this._childStartX;
			this._height = this._childStartY;
			let isHorizontal: boolean = this._orientation == OrientationType.HORIZONTAL;
			let child: egret.DisplayObject;
			for (let i: number = 0, len: number = this.numChildren; i < len; i++) {
				child = this.getChildAt(i);
				if (this._filter) {
					if (this._filter.call(this.thisObj, child)) {
						continue;
					}
				}
				if (isHorizontal) {
					child.x = this._width;
					if (this._isAlign) {
						child.y = this._childStartY
					}
				} else {
					child.y = this._height;
					if (this._isAlign) {
						child.x = this._childStartX;
					}
				}
				if (isHorizontal) {
					this._height = Math.max(this._height, child.y + child.height);
					this._width += child.width;
					if (i != len - 1)
						this._width += this._space;
				}
				else {
					this._width = Math.max(this._width, child.x + child.width);
					this._height += child.height;
					if (i != len - 1)
						this._height += this._space;
				}
			}

			if (this.hasEventListener(egret.Event.RESIZE)) {
				this.dispatchEvent(new egret.Event(egret.Event.RESIZE));
			}

		}

		public moveTo(x: number, y: number) {
			this.x = x;
			this.y = y;
		}

		public get height()
		{
			return this._height;
		}

	}
}