interface $NSFilter {
    /**
     * 感兴趣的请求
     * 
     * @type { [index: number]: boolean }
     * @memberOf $gmNSLog
     */
    cmds?: number[];
    /**
     * 是否为白名单模式，默认黑名单
     * 
     * @type {boolean}
     * @memberOf $NSFilter
     */
    isWhite: boolean;

    /**
     * 过滤器
     * 
     * @type {{ ($gmNSLog, ...args): boolean }}
     * @memberOf $NSFilter
     */
    filter?: { ($gmNSLog, ...args): boolean };

    /**
     * 过滤器参数
     * 
     * @type {any[]}
     * @memberOf $NSFilter
     */
    filterParams?: any[];
}
interface $NSLog {
    /**
     * 指令参数的时间戳
     * 
     * @type {number}
     * @memberOf $NSLog
     */
    time: number;
    /**
     * 接收或者发送
     * 
     * @type {("send" | "receive")}
     * @memberOf $NSLog
     */
    type?: "send" | "receive";
    /**
     * 指令
     * 
     * @type {number}
     * @memberOf $NSLog
     */
    cmd: number;
    /**
     * 数据
     * 
     * @type {*}
     * @memberOf $NSLog
     */
    data?: any

    /**
     * 数据Json
     * 
     * @type {*}
     * @memberOf $NSLog
     */
    json?: string
}
/**
 * 用于扩展GM指令
 * 
 * @interface $gmType
 */
interface $gmType {

    /**
     * 发送的网络消息的日志
     * 
     * @type {$NSFilter}
     * @memberOf $gmType
     */
    printSendFilter: $NSFilter;

    /**
     * 接收的网络消息的日志
     * 
     * @type {$NSFilter}
     * @memberOf $gmType
     */
    printReceiveFilter: $NSFilter;

    /**
     * 日志数据
     * 
     * @type $NSLog[])}
     * @memberOf $gmType
     */
    nsLogs: $NSLog[];

    /**
     * 输出日志内容
     * @memberOf $gmType
     */
    showNSLog()
    showNSLog(filter: { (log: $NSLog, ...args): boolean }, ...args);
    showNSLog(filter: number[], isWhite?: boolean);
    showNSLog(filter: number, isWhite?: boolean);

    /**
     * 最大网络日志数量
     * 
     * @type {number}
     * @memberOf $gmType
     */
    maxNSLogCount: number;

    /**
     * 记录发送日志
     * @memberOf $gm
     */
    printSend()
    printSend(filter: { (log: $NSLog, ...args): boolean }, ...args);
    printSend(filter: number[], isWhite?: boolean);
    printSend(filter: number, isWhite?: boolean);

    /**
     * 记录接收日志
     * @memberOf $gmType
     */
    printReceive()
    printReceive(filter: { (log: $NSLog, ...args): boolean }, ...args);
    printReceive(filter: number[], isWhite?: boolean);
    printReceive(filter: number, isWhite?: boolean);

    /**
     * 获取网络传输数据日志的过滤器
     * @returns {$NSFilter}
     * 
     * @memberOf $gmType
     */
    __getNSFilter(...args): $NSFilter;

    /**
     * 检查是否需要显示日志
     * 
     * @param {$NSLog} log
     * @param {$NSFilter} nsFilter
     * @returns {boolean}
     * 
     * @memberOf $gmType
     */
    nsLogCheck(log: $NSLog, nsFilter: $NSFilter): boolean;

    readLog(cmd: number[]): $NSLog[];

    route(cmd: number, data?: any);
}

if (true) {
    var $gm = $gm || <$gmType>{};
    $gm.__getNSFilter = (filter?: any, ...args) => {
        let nsFilter = <$NSFilter>{};
        if (filter != undefined) {
            if (typeof filter == "number") {
                nsFilter.isWhite = !!args[0];
                nsFilter.cmds = [filter];
            }
            else if (Array.isArray(filter)) {
                nsFilter.isWhite = !!args[0];
                nsFilter.cmds = filter;
            } else if (typeof filter === "function") {
                nsFilter.filter = filter;
                nsFilter.filterParams = args;
            }
        }
        return nsFilter;
    }
    $gm.printSend = function (filter?: any, ...args) {
        if (arguments.length == 0 && $gm.printSendFilter) {
            $gm.printSendFilter = undefined;
        } else {
            $gm.printSendFilter = $gm.__getNSFilter(filter, ...args);
        }
    }
    $gm.printReceive = function (filter?: any, ...args) {
        if (arguments.length == 0 && $gm.printReceiveFilter) {
            $gm.printReceiveFilter = undefined;
        } else {
            $gm.printReceiveFilter = $gm.__getNSFilter(filter, ...args);
        }
    }
    $gm.showNSLog = (filter?: any, ...args) => {
        let nsFilter = $gm.__getNSFilter(filter, ...args);
        let output = [];
        $gm.nsLogs.forEach(log => {
            if ($gm.nsLogCheck(log, nsFilter)) {
                output.push({ type: log.type, time: log.time, cmd: log.cmd, data: log.data, json: JSON.stringify(log.data) });
            }
        });
        console.table(output);
    }


    $gm.readLog = (cmds) => {
        let nsFilter = $gm.__getNSFilter(cmds, true);
        let output = [];
        let logs = $gm.nsLogs.reverse();
        logs.forEach(log => {
            if ($gm.nsLogCheck(log, nsFilter)) {
                output.push({ time: log.time, cmd: log.cmd, json: JSON.stringify(log.data) });
            }
        });
        return output;
    }

    $gm.nsLogCheck = (log, nsFilter) => {
        const { cmd } = log;
        if (nsFilter) {
            const { filter, cmds, filterParams, isWhite } = nsFilter;
            if (cmds) {
                let idx = cmds.indexOf(cmd);
                if (isWhite && ~idx || !isWhite && !~idx) {
                    return true;
                }
            } else if (filter) {
                return filter(log, ...filterParams);
            } else {
                return true;
            }
        }
    }
    $gm.maxNSLogCount = 1000;
    $gm.nsLogs = [];
    $gm.route = (cmd, data) => {
        core.NetService.getInstance().route(cmd, data);
    }
}
module core {
	/**
	 * 通信服务
	 * 收发的协议结构：
	 * 2字节协议号 2字节包长度(n) n字节包
	 * @author builder
	 *
	 */
    export abstract class NetService {


        protected static _instance: NetService;

        public static getInstance(): NetService {
            return this._instance;
        }

        protected _router: NetRouter;
        protected _limiter: RequestLimit;

    	/**
    	 * 被动指令池
    	 */
        protected _sendDataPool: RecyclablePool<NetSendData>;

    	/**
    	 * 待发送的的被动指令列表
    	 */
        protected _pcmdList: NetSendData[];


        /**
         * 接收数据的临时数组
         */
        protected _tmpList: NetData[];
        /**
         * 接收数据的处理回收池
         */
        protected _netDataPool: RecyclablePool<NetData>;

    	/**
    	 * 读取的字节缓存
    	 */
        protected _readBuffer: ByteArray;

        /**
         * 发送的字节缓存
         */
        protected _sendBuffer: ByteArray;


        protected _tempBytes: ByteArray;

        /**
         * 接收消息的创建器
         * 
         */
        protected _recieveMSG: { [index: number]: string | number };

        /**
         * 认证信息
         */
        protected _authData: AuthData;

        constructor() {
            this._router = new NetRouter();
            this._limiter = new RequestLimit();
            this._sendDataPool = new RecyclablePool(NetSendData);
            this._netDataPool = new RecyclablePool(NetData);
            this._pcmdList = [];
            this._tmpList = [];
            this._readBuffer = new ByteArray();
            this._sendBuffer = new ByteArray();
            this._tempBytes = new ByteArray();
            this._recieveMSG = {};

            // if (DEBUG) {
            this.$writeNSLog = (time, type, cmd, data) => {
                let log = { time, type, cmd, data };
                const nsLogs = $gm.nsLogs;
                //清理多余的日志
                while (nsLogs.length > $gm.maxNSLogCount) {
                    nsLogs.shift();
                }
                // if (cmd == 24002 || cmd == 43000) {
                //     nsLogs.push(log);
                //     let nsFilter = type == "send" ? $gm.printSendFilter : $gm.printReceiveFilter;
                //     if ($gm.nsLogCheck(log, nsFilter)) {
                //         console.log(type, time, cmd, data);
                //     }
                // }
            }
            // }
        }

        public readLogs(cmds: number[]) {
            let result: $NSLog[] = [];
            if (DEBUG) {
                result = $gm.readLog(cmds);
            } else {
                result = $gm.readLog(cmds);
            }
            return result;
        }

        public clearLogs() {
            $gm.nsLogs = [];
        }

    	/**
    	 * 设置认证信息
    	 */
        public setAuthData(data: AuthData) {
            this._authData = data;
        }

        /**
         * 
         * 获取认证数据
         * @readonly
         */
        public get authData() {
            return this._authData;
        }

    	/**
    	 * 基础类型消息
    	 */
        public regRecieveMSGRef(cmd: number, ref: string | number) {
            this._recieveMSG[cmd] = ref;
        }

    	/**
    	 * 注册处理器
    	 * @param {number} cmd 协议号
    	 * @param {INetHandler} handler 处理网络数据的处理器
    	 * @param {number} priority 处理优先级
    	 */
        public register(cmd: number, handler: INetHandler, priotity: number = 0): boolean {
            return this._register(cmd, handler, priotity, false);
        }

    	/**
    	 * 注册单次执行的处理器
    	 * @param {number} cmd 协议号
    	 * @param {INetHandler} handler 处理网络数据的处理器
    	 * @param {number} priority 处理优先级
    	 */
        public regOnce(cmd: number, handler: INetHandler, priotity: number = 0): boolean {
            return this._register(cmd, handler, priotity, true);
        }

        /**
         * 移除协议号和处理器的监听
         * 
         * @param {number} cmd 协议号
         * @param {INetHandler} handler 处理网络数据的处理器
         */
        public remove(cmd: number, handler: INetHandler) {
            this._router.remove(cmd, handler);
        }

        protected _register(cmd: number, handler: INetHandler, priotity: number, once: boolean): boolean {
            // if (cmd > 32767 || cmd < -32768) {
            //     ThrowError("协议号的范围必须是-32768~32767之间", 0, 1);
            //     return false;
            // }
            this._router.register(cmd, handler, priotity, once);
            return true;
        }

    	/**
    	 * 即时发送指令<br/>
    	 * 用于处理角色主动操作的请求，如点击合成道具，使用物品等
    	 * @param {number} cmd 协议号
         * @param {any} [data] 数据，简单数据(number,boolean,string)复合数据
         * @param {string} [msgType] 如果是复合数据，必须有此值
    	 * @param {number} limit 客户端发送时间限制
    	 */
        public send(cmd: number, data?: any, msgType?: string | number, limit?: number) {
            if (this._limiter.check(cmd, limit)) {
                // if(cmd == 10003)
                // {
                //     console.log("ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss");
                // }
                this._send(cmd, data, msgType);
            } else {
                // console.log(`协议:${cmd} msgtype:${msgType} data:${data} 被过滤 `);
            }
        }

        /**
         * 即时发送指令
         */
        protected abstract _send(cmd: number, data: any, msgType: string | number);

        /**
         * 断开连接
         */
        public disconnect() {
            // TODO
        }

        /**
         * 消极发送指令<br/>
         * 如果使用通协议的指令，有堆积的指令，先合并，新的替换旧的<br/>
         * <font color='#FF0000'>请勿将一些用户操作使用此指令发送</font>
         * 处理一些实时性要求不高的指令，这些指令先缓存堆积，等到用户主动发指令的时候，一起发送<br/>
         * @param {number} cmd 协议号
         * @param {any} [data] 数据，简单数据(number,boolean,string)复合数据
         * @param {string} [msgType] 如果是复合数据，必须有此值
         */
        public sendPassive(cmd: number, data?: any, msgType?: string | number) {
            //合并同协议的指令
            var pcmdList = this._pcmdList;
            var len = pcmdList.length;
            for (let temp of pcmdList) {
                if (temp.cmd == cmd) {
                    temp.content = data;
                    return;
                }
            }
            //没有同协议的指令，新增数据
            var pdata = this._sendDataPool.getInstance();
            pdata.cmd = cmd;
            pdata.content = data;
            pdata.type = msgType;
            //将数据缓存在pcmdList中，等到下次send的时候发送
            this._pcmdList[len] = pdata;
        }

        private _cmds :{[cmd:number]:number}

        /**
         * @private 
         * @param bytes
         * @param out
         */

        private _tmpTimeFormat:string;
        protected decodeBytes(bytes: ByteArray) {
            let recieveMSG = this._recieveMSG;
            let recievePool = this._netDataPool;
            let tmpList = this._tmpList;
            let idx = 0;

            out: while (true) {
                let msgLength = 0;
                let tmpPosition = bytes.position;
                let offset = 0;
                //先分离出长度
                while (true) {
                    if (bytes.readAvailable) {
                        var tmp = bytes.readByte();
                        if (tmp > 0) {
                            msgLength |= tmp << offset;
                            break;
                        }
                        else {
                            if (offset == 28) {
                                //超过28已经大于32位，按protoBuf的做法会判断下4个字节是否有大于0，如果有然后截取
                                //而我们目前协议，长度最多支持到int，所以，不做截取，这里直接抛错
                                throw new RangeError("单条socket指令太长");
                            }
                            else {
                                msgLength |= (tmp & 0x7f) << offset;
                                offset += 7;
                            }
                        }
                    } else {
                        //not enough data,roll back
                        bytes.position = tmpPosition;
                        break out;
                    }
                }

                if (bytes.readAvailable >= msgLength) {
                    var readFrom = PBMessageUtils.readFrom("GameMsg", bytes, msgLength);
                    let cmd = readFrom["type"];
                    let type = recieveMSG[cmd];
                    // if (cmd == 10003) {
                    //     if (chuanqi.Core.show) {
                    //         alert("Get_Role_List_ SC back <<<<<<<<<<<<<<<<");
                    //     }
                    // }
                    let content = readFrom["content"];
                    content.position = 0;
                    var data = PBMessageUtils.readFrom(type, content);

                    let nData = recievePool.getInstance();
                    nData.cmd = cmd;
                    let now = new Date();
                    let time = DateUtils.getFormatTime(now.getTime(),"yyyy-MM-dd HH:mm:ss");
                    // console.log(time + "接收协议" + cmd )

                    // if(!this._tmpTimeFormat){
                    //     this._tmpTimeFormat = time;
                    //     this._cmds = {};
                    // }else{
                    //     if(time != this._tmpTimeFormat){
                    //         this._tmpTimeFormat = time;
                    //         let total :number = 0;
                    //         for(let _cmd  in this._cmds){
                    //             let count = this._cmds[_cmd];
                    //             total += count;
                    //             console.log(`${this._tmpTimeFormat}接收了${_cmd} ：：${count}次`);
                    //         }
                    //         console.log(`${this._tmpTimeFormat}总计接收了${total} 个协议`);
                    //         this._cmds = {};
                    //     }
                    // }
                    // let tcmd = this._cmds[cmd];
                    // if(!tcmd){
                    //      let tcmd = this._cmds[cmd] = 1;
                    // }else{
                    //     this._cmds[cmd] ++;
                    // }

                    nData.content = data;
                    nData.flag = readFrom["flag"];
                    nData.id = readFrom["id"];
                    nData.type = type;
                    tmpList.push(nData);
                } else {
                    //not enough data,roll back
                    bytes.position = tmpPosition;
                    break;
                }
            }

            //调试时,显示接收的数据
            // if (DEBUG) {
            // var now = Global.now;
            // for (let nData of tmpList) {
            //     this.$writeNSLog(now, "receive", nData.cmd, nData.content);
            // }
            // }

            // var router = this._router;
            // //分发数据
            // for (let nData of tmpList) {
            //     router.dispatch(nData);
            //     try {

            //     } catch (e) {

            //     }
            //     //回收nData
            //     recievePool.recycle(nData);
            // }
            // tmpList.length = 0;
            if (!this._willDispatch) {
                egret.callLater(this.dispatchData, this);
                this._willDispatch = true;
            }
        }

        protected _willDispatch: boolean;

        protected dispatchData() {
            if (this._willDispatch) {
                const tmpList = this._tmpList.concat();
                this._tmpList.length = 0;
                const recievePool = this._netDataPool;
                const router = this._router;
                for (let i = 0; i < tmpList.length; i++) {
                    let nData = tmpList[i];
                    router.dispatch(nData);
                    //回收nData
                    recievePool.recycle(nData);
                }
                this._willDispatch = false;
            }
        }

        /**
         * 
         * 模拟服务端
         * @param {number} cmd
         * @param {*} [data]
         */
        public route(cmd: number, data?: any) {
            let nData = this._netDataPool.getInstance();
            nData.cmd = cmd;
            nData.content = data;
            this._tmpList.push(nData);
            if (!this._willDispatch) {
                egret.callLater(this.dispatchData, this);
                this._willDispatch = true;
            }
        }

        /**
         * 用于调试模式下写日志
         * 
         * @param {number} time
         * @param {("send" | "receive")} type
         * @param {number} cmd
         * @param {*} data
         * 
         * @memberOf $gmType
         */
        protected $writeNSLog: { (time: number, type: "send" | "receive", cmd: number, data: any): void };
    }
}
