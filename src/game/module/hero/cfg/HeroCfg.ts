module shao.game{
        
        /*-*begin $area1*-*/
        //这里填写类上方的手写内容
        /*-*end $area1*-*/
    
         /**
        * 由junyouH5数据生成工具，从F://vsworkspace/LearnGit/TestPython/jsons\Hero.json生成
        * 创建时间：2018-05-14 17:04:31
        **/
         export class HeroCfg {
         
        			/**
        			*id
        			**/
        			public id:number
        
        			/**
        			*名称
        			**/
        			public name:string
        
        			/**
        			*主属性
        			**/
        			public  primeattribute:number
        
        			/**
        			*稀有度
        			**/
        			public rare:number
        
        			/**
        			*cost
        			**/
        			public cost:number
        
        			/**
        			*职业
        			**/
        			public job:string
        
        			/**
        			*部队
        			**/
        			public army:number
        
        			/**
        			*台词
        			**/
        			public dialogue:string
        
        			/**
        			*介绍
        			**/
        			public introduce:string
        
        			/**
        			*绰号
        			**/
        			public nickname:string
        
        			/**
        			*初始属性
        			**/
        			public bproperty:string
        
        			/**
        			*史实名字
        			**/
        			public realname:string
        
         
        /*-*begin $area2*-*/
        
		//这里填写类里面的手写内容

		public bpropArr: number[]


		public decodeBpropArr(str: string) {
			let arr = str.split(";")
			this.bpropArr = [];
			arr.forEach(num => {
				this.bpropArr.push(Number(num))
			})
		}
		
        /*-*end $area2*-*/
    
         public decode(data:any[]){
         			let i = 0;
             
             			this.id = data[i++]
			this.name = data[i++]
			this. primeattribute = data[i++]
			this.rare = data[i++]
			this.cost = data[i++]
			this.job = data[i++]
			this.army = data[i++]
			this.dialogue = data[i++]
			this.introduce = data[i++]
			this.nickname = data[i++]
			this.bproperty = data[i++]
			this.realname = data[i++]

             
        /*-*begin $decode*-*/
        
			//这里填写方法中的手写内容
			this.decodeBpropArr(this.bproperty)
			
        /*-*end $decode*-*/
    
            }
        }
         
        /*-*begin $area3*-*/
        //这里填写类下发的手写内容
        /*-*end $area3*-*/
    
    }
        