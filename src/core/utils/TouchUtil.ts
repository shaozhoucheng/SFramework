module shao.sui 
{
	export class TouchUtil 
	{
		private _enabled: boolean = false;
		private target: egret.DisplayObject;
		private startx;
		private starty;
		private isTouchBegin: boolean = false;

		public constructor( target: egret.DisplayObject ) 
		{
			this.target = target;
			this.recordStartXY();
			if ( "touchChildren" in target ) {
				target["touchChildren"] = false;
			}
		}

		public dispose()
		{
			let t = this.target;
			if ( t ) {
				let type = egret.Event.ADDED_TO_STAGE;
				if ( t.hasEventListener(type)) {
					t.removeEventListener(type, this.targetAddedToParent, this);
				}
				t = undefined;
				this.enabled = false;
				this.target = null;
			}
		}

		public set enabled( value: boolean )
		{
			if ( value != this._enabled ) {
				let t = this.target;
				if ( t ) {
					let type = egret.TouchEvent.TOUCH_BEGIN;
					t.touchEnabled = value;
					if ( value ) t.addEventListener(type, this.touchBegin, this );
					else t.removeEventListener(type, this.touchBegin, this );
				}
				this._enabled = value;
			}
		}

		public recordStartXY()
		{
			let t = this.target;
			if ( t ) {
				let p = t.stage;
				if ( p ) this.enabled = t.touchEnabled;
				else t.addEventListener(egret.Event.ADDED_TO_STAGE, this.targetAddedToParent, this);
			}
		}

		protected targetAddedToParent( event: egret.Event )
		{
			let t = event.currentTarget as egret.DisplayObject;
			t.removeEventListener(egret.Event.ADDED_TO_STAGE, this.targetAddedToParent, this);
			this.recordStartXY();
		}

		protected touchBegin( event: egret.TouchEvent )
		{
			if ( this.isTouchBegin ) this.touchEnd(null);

			this.isTouchBegin = true;

			let st = egret.sys.$TempStage;
			st.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
			st.addEventListener(egret.TouchEvent.LEAVE_STAGE, this.touchLeaveStage, this);

			let t = this.target;

			t.scaleX = 1;
			t.scaleY = 1;

			let sc = 1.1;
			let sx = this.startx = t.x;
			let sy = this.starty = t.y;
			let sw = t.width;
			let sh = t.height;

			t.scaleX = sc;
			t.scaleY = sc;
			t.x = sx - sw * 0.05;
			t.y = sy - sh * 0.05;
		}

		protected touchEnd( event: egret.TouchEvent )
		{
			let t = this.target;
			let st = egret.sys.$TempStage;
			st.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
			st.removeEventListener(egret.TouchEvent.LEAVE_STAGE, this.touchLeaveStage, this);

			t.scaleX = 1;
			t.scaleY = 1;
			t.x = this.startx;
			t.y = this.starty;

			this.isTouchBegin = false;
		}

		protected touchLeaveStage( event: egret.TouchEvent )
		{
			this.touchEnd( event );
		}

	}
}