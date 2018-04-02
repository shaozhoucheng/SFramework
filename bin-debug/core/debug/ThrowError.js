var core;
(function (core) {
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
    function ThrowError(msg) {
        var atWho = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            atWho[_i - 1] = arguments[_i];
        }
        if (true) {
            var msg = core.ThrowErrorHelper.getMsg(msg, atWho);
            msg = core.ThrowErrorHelper.pushMsg(msg, atWho);
            console.error(msg);
        }
        if (false) {
            msg = core.ThrowErrorHelper.pushMsg(msg, atWho);
        }
        //szc 屏蔽
        // if (chuanqi.Core.show) {
        //     alert(msg);
        // }
    }
    core.ThrowError = ThrowError;
    /**
     * 抛错至服务器
     * @param error #string 错误信息
     **/
    function ReportError(error) {
        return;
        if (!error)
            return;
        var base = egret["baseParams"];
        var url = base["report_url"];
        var request = new egret.HttpRequest();
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (e) { console.log("get error : " + event); }, this);
        error = encodeURIComponent(error);
        url = url + ("?error=" + error + "&pid=" + base["pid"] + "&userid=" + base["uid"]);
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(url, egret.HttpMethod.POST);
        request.send();
    }
    core.ReportError = ReportError;
    // export function Log(msg: string, ...opt) {
    //     console.log(msg, ...opt);
    // }
})(core || (core = {}));
//# sourceMappingURL=ThrowError.js.map