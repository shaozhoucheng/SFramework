module shao.sui {
    export class TabGroup extends egret.EventDispatcher
    {
        private _list: eui.ToggleButton[];
        private _selectedItem: eui.ToggleButton;
        private _selectedIndex: number = -1;

        // private container: egret.DisplayObjectContainer;

         constructor() {
            super();
            this._list = [];
            // this.container = container;
            this._checklist = {};
            // this._displaylist = {};
        }
        
        private _checklist: { [index: number]: Function };
        // private _displaylist: { [index: number]: egret.DisplayObject };

         /**
         * 添加单个组件
         * 
         * @param {IGroupItem} item
         */
        public addItem(item: eui.ToggleButton,check?: () => boolean) {
            if (item) {
                this._list.pushOnce(item);
                let index = this._list.indexOf(item);
                if (check)
                    this._checklist[index] = check;
                // if(display)
                //     this._displaylist[index] = display;
                item.on(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
            }
        }

         touchHandler(e: egret.TouchEvent) {
            let item = e.target;
            let idx = this._list.indexOf(item);
            let fun = this._checklist[idx];
            if (fun && !fun()) return;
            this.selectedIndex = idx;
        }

         /**
         * 移除单个组件
         * 
         * @param {IGroupItem} item
         */
        public removeItem(item: eui.ToggleButton) {
            if (item) {
                let index = this._list.indexOf(item);
                // let display = this._displaylist[index];
                // if(display) removeDisplay(display);
                this._list.remove(item);
                item.off(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
            }
        }

        /**
         * 设置选中组件
         */
        public set selectedItem(item: eui.ToggleButton) {
            let _selectedItem = this._selectedItem;
            if (_selectedItem == item) return;

            if (_selectedItem) {
                if ("selected" in _selectedItem) {
                    _selectedItem["selected"] = false;
                }
                // let index = this._list.indexOf(item);
                // let display = this._displaylist[index];
                // if (display) {
                //     removeDisplay(display);
                // }
            }
            this._selectedItem = item;
            _selectedItem = this._selectedItem;

            if (_selectedItem) {
                if (!~this._list.indexOf(_selectedItem)) {
                    ThrowError("Group 设置的组件未添加到该组");
                }
                if ("selected" in _selectedItem) {
                    _selectedItem["selected"] = true;
                }
                // let index = this._list.indexOf(item);
                // let display = this._displaylist[index];
                // if (display && this.container) {
                //     this.container.addChild(display);
                // }
            }

            this.dispatchEventWith(<any>SuiEvent.GROUP_CHANGE);
        }


        public get selectedItem(): eui.ToggleButton {
            return this._selectedItem;
        }

         /**
         * 设置选中索引
         */
        public set selectedIndex(idx: number) {
            this._selectedIndex = idx;
            if (idx >= 0) {
                let item = this._list[idx];
                this.selectedItem = item;
                item.selected = true;
            }
            else {
                this.selectedItem = undefined;
            }
        }

        public get selectedIndex(): number {
            return this._selectedIndex;
        }
    }
}