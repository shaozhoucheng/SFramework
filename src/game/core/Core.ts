module core.game {

    import Event = egret.TouchEvent;
    /**
     * description
     * @author pb
     */
    export class Core {


        /**
         * 
         * 主角新人信息（只有在新创建的时候才用到）
         * 
         * @memberOf Core
         */
        public static $newRole: boolean = false;

        /* 
         * 主角新人信息（只有在新创建的时候才用到）
         * 
         * @memberOf Core
         */
        // public static $newRoleDTO: CreateRole_S2C_Msg ;

        /**
         * 主角新人登陆信息（只有在新创建的时候才用到）
         * 
         * 
         * @memberOf Core
         */
        // public static roleDTO: RoleDTO;

        /**
         * 主角信息
         * 
         * @static
         * @type {HeroVO}
         * @memberOf Core
         */
        // public static $hero: HeroVO;


        /**
         * 主角的宠物的GUID
         * 
         * @static
         * @type {number}
         * @memberOf Core
         */
        public static petGuid: number;

        /**
         * 当前地图ID
         * 
         * @static
         * @type {number}
         * @memberOf Core
         */
        public static $mapId: number;

        /**
         * 当前地图MapInfo信息
         * 
         * @static
         * @type {game.MapInfo}
         * @memberOf Core
         */
        // public static currentMap: game.MapInfo;

        // /**
        //  * 当前任务配置
        //  * 
        //  * @static
        //  * @type {ZhuXianRenWuCfg}
        //  * @memberOf Core
        //  */
        // public static $task: ZhuXianRenWuCfg;

        /**
         * 当前BOSS进度
         */
        // public static $taskChapter: TaskChapVO;

        /**
       * taskNext 
       */
        public static $nextTask: string;

        /**
         * 当前任务ID
         * 
         * @static
         * @type {string}
         * @memberOf Core
         */
        public static $targetId: string;

        public static stage: egret.Stage;

        /**
         * 主角信息
         * 
         * @static
         * @type {MainUnitEntity}
         * @memberOf Core
         */

        // public static unitEntity: MainUnitEntity;

        /**
         * 主角宠物信息
         * 
         * @static
         * @type {PetUnitEntity}
         * @memberOf Core
         */
        // public static pet: PetUnitEntity;

        /**
         * 登入参数
         * 
         * @static
         * @type {*}
         * @memberOf Core
         */
        public static params: any;

        /**
         * 调试用参数
         * 
         * @static
         * @type {string}
         * @memberOf Core
         */
        public static other: string;


        /**
         * 主域(域名)
         * 
         * @static
         * @type {string}
         * @memberOf Core
         */
        public static domain: string;


        /**
       * 主域(域名)
       * 
       * @static
       * @type {string}
       * @memberOf Core
       */
        public static loader: string;


        /**
         * 技能测试（暂未使用）
         * 
         * @static
         * @type {boolean}
         * @memberOf Core
         */
        public static skillHelp: boolean = false;


        /**
         * 自动拾取
         * 
         * @static
         * @type {boolean}
         * @memberOf Core
         */
        public static autoPick: boolean = true;


        /**
         * 自动挑战BOSS
         * 
         * @static
         * @type {boolean}
         * @memberOf Core
         */
        private static _autoBoss: boolean = false;

        /**
         * 相位状态
         * 
         * @static
         * @type {boolean}
         * @memberOf Core
         */

        public static inPhase: boolean = false;



        /**
         * 征战状态
         * 
         * @static
         * @type {boolean}
         * @memberOf Core
         */

        public static _inPVP: boolean = false;

        /**
         * 征战状态信息
         * 
         * @static
         * @type {boolean}
         * @memberOf Core
         */

        public static pvpInfo: { x: number, y: number };

        /**
         * 打怪模式
         * 
         * @static
         * @type {number}
         * @memberOf Core
         */
        public static autoModes: number = 0;

        /**
        * 当前服务器info
        */
        // public static serverInfoVO: ServerInfoVO;

        /**
        * 服务器信息vo
        */
        // public static serverVO: serverVO;


        /**
        * WebSocket
        */
        // public static socket: WSNetService;

        /**
       * loaderBg
       */
        public static loaderBg: egret.Texture;


        /**
        * showAlert
        */
        public static show: boolean;
        /**
       * report URL
       */
        public static reportTo: string;

        public static login: boolean = false;


        public static showAvatar: boolean = true;

        public static showWing: boolean = true;

        constructor() {
        }
l
        // private static pvpRender: game.AniRender;
        public static set inPVP(value: boolean) {
            // let ani = AniController.getInstance();
            // Core._inPVP = value;
            // if (Core.pvpRender) {
            //     Core.pvpRender.recycle();
            //     Core.pvpRender = undefined;
            // }
            // if (value) {
            //     var engine = game.GameEngine.instance;
            //     let stage = egret.sys.$TempStage;
            //     let x = (stage.stageWidth - 380) >> 1;
            //     let y = 480;
            //     Core.pvpRender = ani.playAniByPosition(AniDefine.PVP_STATE, x, y, game.GameLayerID.UI);
            // }
        }

        public static get inPVP() {
            return Core._inPVP;
        }

        public static start() {
            // if (DEBUG) {
            //     let mouseCatcher = game.GameEngine.instance.getLayer(game.GameLayerID.Background);
            //     mouseCatcher.$touchEnabled = true;
            //     mouseCatcher.on(Event.TOUCH_TAP,
            //     function (event: Event): void {
            //         let now = Global.now;
            //         var engine = game.GameEngine.instance;
            //         var rect = engine.viewRect;
            //         var x = event.stageX + rect.x;
            //         var y = event.stageY + rect.y;
            //         let main = this.unitEntity;
            //         if (main) {
            //             main.changeState(UnitEntityState.waiting);
            //             main.setTarget();
            //             let pt = { x, y };
            //             screen2Map(pt);
            //             main.walkToPos(pt, now);
            //             main.setAIDelay(500);
            //         }
            //     }, this);
            //     // Global.callLater(this.sendLog, 10000, this);
            // }
        }

        private static sendLog() {
            // let command = Command.getInstance();
            // command.readySendLog(24002, 43000);
            // console.log(`now addBody = ${lingyu.NameUtils.addBody}`)
            // console.log(`now addUI = ${lingyu.NameUtils.addUI}`)
            // console.log(`now removeBody = ${lingyu.NameUtils.removeBody}`)
            // console.log(`now removeUI = ${lingyu.NameUtils.removeUI}`)
            Global.callLater(this.sendLog, 10000, this);
        }

        /**
         * 切换自动拾取
         * 
         * @static
         * 
         * @memberOf Core
         */
        public static changePickState() {
            Core.autoPick = !Core.autoPick;
        }

        /**
         * 切换自动挑战BOSS
         * 
         * @static
         * 
         * @memberOf Core
         */
        // public static changeBossState(flag: boolean) {
        //     if (this._autoBoss == flag) return;
        //     this._autoBoss = flag;
        //     $saveSet(SetType.AutoBoss, flag ? "1" : "0");
        //     $facade.dispatchEventWith(EventConst.AUTOBOSS_STATE_CHANGE);

        //     if (flag) {
        //         if (!Core.$taskChapter) return;
        //         if (!Core.$taskChapter.state) return;
        //         $facade.getProxy(ServiceName.TaskService, (taskService: TaskService) => {
        //             let task = Core.$taskChapter.currentTask;
        //             if (task)
        //                 taskService.changeMap(task.mapid);
        //         });
        //     }
        // }

        public static getAutoBoss() {
            return this._autoBoss;
        }

        /**
         * 切换自动挂机
         * 
         * @static
         * 
         * @memberOf Core
         */
        public static changeAutoState(flag?: number) {
            // if (flag) {
            //     Core.other = undefined;
            //     return;
            // }
            if (Core.other && Core.other.length) {
                Core.other = undefined;
            } else {
                Core.other = "1";
            }
        }

        /**
		 * 晃动屏幕
		 * @param type 1:圆形, 2:方向, 3:垂直, 4:旋转, 5:更大强度的圆形
		 */
        public static shakeStage(type: ShakeType = 1, faceTo: number = 0): void {
            // getSinglon(ShakeManage).shakeStage(type, faceTo);
        }

        private static serverDate = new Date();
        public static getServerDate = (): Date => {
            Core.serverDate.setTime(DateUtils.serverTime);
            return Core.serverDate;
        }

        /**倒计时10秒 */
        public static COUNT_DOWN_10: number = 10000;

        /**倒计时5秒 */
        public static COUNT_DOWN_5: number = 5000;

        /**副本推送结果数据 */
        // public static fbResult: EntryDTO2[];

    }
    export const enum ShakeType {
        /**
         * 圆形
         */
        Circle = 1,
        /**
         * 方向
         */
        Direction = 2,
        /**
         * 垂直
         */
        Vertical = 3,
        /**
         * 旋转
         */
        Rotation = 4,
        /**
         * 更大强度的圆形
         */
        StrongCircle = 5
    }
}
