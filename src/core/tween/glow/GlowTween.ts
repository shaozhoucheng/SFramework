module core {
	export class GlowTween extends Tween {

		private _cyclic:boolean;


		private _filter : egret.GlowFilter ;
		public constructor(target: any, props?: any, pluginData?: any, manager?: TweenManager,cyclic:boolean = true) {
			
			super(target,props,pluginData,manager);

			this._cyclic = cyclic;
			// if(!this._filter)
		}


	}
}