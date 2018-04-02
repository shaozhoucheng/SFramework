module core {
	/**
	 * 配置加载器<br/>
     * 用于预加载数据的解析
	 * @author builder
	 *
	 */
    export class DataLocator {

        private static parsers: { [index: string]: ConfigDataParser } = {};

        /**
         * 
         * 主数据
         * @private
         * @static
         * @type {{ [index: string]: any }}
         */
        private static data: { [index: string]: any } = {};

        /**
         * 
         * 其他附加数据，用于代替之前的 公共数据表
         * @private
         * @static
         * @type {{ [index: string]: { [index: string]: any } }}
         */
        private static extraData: { [index: string]: { [index: string]: any } } = {};

        /**
         * 
         * 用于处理顺序
         * @private
         * @static
         */
        private static _plist: string[] = [];


        /**
         * 注册配置解析
         * @param key       配置的标识
         * @param parser    解析器
         */
        public static regParser(key: string, parser: ConfigDataParser) {
            this.parsers[key] = parser;
            this._plist.push(key);
        }

        // 弃用此方法，数据全部打包
        // /**
        //  * 所有配置为独立文件解析所有数据
        //  */
        // public static parseDatas() {
        //     var parsers = this.parsers;
        //     for (let key of this._plist) {
        //         let parser = parsers[key];
        //         this.data[key] = parser(RES.getRes(key));
        //         RES.destroyRes(key);
        //     }

        //     //处理额外数据
        //     let extraData = this.extraData;
        //     for (let key in extraData) {
        //         let skey = "$" + key;
        //         let raw: any[] = RES.getRes(skey);
        //         RES.destroyRes(skey);
        //         let i = 0, len = raw.length, data: { [index: string]: any } = {};
        //         while (i < len) {
        //             let sub: string = raw[i++];
        //             let value = raw[i++];
        //             let test = raw[i];
        //             if (typeof test === "number") {
        //                 i++;
        //                 // 特殊类型数据
        //                 switch (test) {
        //                     case 3://boolean
        //                         value = !!value;
        //                         break;
        //                     case 6://Date
        //                     case 8:
        //                         value = new Date(value * 10000);
        //                         break;
        //                     case 7://TimeVO
        //                         value = new TimeVO(value);
        //                         break;
        //                     default:
        //                         break;
        //                 }
        //             }
        //             data[sub] = value;
        //         }
        //         extraData[key] = data;
        //     }

        //     //清理内存
        //     delete this.parsers;
        //     delete this._plist;
        // }

        /**
         * 解析打包的配置
         */
        public static parsePakedDatas() {
            egret.sys.$TempStage.on(egret.Event.ENTER_FRAME, this.onParse, this, false, 999999);
        }

        /**
         * 解析打包的配置
         */
        public static parseRegiest() {
            //egret.sys.$TempStage.on(egret.Event.ENTER_FRAME, this.onParse, this, false, 999999);
            var parsers = this.parsers;
            let key = "GongNeng"
            let parser = parsers[key];
            var configs = RES.getRes("regiest");
            let data = parser(configs[key]);
            if (data) { 
                this.data[key] = data;
            }
            key = "JieMianHuChi";
            parser = parsers[key];
            data = parser(configs[key]);
            if (data) { 
                this.data[key] = data;
            }
            key = "GongNengKaiFang";
            parser = parsers[key];
            data = parser(configs[key]);
            if (data) { 
                this.data[key] = data;
            }
            // key = "YinDao";
            // parser = parsers[key];
            // data = parser(configs[key]);
            // if (data) { 
            //     this.data[key] = data;
            // }
        }



        private static _cost: number;
        private static onParse(e?: egret.Event) {
            if (e) {
                this._cost = 0;
            }
            var parsers = this.parsers;
            let configs = RES.getRes("cfgs");
            if (this._plist && this._plist.length) {
                let now = Date.now();
                let key = this._plist.shift();
                let parser = parsers[key];
                let data = parser(configs[key]);
                if (data) { // 支持一些void的情况
                    this.data[key] = data;
                }
                this._cost += Date.now() - now;
                // if (this._cost <= 30) {
                //     this.onParse();
                // }
                this.onParse();
            } else {
                egret.sys.$TempStage.off(egret.Event.ENTER_FRAME, this.onParse, this);
                RES.destroyRes("cfgs");
                delete this.parsers;
                delete this._plist;
                mvc.Facade.simpleDispatch(lingyu.EventConst.DATA_LOCATOR);
                Global.setDataParsed();
                //szc
                let webServer = new lingyu.WSNetService
                new chuanqi.PreRegiest();
            }
        }



        /**
         * 根据标识获取配置数据
         * @param key   标识
         */
        public static getData(key: string) {
            return this.data[key];
        }

        /**
         * 
         * 设置/覆盖数据
         * @static
         * @param {string} key
         * @param {*} data
         */
        public static setData(key: string, data: any) {
            this.data[key] = data;
        }

        /**
         * 
         * 获取其他附加数据
         * @static
         * @param {string} key  主标识（模块标识）
         * @param {string} [sub]  子标识，不传子标识则返回全部数据
         */
        public static getExtra(key: string, sub?: string) {
            let mod = this.extraData[key];
            if (mod) {
                if (sub === undefined) {
                    return mod;
                }
                return mod[sub];
            }
            return undefined;
        }

        /**
         * 
         * 注册附加数据
         * @static
         * @param {string} key
         */
        public static regExtra(key: string) {
            this.extraData[key] = null;
        }

        /**
         * 注册通过H5ExcelTool导出的数据并且有唯一标识的使用此方法注册
         * @param {string}              key             数据的标识
         * @param {{ new (): ICfg }}    CfgCreator      配置的类名
         * @param {string}              [idkey="id"]    唯一标识
         */
        public static regCommonParser(key: string, CfgCreator: { new(): ICfg }, idkey: string = "id") {
            this.regParser(key, (data: any): any => {
                let dict = {};
                try {
                    DataParseUtil.copyDataListForCfg(CfgCreator, data, this.commonParserForEach, this, [dict, idkey, key]);
                } catch (err) {
                    if (DEBUG) {
                        // ThrowError(`解析配置:${key}出错`);
                    }
                }
                return dict;
            });
        }

        private static commonParserForEach(t: ICfg, args: any[], idx?: number) {
            let dict = args[0];
            let idKey = args[1];
            if (idKey in t) {
                let id = t[idKey];
                if (DEBUG) {
                    if (typeof id === "object") {
                        ThrowError(`配置${args[2]}的数据有误，唯一标识${idKey}不能为对象`);
                    }
                    if (id in dict) {
                        ThrowError(`配置${args[2]}的数据有误，唯一标识${idKey}有重复值：${id}`);
                    }
                }
                dict[id] = t;
                return true;
            } else {
                if (DEBUG) {
                    ThrowError(`配置${args[2]}解析有误，无法找到指定的唯一标示：${idKey}，数据索引：${idx}`);
                }
                return false;
            }
        }
    }

	/**
	 * 配置数据解析函数
	 */
    export interface ConfigDataParser {
        (data: any): any;
    }
}