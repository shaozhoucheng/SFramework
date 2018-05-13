module shao.game{
    export class ModuleChecker implements mvc.IModuleChecker{
        
        public check(data:any[],showtip:boolean){
            return true;
        }
        
        public adjustLimitDatas(showLimits:any[],limits:any[]){
            return false;
        }
    }
}