module shao {
    /**
     * 获取一个单例
     * @returns {any}
     */
	export function getInstance<T>(Class: { new (): T, _instance?: T }) {
		let _instance = Class._instance;
		if (!_instance) {
			Class._instance = _instance = new Class();
		}
		return _instance;
	}
}