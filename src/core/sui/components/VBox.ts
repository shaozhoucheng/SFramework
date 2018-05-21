module shao.sui {
	export class VBox extends OrientationContainer {
		public constructor(gap: number = 0) {
			super(gap, OrientationType.VERTICAL);
		}

	}
}