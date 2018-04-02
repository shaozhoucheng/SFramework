var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
if (true) {
    var $gm = $gm || {};
    $gm.__getNSFilter = function (filter) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var nsFilter = {};
        if (filter != undefined) {
            if (typeof filter == "number") {
                nsFilter.isWhite = !!args[0];
                nsFilter.cmds = [filter];
            }
            else if (Array.isArray(filter)) {
                nsFilter.isWhite = !!args[0];
                nsFilter.cmds = filter;
            }
            else if (typeof filter === "function") {
                nsFilter.filter = filter;
                nsFilter.filterParams = args;
            }
        }
        return nsFilter;
    };
    $gm.printSend = function (filter) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (arguments.length == 0 && $gm.printSendFilter) {
            $gm.printSendFilter = undefined;
        }
        else {
            $gm.printSendFilter = $gm.__getNSFilter.apply($gm, [filter].concat(args));
        }
    };
    $gm.printReceive = function (filter) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (arguments.length == 0 && $gm.printReceiveFilter) {
            $gm.printReceiveFilter = undefined;
        }
        else {
            $gm.printReceiveFilter = $gm.__getNSFilter.apply($gm, [filter].concat(args));
        }
    };
    $gm.showNSLog = function (filter) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var nsFilter = $gm.__getNSFilter.apply($gm, [filter].concat(args));
        var output = [];
        $gm.nsLogs.forEach(function (log) {
            if ($gm.nsLogCheck(log, nsFilter)) {
                output.push({ type: log.type, time: log.time, cmd: log.cmd, data: log.data, json: JSON.stringify(log.data) });
            }
        });
        console.table(output);
    };
    $gm.readLog = function (cmds) {
        var nsFilter = $gm.__getNSFilter(cmds, true);
        var output = [];
        var logs = $gm.nsLogs.reverse();
        logs.forEach(function (log) {
            if ($gm.nsLogCheck(log, nsFilter)) {
                output.push({ time: log.time, cmd: log.cmd, json: JSON.stringify(log.data) });
            }
        });
        return output;
    };
    $gm.nsLogCheck = function (log, nsFilter) {
        var cmd = log.cmd;
        if (nsFilter) {
            var filter = nsFilter.filter, cmds = nsFilter.cmds, filterParams = nsFilter.filterParams, isWhite = nsFilter.isWhite;
            if (cmds) {
                var idx = cmds.indexOf(cmd);
                if (isWhite && ~idx || !isWhite && !~idx) {
                    return true;
                }
            }
            else if (filter) {
                return filter.apply(void 0, [log].concat(filterParams));
            }
            else {
                return true;
            }
        }
    };
    $gm.maxNSLogCount = 1000;
    $gm.nsLogs = [];
    $gm.route = function (cmd, data) {
        core.NetService.getInstance().route(cmd, data);
    };
}
var core;
(function (core) {
    /**
     * 通信服务
     * 收发的协议结构：
     * 2字节协议号 2字节包长度(n) n字节包
     * @author builder
     *
     */
    var NetService = (function () {
        function NetService() {
            this._router = new core.NetRouter();
            this._limiter = new core.RequestLimit();
            this._sendDataPool = new core.RecyclablePool(core.NetSendData);
            this._netDataPool = new core.RecyclablePool(core.NetData);
            this._pcmdList = [];
            this._tmpList = [];
            this._readBuffer = new core.ByteArray();
            this._sendBuffer = new core.ByteArray();
            this._tempBytes = new core.ByteArray();
            this._recieveMSG = {};
            // if (DEBUG) {
            this.$writeNSLog = function (time, type, cmd, data) {
                var log = { time: time, type: type, cmd: cmd, data: data };
                var nsLogs = $gm.nsLogs;
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
            };
            // }
        }
        NetService.getInstance = function () {
            return this._instance;
        };
        NetService.prototype.readLogs = function (cmds) {
            var result = [];
            if (true) {
                result = $gm.readLog(cmds);
            }
            else {
                result = $gm.readLog(cmds);
            }
            return result;
        };
        NetService.prototype.clearLogs = function () {
            $gm.nsLogs = [];
        };
        /**
         * 设置认证信息
         */
        NetService.prototype.setAuthData = function (data) {
            this._authData = data;
        };
        Object.defineProperty(NetService.prototype, "authData", {
            /**
             *
             * 获取认证数据
             * @readonly
             */
            get: function () {
                return this._authData;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 基础类型消息
         */
        NetService.prototype.regRecieveMSGRef = function (cmd, ref) {
            this._recieveMSG[cmd] = ref;
        };
        /**
         * 注册处理器
         * @param {number} cmd 协议号
         * @param {INetHandler} handler 处理网络数据的处理器
         * @param {number} priority 处理优先级
         */
        NetService.prototype.register = function (cmd, handler, priotity) {
            if (priotity === void 0) { priotity = 0; }
            return this._register(cmd, handler, priotity, false);
        };
        /**
         * 注册单次执行的处理器
         * @param {number} cmd 协议号
         * @param {INetHandler} handler 处理网络数据的处理器
         * @param {number} priority 处理优先级
         */
        NetService.prototype.regOnce = function (cmd, handler, priotity) {
            if (priotity === void 0) { priotity = 0; }
            return this._register(cmd, handler, priotity, true);
        };
        /**
         * 移除协议号和处理器的监听
         *
         * @param {number} cmd 协议号
         * @param {INetHandler} handler 处理网络数据的处理器
         */
        NetService.prototype.remove = function (cmd, handler) {
            this._router.remove(cmd, handler);
        };
        NetService.prototype._register = function (cmd, handler, priotity, once) {
            // if (cmd > 32767 || cmd < -32768) {
            //     ThrowError("协议号的范围必须是-32768~32767之间", 0, 1);
            //     return false;
            // }
            this._router.register(cmd, handler, priotity, once);
            return true;
        };
        /**
         * 即时发送指令<br/>
         * 用于处理角色主动操作的请求，如点击合成道具，使用物品等
         * @param {number} cmd 协议号
         * @param {any} [data] 数据，简单数据(number,boolean,string)复合数据
         * @param {string} [msgType] 如果是复合数据，必须有此值
         * @param {number} limit 客户端发送时间限制
         */
        NetService.prototype.send = function (cmd, data, msgType, limit) {
            if (this._limiter.check(cmd, limit)) {
                // if(cmd == 10003)
                // {
                //     console.log("ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss");
                // }
                this._send(cmd, data, msgType);
            }
            else {
                // console.log(`协议:${cmd} msgtype:${msgType} data:${data} 被过滤 `);
            }
        };
        /**
         * 断开连接
         */
        NetService.prototype.disconnect = function () {
            // TODO
        };
        /**
         * 消极发送指令<br/>
         * 如果使用通协议的指令，有堆积的指令，先合并，新的替换旧的<br/>
         * <font color='#FF0000'>请勿将一些用户操作使用此指令发送</font>
         * 处理一些实时性要求不高的指令，这些指令先缓存堆积，等到用户主动发指令的时候，一起发送<br/>
         * @param {number} cmd 协议号
         * @param {any} [data] 数据，简单数据(number,boolean,string)复合数据
         * @param {string} [msgType] 如果是复合数据，必须有此值
         */
        NetService.prototype.sendPassive = function (cmd, data, msgType) {
            //合并同协议的指令
            var pcmdList = this._pcmdList;
            var len = pcmdList.length;
            for (var _i = 0, pcmdList_1 = pcmdList; _i < pcmdList_1.length; _i++) {
                var temp = pcmdList_1[_i];
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
        };
        NetService.prototype.decodeBytes = function (bytes) {
            var recieveMSG = this._recieveMSG;
            var recievePool = this._netDataPool;
            var tmpList = this._tmpList;
            var idx = 0;
            out: while (true) {
                var msgLength = 0;
                var tmpPosition = bytes.position;
                var offset = 0;
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
                    }
                    else {
                        //not enough data,roll back
                        bytes.position = tmpPosition;
                        break out;
                    }
                }
                if (bytes.readAvailable >= msgLength) {
                    var readFrom = core.PBMessageUtils.readFrom("GameMsg", bytes, msgLength);
                    var cmd = readFrom["type"];
                    var type = recieveMSG[cmd];
                    // if (cmd == 10003) {
                    //     if (chuanqi.Core.show) {
                    //         alert("Get_Role_List_ SC back <<<<<<<<<<<<<<<<");
                    //     }
                    // }
                    var content = readFrom["content"];
                    content.position = 0;
                    var data = core.PBMessageUtils.readFrom(type, content);
                    var nData = recievePool.getInstance();
                    nData.cmd = cmd;
                    var now = new Date();
                    var time = core.DateUtils.getFormatTime(now.getTime(), "yyyy-MM-dd HH:mm:ss");
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
                }
                else {
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
        };
        NetService.prototype.dispatchData = function () {
            if (this._willDispatch) {
                var tmpList = this._tmpList.concat();
                this._tmpList.length = 0;
                var recievePool = this._netDataPool;
                var router = this._router;
                for (var i = 0; i < tmpList.length; i++) {
                    var nData = tmpList[i];
                    router.dispatch(nData);
                    //回收nData
                    recievePool.recycle(nData);
                }
                this._willDispatch = false;
            }
        };
        /**
         *
         * 模拟服务端
         * @param {number} cmd
         * @param {*} [data]
         */
        NetService.prototype.route = function (cmd, data) {
            var nData = this._netDataPool.getInstance();
            nData.cmd = cmd;
            nData.content = data;
            this._tmpList.push(nData);
            if (!this._willDispatch) {
                egret.callLater(this.dispatchData, this);
                this._willDispatch = true;
            }
        };
        return NetService;
    }());
    core.NetService = NetService;
    __reflect(NetService.prototype, "core.NetService");
})(core || (core = {}));
//# sourceMappingURL=NetService.js.map