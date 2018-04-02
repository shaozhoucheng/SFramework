module core {
    /**
     * WebSocket版本的NetService
     * @author builder
     */
    export class WSNetService extends NetService {

        private _ws: WebSocket;
        private _actionUrl: string;
        private index: number = 1;
        /**
         * 
         * 接收到的数据缓存
         * @private
         * @type {Uint8Array}
         */
        private _recievedBuffer: Uint8Array;

        // /**
        //  * 
        //  * 数据缓存的读取索引
        //  * @private
        //  * @type {number}
        //  */
        // private _readPosition: number = 0;

        constructor() {
            super();
            //覆盖instance
            NetService._instance = this;
        }

        /**
         * 
         * 设置websocket地址
         * @param {string} actionUrl
         */
        public setUrl(actionUrl: string) {
            if (this._actionUrl != actionUrl) {
                this._actionUrl = actionUrl;
                let ws = this._ws;
                if (ws) {
                    ws.close();
                }
                if (ws && ws.readyState <= WebSocket.OPEN) { //已经有连接，重置连接
                    this.connect();
                }
            }
        }

        public disconnect() {
            let ws = this._ws;
            if (ws) {
                ws.close();
            }
        }

        /**
         * 打开新的连接
         */
        public connect(times?: number) {
            //szc 屏蔽
            // if(!Global.connect){
            //     Global.clearCallLater(this.connect, this);
            //     return;
            // }
            if (times) {
                ThrowError(`connect closed, try at the ${times} times`);
                this._tryTimes++;
            }

            let ws = this._ws;
            if (ws) {
                ws.removeEventListener("close", this.onClose);
                ws.removeEventListener("error", this.onError);
                ws.removeEventListener("message", this.onData);
                ws.close();
            }
            try {
                ws = new WebSocket(this._actionUrl);
            } catch (err) {
                // alert("无法连接服务器");
                return;
            }
            this._ws = ws;
            ws.binaryType = "arraybuffer";
            ws.addEventListener("close", this.onClose);
            ws.addEventListener("error", this.onError);
            ws.addEventListener("message", this.onData);
            ws.addEventListener("open", this.onOpen);

        }

        /**
         * 
         * 发生错误
         * @private
         */
        private onError = (ev: ErrorEvent) => {
            console.log("WebSocket 发生错误");
            mvc.Facade.simpleDispatch(NetEvent.WEB_FAILED);
            location.reload();
        }


        private _tryTimes: number = 1;

        private _conn: boolean = false;
        /**
         * 
         * 断开连接
         * @private
         */
        private onClose = (ev: CloseEvent) => {
            console.log("WebSocket 断开链接");
            //szc 屏蔽
            // if(Global.connect){
            //     Global.callLater(this.connect, 5000, this, this._tryTimes);
            // }
        }

        /**
         * 
         * 收到消息
         * @private
         */
        private onData = (ev: MessageEvent) => {
            let ab = new Uint8Array(<ArrayBuffer>ev.data);
            let rb
            if (this._recievedBuffer) {
                rb = this._recievedBuffer;
            } else {
                rb = new Uint8Array(0);
            }

            let rbLen = rb.length;
            let abLen = ab.length;
            let newRecieved = new Uint8Array(rbLen + abLen);
            let i = 0, m: number;
            for (m = 0; m < rbLen; m++) {
                newRecieved[i++] = rb[m];
            }
            for (m = 0; m < abLen; m++) {
                newRecieved[i++] = ab[m];
            }
            let readBuffer = this._readBuffer;

            readBuffer = new ByteArray();
            readBuffer.buffer = newRecieved.buffer;
            readBuffer.position = 0;
            this.decodeBytes(readBuffer);
            this._recievedBuffer = new Uint8Array(readBuffer.buffer.slice(readBuffer.position));
        }


        //初始建立连接
        private onOpen = (ev: Event) => {
            // if (chuanqi.Core.show) {
            //     alert("ws open");
            // }
            mvc.Facade.simpleDispatch(NetEvent.WEB_COMPLETE);
            this._conn = true;
            this._tryTimes = 0;
            //szc 屏蔽
            // Global.clearCallLater(this.connect, this);
        }


        protected _send(cmd: number, data?: any, msgType: string = "") {
            var pdata = this._sendDataPool.getInstance();
            pdata.flag = 0;
            pdata.content = PBMessageUtils.writeTo(data, msgType); //先把proto数据保存为ByteArray
            pdata.id = this.index++;
            pdata.type = cmd;
            var sendBuffer = this._sendBuffer;
            sendBuffer.clear();
            sendBuffer = PBMessageUtils.writeTo(pdata, "GameMsg")  //再封装为固定格式 GameMsg
            let sendPool = this._sendDataPool;
            sendPool.recycle(pdata);
            var realsend = new ByteArray; //最后再把GameMSG（含长度）封装起来，发送数据。
            var len = sendBuffer.length;
            realsend.writeVarint(len);
            realsend.writeBytes(sendBuffer);
            realsend.position = 0;

            try {
                this._ws.send(realsend.buffer);
            } catch (error) {
                ThrowError("send socket error");
            }


            // if (cmd == 10003) {
            //     if (chuanqi.Core.show) {
            //         alert("Get_Role_List_C_S >>>>>>>>>>>>>");
            //     }
            // }
        }
    }
}