var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var mvc;
    (function (mvc) {
        /**
         * 模块管理器
         * 用于管理模块的开启/关闭
         * @author builder
         *
         */
        var ModuleManager = (function () {
            function ModuleManager() {
                /**
                 * 需要检查
                 */
                this._needCheck = false;
                /**
                 * 需要检查显示
                 */
                this._needCheckShow = false;
            }
            ModuleManager.prototype.init = function () {
                this._bindedIOById = [];
                this._handlersByType = [];
                this._checkers = [];
                this._allById = {};
                this._unshowns = [];
                this._handlersById = {};
                this._moduleList = {};
                // this._ioBind = new MapDict();
                this._ioBind = new core.MapDict();
                mvc.Facade.getInstance().on(-155 /* MODULE_NEED_CHECK_SHOW */, this.checkShowHandler, this);
                mvc.Facade.on(1 /* SIDE_MODULE_HIDE */, this.onModuleHide, this);
                mvc.Facade.on(0 /* SIDE_MODULE_SHOW */, this.onModuleShow, this);
            };
            ModuleManager.prototype.onModuleHide = function (e) {
                var cfg = e.data;
                var arr = this._bindedIOById[cfg.id];
                if (arr) {
                    arr.forEach(function (d) {
                        if ("selected" in d) {
                            d["selected"] = false;
                        }
                    });
                }
            };
            ModuleManager.prototype.onModuleShow = function (e) {
                var cfg = e.data;
                var arr = this._bindedIOById[cfg.id];
                if (arr) {
                    arr.forEach(function (d) {
                        if ("selected" in d) {
                            d["selected"] = true;
                        }
                    });
                }
            };
            /**
             * 设置模块配置数据
             * @param { [index: string]: ModuleCfg }    cfgs
             */
            ModuleManager.prototype.setCfgs = function (cfgs) {
                this._allById = cfgs;
                for (var id in cfgs) {
                    var cfg = cfgs[id];
                    if (!this._moduleList[cfg.showtype]) {
                        this._moduleList[cfg.showtype] = [];
                    }
                    this._moduleList[cfg.showtype][id] = cfg;
                }
                this.doCheckLimits();
            };
            /**
             * 根据配置类型，注册模块处理器
             * @param type
             * @param handler
             *
             */
            ModuleManager.prototype.registerHandler = function (type, handler) {
                this._handlersByType[type] = handler;
            };
            /**
             * 根据模块ID注册处理函数
             * @param id
             * @param handler
             *
             */
            ModuleManager.prototype.registerHandlerById = function (id, handler) {
                var cfg = this._allById[id];
                if (cfg) {
                    this._handlersById[id] = handler;
                }
                else {
                    core.ThrowError("ModuleManager 注册模块处理函数时，没有找到对应的模块配置，模块id:" + id);
                }
            };
            Object.defineProperty(ModuleManager.prototype, "checkers", {
                /**
                 * 设置限制检查器
                 * @param value	一个字典<br/>
                 * Key  	{number}            限制器(showtype,limittype)类型<br/>
                 * Value	{IModuleChecker}	    模块限制检查器
                 *
                 */
                set: function (value) {
                    this._checkers = value;
                    this.doCheckLimits();
                },
                enumerable: true,
                configurable: true
            });
            ModuleManager.prototype.doCheckLimits = function () {
                this._needCheck = true;
                egret.callLater(this.checkLimits, this);
            };
            /**
             * 检查限制
             */
            ModuleManager.prototype.checkLimits = function () {
                if (this._needCheck) {
                    this._needCheck = false;
                    var _checks = this._checkers;
                    var _allById = this._allById;
                    if (_checks) {
                        if (true) {
                            var errString = "";
                            var limitWarn = "";
                            var unsolve = "";
                        }
                        var checker;
                        for (var id in _allById) {
                            var cfg = _allById[id];
                            var showtype = cfg.showtype;
                            if (showtype) {
                                checker = _checks[showtype];
                                if (true) {
                                    if (!checker) {
                                        unsolve += cfg.id + "的显示限制 ";
                                    }
                                }
                            }
                            var limittype = cfg.limittype;
                            if (limittype) {
                                checker = _checks[limittype];
                                if (true) {
                                    if (!checker) {
                                        unsolve += cfg.id + "的使用限制 ";
                                    }
                                }
                            }
                            if (showtype == limittype) {
                                if (showtype) {
                                    if (checker) {
                                        if (false) {
                                            checker.adjustLimitDatas(cfg.showlimits, cfg.limits);
                                        }
                                        if (true) {
                                            if (checker.adjustLimitDatas(cfg.showlimits, cfg.limits)) {
                                                errString += cfg.id + " ";
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                if (true) {
                                    limitWarn += cfg.id + " ";
                                }
                            }
                            if (!this.isModuleShow(cfg)) {
                                var id_1 = cfg.id;
                                this._unshowns.push(id_1);
                                var displays = this._bindedIOById[id_1];
                                if (displays) {
                                    for (var _i = 0, displays_1 = displays; _i < displays_1.length; _i++) {
                                        var io = displays_1[_i];
                                        io.visible = false;
                                    }
                                }
                            }
                        }
                        if (true) {
                            if (limitWarn) {
                                core.ThrowError("id为：" + limitWarn + "的功能配置，showtype和limittype不一致，请确认是否要这样，这种配置将无法通过程序的方式确认当可以使用功能的时候，是否一定看得见功能入口", 2);
                            }
                            if (errString) {
                                core.ThrowError("id为:" + errString + "的功能配置使用限制和显示限制配置有误，自动进行修正", 2);
                            }
                            if (unsolve) {
                                core.ThrowError("有功能配置的限制类型并未实现：", 2);
                            }
                        }
                        mvc.Facade.simpleDispatch(-150 /* MODULE_CHECKER_INITED */);
                    }
                }
            };
            /**
             * 模块是否已经显示
             * @param module    {string | number | ModuleCfg}    模块或者模块配置
             */
            ModuleManager.prototype.isModuleShow = function (module) {
                var cfg = this.getCfg(module);
                var flag = cfg && !cfg.close;
                if (flag && this._checkers) {
                    var checker = this._checkers[cfg.showtype];
                    if (checker) {
                        flag = checker.check(cfg.showlimits, false);
                    }
                }
                return flag;
            };
            /**
             * 模块是否已经开启
             * @param module    {string | ModuleCfg}    模块或者模块配置
             * @param showtip   是否显示Tip
             */
            ModuleManager.prototype.isModuleOpened = function (module, showtip) {
                var cfg = this.getCfg(module);
                if (false || core.ClientCheck.isClientCheck) {
                    var flag = cfg && !cfg.close && cfg.serverOpen;
                    if (flag) {
                        if (this._checkers) {
                            var checker = this._checkers[cfg.limittype];
                            if (checker) {
                                flag = checker.check(cfg.limits, showtip);
                            }
                        }
                    }
                    else {
                        if (showtip && this.tipHandler) {
                            this.tipHandler("closed");
                        }
                    }
                    return flag;
                }
                else {
                    return true;
                }
            };
            /**
             * 将交互对象和功能id进行绑定，当交互对象抛出事件后，会执行功能对应的处理器
             * @param id					功能id
             * @param io					交互对象
             * @param eventType		事件
             *
             */
            ModuleManager.prototype.bindButton = function (id, io, eventType) {
                //注册按钮
                //szc 屏蔽
                // chuanqi.registBtnByModule(io, id);
                if (eventType === void 0) { eventType = egret.TouchEvent.TOUCH_TAP; }
                if (this._ioBind.has(io)) {
                    core.ThrowError("ModuleManager 注册按钮时候，重复注册了按钮");
                    return;
                }
                var arr = this._bindedIOById[id];
                if (!arr) {
                    this._bindedIOById[id] = arr = [];
                }
                arr.push(io);
                this._ioBind.set(io, id);
                io.on(eventType, this.ioHandler, this);
                var cfg = this._allById[id];
                if (!cfg) {
                    core.ThrowError("ModuleManager 注册按钮时候，没有找到对应的模块配置，模块id:" + id);
                    return;
                }
                if (this.createToolTip) {
                    var toolTips = this.createToolTip(cfg);
                    if (toolTips) {
                        //szc 屏蔽
                        // sui.ToolTipManager.register(io, toolTips);
                    }
                }
                var moduleHandler = this._handlersByType[cfg.type];
                if (moduleHandler) {
                    this.registerHandlerById(id, moduleHandler);
                }
                var _unshowns = this._unshowns;
                if (!this.isModuleShow(id)) {
                    io.visible = false;
                    _unshowns.pushOnce(id);
                }
                else {
                    _unshowns.remove(id);
                }
            };
            /**
             * 交互事件的处理
             * @param event
             *
             */
            ModuleManager.prototype.ioHandler = function (event) {
                this.toggle(this._ioBind.get((event.currentTarget)));
                event.stopPropagation();
            };
            /**
             * 检查显示
             * @param event
             *
             */
            ModuleManager.prototype.checkShowHandler = function (event) {
                this._needCheckShow = true;
                egret.callLater(this._checkShowHandler, this);
            };
            ModuleManager.prototype._checkShowHandler = function () {
                if (!this._needCheckShow) {
                    return;
                }
                this._needCheckShow = false;
                var changed = false;
                var _unshowns = this._unshowns;
                for (var i = _unshowns.length - 1; i >= 0; i--) {
                    var id = _unshowns[i];
                    if (this.isModuleShow(id)) {
                        var displays = this._bindedIOById[id];
                        if (displays) {
                            for (var _i = 0, displays_2 = displays; _i < displays_2.length; _i++) {
                                var dis = displays_2[_i];
                                dis.visible = true;
                            }
                        }
                        changed = true;
                        _unshowns.splice(i, 1);
                        mvc.Facade.simpleDispatch(-157 /* MODULE_SHOW */, id);
                    }
                }
                if (changed) {
                    mvc.Facade.simpleDispatch(-154 /* MODULE_SHOW_CHANGED */, _unshowns.length);
                }
            };
            /**
             * 打开/关闭指定模块
             *
             * @param {(string | number)} moduleID 模块ID
             * @param {any} [show=-1] 1 打开模块<br/> 0 关闭模块<br/> -1 自动切换(默认)
             * @param {boolean} [showtip=true]
             * @param {(string | number)} [preModuleID]
             * @returns
             *
             * @memberOf ModuleManager
             */
            ModuleManager.prototype.toggle = function (moduleID, show, showtip, preModuleID) {
                if (show === void 0) { show = -1; }
                if (showtip === void 0) { showtip = true; }
                var cfg = this._allById[moduleID];
                if (cfg) {
                    mvc.Facade.simpleDispatch(-151 /* MODULE_TRY_TOGGLE */, moduleID);
                    var mediator = core.$facade.getMediator2(cfg.id);
                    if (!mediator.checkModuleOpen()) {
                        if (showtip) {
                            //szc 屏蔽
                            // CoreFunction.showClientTips(LangUtil.getMsg($MsgBase.$1079));
                        }
                        return false;
                    }
                    var moduleHandler = this._handlersById[moduleID];
                    if (!moduleHandler) {
                        moduleHandler = this._handlersByType[cfg.type];
                    }
                    if (moduleHandler) {
                        // this.moduleLimited(cfg);
                        switch (show) {
                            case -1:
                                switch (cfg.showState) {
                                    case mvc.ModuleShowState.HIDE:
                                    case mvc.ModuleShowState.HIDING:
                                        moduleHandler.open(cfg, preModuleID);
                                        break;
                                    case mvc.ModuleShowState.SHOW:
                                    case mvc.ModuleShowState.SHOWING:
                                        moduleHandler.close(cfg, preModuleID);
                                        break;
                                }
                                break;
                            case 0:
                                moduleHandler.close(cfg, preModuleID);
                                break;
                            case 1:
                                moduleHandler.open(cfg, preModuleID);
                                break;
                        }
                        return true;
                    }
                }
                else {
                    //szc 屏蔽
                    // CoreFunction.showClientTips(LangUtil.getMsg($MsgBase.$1079));
                    core.ThrowError("ModuleManager execute时，无法找到对应配置,name" + moduleID);
                    return false;
                }
            };
            ModuleManager.prototype.moduleLimited = function (_cfg) {
                var list = this._moduleList[_cfg.showtype];
                if (_cfg.showtype == 1)
                    return;
                for (var id in list) {
                    var cfg = list[id];
                    if (cfg.id != _cfg.id) {
                        var moduleHandler = this._handlersById[cfg.id];
                        if (!moduleHandler) {
                            moduleHandler = this._handlersByType[cfg.type];
                        }
                        moduleHandler.close(cfg);
                    }
                }
            };
            /**
             * 获取模块
             * @param module
             */
            ModuleManager.prototype.getCfg = function (module) {
                return typeof module === "object" ? module : this._allById[module];
            };
            /**
             * 改变服务器模块状态
             *
             * @param {string}  mid    服务器模块id
             * @param {boolean} state       模块状态
             */
            ModuleManager.prototype.serverChangeModuleState = function (mid, state) {
                var mcfg = this._allById[mid];
                if (mcfg) {
                    if (state != mcfg.serverOpen) {
                        mcfg.serverOpen = state;
                        if (state) {
                            mvc.Facade.simpleDispatch(-153 /* MODULE_SERVER_OPEN */, mid);
                        }
                        else {
                            mvc.Facade.simpleDispatch(-152 /* MODULE_SERVER_CLOSE */, mid);
                        }
                    }
                }
            };
            ModuleManager.prototype.getAllCfgs = function () {
                return this._allById;
            };
            return ModuleManager;
        }());
        mvc.ModuleManager = ModuleManager;
        __reflect(ModuleManager.prototype, "core.mvc.ModuleManager");
    })(mvc = core.mvc || (core.mvc = {}));
})(core || (core = {}));
//# sourceMappingURL=ModuleManager.js.map