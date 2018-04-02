module core {
	export class MapDict <K, V> implements Map<K, V>{
		 private _keys: K[];
        private _values: V[];

        private _size: number;

        constructor() {
            this._keys = [];
            this._values = [];
            this._size = 0;
        }

        public set(key: K, value: V) {
            var keys = this._keys;
            var idx = keys.indexOf(key);
            if (~idx) {// idx != -1  覆盖values数组的数据
                this._values[idx] = value;
            } else {//idx == -1 新增
                var size = this._size;
                keys[size] = key;
                this._values[size] = value;
                this._size++;
            }
            return this;
        }

        public get(key: K): V {
            var idx = this._keys.indexOf(key);
            if (~idx) {
                return this._values[idx];
            }
            return null;
        }

        public has(key: K): boolean {
           return this.get(key) != undefined;
        }

        public delete(key: K): boolean {
            var keys = this._keys;
            var idx = keys.indexOf(key);
            if (~idx) {//有索引，干掉key和value
                keys.splice(idx, 1);
                this._values.splice(idx, 1);
                this._size--;
                return true;
            }
            return false;
        }

        public forEach(callbackfn: (value: V, index: K, map: Map<K, V>) => void, thisArg?: any) {
            var keys = this._keys;
            var values = this._values;
            for (let i = 0, len = this._size; i < len; i++) {
                callbackfn(values[i], keys[i], <Map<K, V>>thisArg);
            }
        }

        public clear() {
            this._keys.length = 0;
            this._values.length = 0;
            this._size = 0;
        }

        public get size(): number {
            return this._size;
        }
	}
}

interface Map<K, V> {
    set(key: K, value: V): Map<K, V>;
    get(key: K): V;
    has(key: K): boolean;
    delete(key: K): boolean;
    forEach(callbackfn: (value: V, index: K, map: Map<K, V>) => void, thisArg?: any);
    clear();
}