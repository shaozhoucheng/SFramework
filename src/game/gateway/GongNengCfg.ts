module shao.game{
        
        /*-*begin $area1*-*/
        //这里填写类上方的手写内容
        /*-*end $area1*-*/
    
         /**
        * 由junyouH5数据生成工具，从F://vsworkspace/LearnGit/TestPython/jsons\GongNeng.json生成
        * 创建时间：2018-05-21 16:28:57
        **/
         export class GongNengCfg extends mvc.BaseMCfg {
         
        			/**
        			*功能标识
        			**/
        			public id:string
        
        			/**
        			*显示用限制类型
        			**/
        			public showtype:number
        
        			/**
        			*可使用功能的限制类型
        			**/
        			public limittype:number
        
        			/**
        			*是否关闭此功能（不开放）
        			**/
        			public close:boolean
        
        			/**
        			*名字
        			**/
        			public name:string
        
        			/**
        			*tip
        			**/
        			public des:string
        
        			/**
        			*执行类型
        			**/
        			public type:number
        
        			/**
        			*容器ID
        			**/
        			public containerID:number
        
        			/**
        			*帮助按钮
        			**/
        			public help:string
        
        			/**
        			*缩放比例
        			**/
        			public scale:number
        
         
        /*-*begin $area2*-*/
        //这里填写类里面的手写内容
        /*-*end $area2*-*/
    
         public decode(data:any[]){
         			let i = 0;
             			let local:any = {};
             			this.id = data[i++]
			this.showtype = data[i++]
			local.showlimit0 = data[i++]
			local.showlimit1 = data[i++]
			local.showlimit2 = data[i++]
			this.limittype = data[i++]
			local.limit0 = data[i++]
			local.limit1 = data[i++]
			local.limit2 = data[i++]
			this.close = data[i++]
			this.name = data[i++]
			this.des = data[i++]
			this.type = data[i++]
			this.containerID = data[i++]
			this.help = data[i++]
			this.scale = data[i++]

             
        /*-*begin $decode*-*/
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
super.init(local);

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        /*-*end $decode*-*/
    
            }
        }
         
        /*-*begin $area3*-*/
        //这里填写类下发的手写内容
        /*-*end $area3*-*/
    
    }
        