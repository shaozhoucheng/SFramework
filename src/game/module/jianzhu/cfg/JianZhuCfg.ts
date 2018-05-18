module shao.game {

	/*-*begin $area1*-*/
	//这里填写类上方的手写内容
	/*-*end $area1*-*/

	/**
   * 由junyouH5数据生成工具，从F://vsworkspace/LearnGit/TestPython/jsons\JianZhu.json生成
   * 创建时间：2018-05-18 15:25:38
   **/
	export class JianZhuCfg {

		/**
		*id
		**/
		public id: number

		/**
		*名称
		**/
		public name: string

		/**
		*图片
		**/
		public icon: string

		/**
		*建造时间
		**/
		public buildingtimes: string

		/**
		*效果值1
		**/
		public effectvalue1: string

		/**
		*效果值2
		**/
		public effectvalue2: string

		/**
		*限制公馆等级开放
		**/
		public limitlevel: number

		/**
		*用途类型
		**/
		public type: number

		/**
		*限制个数
		**/
		public limitcount: number

		/**
		*介绍
		**/
		public des: string


		/*-*begin $area2*-*/
		//这里填写类里面的手写内容

		public timeArr: number[];

		private decodeTime(str: string) {
			this.timeArr = [];
			let tmps = str.split(";")
			tmps.forEach(tm => {
				this.timeArr.push(Number(tm))
			})
		}
		/*-*end $area2*-*/

		public decode(data: any[]) {
			let i = 0;

			this.id = data[i++]
			this.name = data[i++]
			this.icon = data[i++]
			this.buildingtimes = data[i++]
			this.effectvalue1 = data[i++]
			this.effectvalue2 = data[i++]
			this.limitlevel = data[i++]
			this.type = data[i++]
			this.limitcount = data[i++]
			this.des = data[i++]


			/*-*begin $decode*-*/
			//这里填写方法中的手写内容
			this.decodeTime(this.buildingtimes)
			/*-*end $decode*-*/

		}
	}

	/*-*begin $area3*-*/
	//这里填写类下发的手写内容
	/*-*end $area3*-*/

}
