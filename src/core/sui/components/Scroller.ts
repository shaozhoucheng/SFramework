module shao.sui {
    export class Scroller extends egret.EventDispatcher {


        // protected _scrollbar: ScrollBar;

        protected _content: egret.DisplayObject;

        protected _scrollEnd: number;

        protected _scrollType: number = 0;

        protected _lastMoveTime: number;

        protected _lastTargetPos: number;

        /***滑块移动一像素，target滚动的距离*/
        protected _piexlDistance: number;

        /**鼠标每移动1像素，元件移动的像素 */
        public globalspeed: number = 3;

        /***是不是一直显示滚动条 */
        public alwaysShowBar: boolean;

        /**最小的滑动速度，当前值低于此值后不再滚动 */
        public minEndSpeed: number = 0.0001;

        /**速度递减速率 */
        public blockSpeed: number = 0.98;

        // protected _useScrollBar: boolean;

        protected _deriction: number = 1;

        protected _moveSpeed: number = 0;

        protected _lastFrameTime: number;

        public constructor() {
            super();
        }
        /**滚动条方式 0：垂直，1：水平 defalut:0*/
        public set scrollType(value: number) {
            this._scrollType = value;
            this.addPropertyListener();
            // this.checkScrollBarView();
        }
        /**滚动条方式 0：垂直，1：水平 defalut:0*/
        public get scrollType(): number {
            return this._scrollType;
        }

        // protected checkScrollBarView() {
        //     if (!this._useScrollBar || !this._content) return;
        //     this._scrollbar.scrollType = this._scrollType;
        //     let rect: egret.Rectangle = this._content.scrollRect;
        //     if (this._scrollType == 0) {
        //         this._scrollbar.bgSize = rect.height;
        //         this._scrollbar.y = this._content.y;
        //     } else {
        //         this._scrollbar.bgSize = rect.width;
        //         this._scrollbar.x = this._content.x;
        //     }

        // }

        // protected onScrollBarAdded(e?: egret.Event) {
        //     if (this.alwaysShowBar) {
        //         this._scrollbar.alpha = 1;
        //     } else {
        //         this._scrollbar.alpha = 0;
        //     }
        // }

        /**
         * 绑定目标与滚动条
         * 
         * @ content (需要滚动的目标)
         * @ scrollRect (显示的区域大小)
         * @ scrollbar (可选，如果不想显示滚动条可不传)
         */
        public bindObj(content: egret.DisplayObject, scrollRect: egret.Rectangle/*, scrollbar?: ScrollBar*/) {
            this._content = content;
            if ("scroller" in content) {
                content["scroller"] = this;
            }
            content.touchEnabled = true;
            content.scrollRect = scrollRect;
            content.on(egret.TouchEvent.TOUCH_BEGIN, this.onTargetTouchBegin, this);
            // if (scrollbar) {
            //     this._scrollbar = scrollbar;
            //     this._useScrollBar = true;
            //     this.checkScrollBarView();
            //     this.scaleBar();
            //     if (scrollbar.stage) {
            //         this.onScrollBarAdded();
            //     } else {
            //         scrollbar.on(egret.Event.ADDED_TO_STAGE, this.onScrollBarAdded, this);
            //     }

            // } else {
            //     this._useScrollBar = false;
            // }
            this.addPropertyListener();
            this.checkScrollEnd();
            this.scrollToHead();
        }


        public removeListener()
        {
            this._content.off(egret.TouchEvent.TOUCH_BEGIN, this.onTargetTouchBegin, this);
        }

        protected addPropertyListener() {
            if (!this._content) {
                return;
            }
            if (this._scrollType == 0) {
                Watcher.watch(this._content, ["height"], this.contentSizeChange, this);
            }
            else {
                Watcher.watch(this._content, ["width"], this.contentSizeChange, this);
            }

        }

        protected contentSizeChange(value: any) {
            // if (this._useScrollBar) {
            //     this.scaleBar();
            // } else {
            //     this.checkScrollEnd();
            // }
            this.checkScrollEnd();
        }

        protected onTargetTouchBegin(e: egret.TouchEvent) {
            if (this._scrollType == 0) {
                if (this._content.height < this._content.scrollRect.height) {
                    return;
                }

            } else {
                if (this._content.width < this._content.scrollRect.width) {
                    return;
                }

            }
            this._lastMoveTime = Global.now;
            if (this._scrollType == 0) {
                this._lastTargetPos = e.stageY;
            }
            else {
                this._lastTargetPos = e.stageX;
            }
            this._content.stage.on(egret.TouchEvent.TOUCH_MOVE, this.moveOnContent, this);
            this._content.on(egret.TouchEvent.TOUCH_END, this.endTouchContent, this);
            this._content.on(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.endTouchContent, this);
            // if (this._useScrollBar) {
            //     if (!this.alwaysShowBar) {
            //         let tween: lingyu.Tween = Global.getTween(this._scrollbar, undefined, undefined, true);
            //         tween.to({ alpha: 1 }, 500);
            //     }
            // }

        }

        protected moveOnContent(e: egret.TouchEvent) {
            let currentPos: number;
            if (this._scrollType == 0) {
                currentPos = e.stageY;
            } else {
                currentPos = e.stageX;
            }
            let sub: number = currentPos - this._lastTargetPos;
            this._deriction = sub > 0 ? 1 : -1;
            sub = Math.abs(sub);
            let now = Global.now;
            let subTime: number = now - this._lastMoveTime;
            this._lastMoveTime = now;
            this._lastTargetPos = currentPos;
            this._moveSpeed = subTime > 0 ? sub / subTime : 0;
            sub = sub * this.globalspeed * this._deriction;
            this.doScrollContent(sub);
        }

        protected onEnterFrame(e: egret.Event) {
            if (this._moveSpeed == 0) {
                this._content.off(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
                // if (this._useScrollBar) {
                //     if (!this.alwaysShowBar) {
                //         let tween: lingyu.Tween = Global.getTween(this._scrollbar, undefined, undefined, true);
                //         tween.to({ alpha: 0 }, 1000);
                //     }
                // }
                return;
            }
            let now = Global.now;
            let subTime = now - this._lastFrameTime;
            let sub = this._moveSpeed * this._deriction * subTime * this.globalspeed;
            this.doScrollContent(sub);
            this._lastFrameTime = now;
            this._moveSpeed *= this.blockSpeed;
            if (this._moveSpeed < this.minEndSpeed) {
                this._moveSpeed = 0;
            }
        }

        protected endTouchContent(e: egret.TouchEvent) {
            if (this._content.stage) {
                this._content.stage.off(egret.TouchEvent.TOUCH_MOVE, this.moveOnContent, this);
            }
            this._content.off(egret.TouchEvent.TOUCH_END, this.endTouchContent, this);
            this._content.off(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.endTouchContent, this);
            let now: number = Global.now;
            if (now - this._lastMoveTime < 150) {
                this._content.on(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
                this._lastFrameTime = this._lastMoveTime;
            }
            else {
                // if (this._useScrollBar) {
                //     if (!this.alwaysShowBar) {
                //         let tween: lingyu.Tween = Global.getTween(this._scrollbar, undefined, undefined, true);
                //         tween.to({ alpha: 0 }, 1000);
                //     }

                // }
            }
        }

        /**
         * 执行滚动
         * 
         * @ sub (滚动的距离)
         */
        public doScrollContent(sub: number) {
            let rect: egret.Rectangle = this._content.scrollRect;
            let oldx = rect.x;
            let oldy = rect.y;
            if (this._scrollType == 0) {
                rect.y -= sub;
                if (rect.y <= 0) {
                    rect.y = 0;
                    this._moveSpeed = 0;
                }
                if (rect.y >= this._scrollEnd) {
                    rect.y = this._scrollEnd;
                    this._moveSpeed = 0;
                }
            }
            else {
                rect.x -= sub;
                if (rect.x <= 0) {
                    rect.x = 0;
                    this._moveSpeed = 0;
                }
                if (rect.x >= this._scrollEnd) {
                    rect.x = this._scrollEnd;
                    this._moveSpeed = 0;
                }
            }
            this._content.scrollRect = rect;
            if (oldx != rect.x || oldy != rect.y) {
                this._content.dispatchEventWith(<any>SuiEvent.SCROLL_POSITION_CHANGE);
            }
            // this.doMoveScrollBar(sub);
        }

        // public doMoveScrollBar(sub: number) {
        //     if (!this._useScrollBar) {
        //         return;
        //     }
        //     let barPos: number;
        //     let subPos: number = sub / this._piexlDistance;
        //     if (this._scrollType == 0) {
        //         barPos = this._scrollbar.bar.y;
        //     }
        //     else {
        //         barPos = this._scrollbar.bar.x;
        //     }
        //     barPos = barPos - subPos;
        //     if (barPos <= 0) {
        //         barPos = 0;
        //     }
        //     if (barPos >= this._scrollbar.bgSize - this._scrollbar.barSize) {
        //         barPos = this._scrollbar.bgSize - this._scrollbar.barSize;
        //     }
        //     if (this._scrollType == 0) {
        //         this._scrollbar.bar.y = barPos;
        //     }
        //     else {
        //         this._scrollbar.bar.x = barPos;
        //     }

        // }

        /**
         * 移动到指定位置
         * 
         * @ pos (位置)
         */
        public scrollTo(pos: number) {
            if (pos <= 0) {
                this.scrollToHead();
            } else if (pos >= this._scrollEnd) {
                this.scrollToEnd();
            }
            else {
                let rect: egret.Rectangle = this._content.scrollRect;
                let curpos: number;
                if (this._scrollType == 0) {
                    curpos = rect.y;
                } else {
                    curpos = rect.x;
                }
                this.doScrollContent(pos - curpos);
            }

        }

        /**移动至头 */
        public scrollToHead() {
            if (this._moveSpeed > 0) {
                this._moveSpeed = 0;
                this._content.off(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            }

            let rect: egret.Rectangle = this._content.scrollRect;
            if (this._scrollType == 0) {
                rect.y = 0;
                // if (this._useScrollBar) {
                //     this._scrollbar.bar.y = 0;
                // }
            } else {
                rect.x = 0;
                // if (this._useScrollBar) {
                //     this._scrollbar.bar.x = 0;
                // }
            }
            this._content.scrollRect = rect;
        }
        /**移动至尾 */
        public scrollToEnd() {
            let rect: egret.Rectangle = this._content.scrollRect;
            if (this._scrollType == 0) {
                rect.y = this._scrollEnd;
                // if (this._useScrollBar) {
                //     this._scrollbar.bar.y = this._scrollbar.bgSize - this._scrollbar.barSize;
                // }
            }
            else {
                rect.x = this._scrollEnd;
                // if (this._useScrollBar) {
                //     this._scrollbar.bar.x = this._scrollbar.bgSize - this._scrollbar.barSize;
                // }
            }
            this._content.scrollRect = rect;
        }

        // protected scaleBar() {
        //     let scale: number;
        //     let contentSize: number;
        //     if (this._scrollType == 0) {
        //         contentSize = this._content.height;
        //     }
        //     else {
        //         contentSize = this._content.width;
        //     }
        //     scale = this._scrollbar.bgSize / contentSize;
        //     if (scale >= 1) {
        //         scale = 1;
        //     }
        //     this._scrollbar.barSize = this._scrollbar.bgSize * scale;
        //     this.checkScrollEnd();
        //     this._piexlDistance = contentSize / this._scrollbar.bgSize;
        //     this.checkAndResetBarPos();
        // }

        public checkScrollEnd() {
            if (!this._content) {
                return;
            }
            let contentSize: number;
            let rect: egret.Rectangle = this._content.scrollRect;
            let scrollSize: number;
            if (this._scrollType == 0) {
                contentSize = this._content.height;
                scrollSize = rect.height;
            }
            else {
                contentSize = this._content.width;
                scrollSize = rect.width;
            }
            this._scrollEnd = Math.round(Math.max(contentSize - scrollSize, 0));
        }

        // protected checkAndResetBarPos() {
        //     let rect: egret.Rectangle = this._content.scrollRect;
        //     let tmp: number;
        //     if (this._scrollType == 0) {
        //         tmp = rect.y / this._scrollEnd;
        //         if (tmp <= 0) {
        //             this._scrollbar.bar.y = 0;
        //         } else {
        //             this._scrollbar.bar.y = this._scrollbar.bgSize * tmp - this._scrollbar.barSize;
        //         }

        //     }
        //     else {
        //         tmp = rect.x / this._scrollEnd;
        //         if (tmp <= 0) {
        //             this._scrollbar.bar.x = 0;
        //         }
        //         else {
        //             this._scrollbar.bar.x = this._scrollbar.bgSize * tmp - this._scrollbar.barSize;
        //         }

        //     }

        // }
    }
}