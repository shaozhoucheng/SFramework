var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var core;
(function (core) {
    /**
     * WebSocket版本的NetService
     * @author builder
     */
    var WSNetService = (function (_super) {
        __extends(WSNetService, _super);
        // /**
        //  * 
        //  * 数据缓存的读取索引
        //  * @private
        //  * @type {number}
        //  */
        // private _readPosition: number = 0;
        function WSNetService() {
            var _this = _super.call(this) || this;
            _this.index = 1;
            /**
             *
             * 发生错误
             * @private
             */
            _this.onError = function (ev) {
                console.log("WebSocket 发生错误");
                core.mvc.Facade.simpleDispatch(core.NetEvent.WEB_FAILED);
                location.reload();
            };
            _this._tryTimes = 1;
            _this._conn = false;
            /**
             *
             * 断开连接
             * @private
             */
            _this.onClose = function (ev) {
                console.log("WebSocket 断开链接");
                //szc 屏蔽
                // if(Global.connect){
                //     Global.callLater(this.connect, 5000, this, this._tryTimes);
                // }
            };
            /**
             *
             * 收到消息
             * @private
             */
            _this.onData = function (ev) {
                var ab = new Uint8Array(ev.data);
                var rb;
                if (_this._recievedBuffer) {
                    rb = _this._recievedBuffer;
                }
                else {
                    rb = new Uint8Array(0);
                }
                var rbLen = rb.length;
                var abLen = ab.length;
                var newRecieved = new Uint8Array(rbLen + abLen);
                var i = 0, m;
                for (m = 0; m < rbLen; m++) {
                    newRecieved[i++] = rb[m];
                }
                for (m = 0; m < abLen; m++) {
                    newRecieved[i++] = ab[m];
                }
                var readBuffer = _this._readBuffer;
                readBuffer = new core.ByteArray();
                readBuffer.buffer = newRecieved.buffer;
                readBuffer.position = 0;
                _this.decodeBytes(readBuffer);
                _this._recievedBuffer = new Uint8Array(readBuffer.buffer.slice(readBuffer.position));
            };
            //初始建立连接
            _this.onOpen = function (ev) {
                // if (chuanqi.Core.show) {
                //     alert("ws open");
                // }
                core.mvc.Facade.simpleDispatch(core.NetEvent.WEB_COMPLETE);
                _this._conn = true;
                _this._tryTimes = 0;
                //szc 屏蔽
                // Global.clearCallLater(this.connect, this);
            };
            //覆盖instance
            core.NetService._instance = _this;
            return _this;
        }
        /**
         *
         * 设置websocket地址
         * @param {string} actionUrl
         */
        WSNetService.prototype.setUrl = function (actionUrl) {
            if (this._actionUrl != actionUrl) {
                this._actionUrl = actionUrl;
                var ws = this._ws;
                if (ws) {
                    ws.close();
                }
                if (ws && ws.readyState <= WebSocket.OPEN) {
                    this.connect();
                }
            }
        };
        WSNetService.prototype.disconnect = function () {
            var ws = this._ws;
            if (ws) {
                ws.close();
            }
        };
        /**
         * 打开新的连接
         */
        WSNetService.prototype.connect = function (times) {
            //szc 屏蔽
            // if(!Global.connect){
            //     Global.clearCallLater(this.connect, this);
            //     return;
            // }
            if (times) {
                core.ThrowError("connect closed, try at the " + times + " times");
                this._tryTimes++;
            }
            var ws = this._ws;
            if (ws) {
                ws.removeEventListener("close", this.onClose);
                ws.removeEventListener("error", this.onError);
                ws.removeEventListener("message", this.onData);
                ws.close();
            }
            try {
                ws = new WebSocket(this._actionUrl);
            }
            catch (err) {
                // alert("无法连接服务器");
                return;
            }
            this._ws = ws;
            ws.binaryType = "arraybuffer";
            ws.addEventListener("close", this.onClose);
            ws.addEventListener("error", this.onError);
            ws.addEventListener("message", this.onData);
            ws.addEventListener("open", this.onOpen);
        };
        WSNetService.prototype._send = function (cmd, data, msgType) {
            if (msgType === void 0) { msgType = ""; }
            var pdata = this._sendDataPool.getInstance();
            pdata.flag = 0;
            pdata.content = core.PBMessageUtils.writeTo(data, msgType); //先把proto数据保存为ByteArray
            pdata.id = this.index++;
            pdata.type = cmd;
            var sendBuffer = this._sendBuffer;
            sendBuffer.clear();
            sendBuffer = core.PBMessageUtils.writeTo(pdata, "GameMsg"); //再封装为固定格式 GameMsg
            var sendPool = this._sendDataPool;
            sendPool.recycle(pdata);
            var realsend = new core.ByteArray; //最后再把GameMSG（含长度）封装起来，发送数据。
            var len = sendBuffer.length;
            realsend.writeVarint(len);
            realsend.writeBytes(sendBuffer);
            realsend.position = 0;
            try {
                this._ws.send(realsend.buffer);
            }
            catch (error) {
                core.ThrowError("send socket error");
            }
            // if (cmd == 10003) {
            //     if (chuanqi.Core.show) {
            //         alert("Get_Role_List_C_S >>>>>>>>>>>>>");
            //     }
            // }
        };
        return WSNetService;
    }(core.NetService));
    core.WSNetService = WSNetService;
    __reflect(WSNetService.prototype, "core.WSNetService");
})(core || (core = {}));
//# sourceMappingURL=WSNetService.js.map