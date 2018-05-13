module shao.game{
        
        /*-*begin $area1*-*/
        //这里填写类上方的手写内容
        /*-*end $area1*-*/
    
         /**
        * 由junyouH5数据生成工具，从D://PycharmProjects/TestPython/jsons\Hero.json生成
        * 创建时间：2018-05-14 00:15:54
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
        			*稀有度
        			**/
        			public rare:string
        
        			/**
        			*cost
        			**/
        			public cost:number
        
         
        /*-*begin $area2*-*/
        //这里填写类里面的手写内容
        /*-*end $area2*-*/
    
         public decode(data:any[]){
         			let i = 0;
             
             			this.id = data[i++]
			this.name = data[i++]
			this.rare = data[i++]
			this.cost = data[i++]

             
        /*-*begin $decode*-*/
        //这里填写方法中的手写内容
        /*-*end $decode*-*/
    
            }
        }
         
        /*-*begin $area3*-*/
        //这里填写类下发的手写内容
        /*-*end $area3*-*/
    
    }
        