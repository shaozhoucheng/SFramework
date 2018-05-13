module shao {

	/**
	 * 数据缓存池
	 * @author dai changxin
	 */
	export class ObjectPool {

		private static _poolDic: MapDict<any, RecyclablePool<any>>;

		public static getObject<T>(type: { new (): T }): T {
			var pool: RecyclablePool<T> = this.getPool(type);
			return pool.getInstance();
		}

		public static disposeObject<T>(object: any, type: { new (): T } = null) {
			if (object == null) return;
			if (!type) {
				type = egret.getDefinitionByName(egret.getQualifiedClassName(object));
			}
			var r: RecyclablePool<T> = this.getPool(type);
			r.recycle(object);
		}

		private static getPool<T>(type: { new (): T }): RecyclablePool<T> {
			if(!this._poolDic){
				this._poolDic = new  MapDict<any, RecyclablePool<any>>();
			}
			if (!this._poolDic.has(type)) {
				this._poolDic.set(type, new RecyclablePool(type));
			}
			return this._poolDic.get(type);
		}

	}
}
