module shao {

    /**
	 * 抛错
	 * @param msg 	#String 描述
	 * @param atWho	#Array  at给谁<br/>
	 * 									<ol start="0">
	 * 										<li>前端</li>
	 * 										<li>后端</li>
	 * 										<li>策划</li>
	 * 									</ol>
	 **/
    export function ThrowError(msg: string, ...atWho) {
        if (DEBUG) {
            var msg = ThrowErrorHelper.getMsg(msg, atWho);
            msg = ThrowErrorHelper.pushMsg(msg, atWho);
            console.error(msg);
        }
        if (RELEASE) {
            msg = ThrowErrorHelper.pushMsg(msg, atWho);
        }
        //szc 屏蔽
        // if (chuanqi.Core.show) {
        //     alert(msg);
        // }
    }

    /**
	 * 抛错至服务器
	 * @param error #string 错误信息
	 **/
    export function ReportError(error:string){
        return;
        if(!error) return;
        let base = egret["baseParams"];
        let url =base["report_url"]; 
        var request = new egret.HttpRequest();
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, (e: egret.IOErrorEvent) => { console.log("get error : " + event); }, this);
        error = encodeURIComponent(error);
        url = url + `?error=${error}&pid=${base["pid"]}&userid=${base["uid"]}`;
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(url, egret.HttpMethod.POST);
        request.send();
    }
    

    // export function Log(msg: string, ...opt) {
    //     console.log(msg, ...opt);
    // }
}