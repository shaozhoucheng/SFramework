module shao.sui {
    export const enum LayoutType {
        /**
         * 垂直——上
         * 
         * @static
         * @type {number}
         */
        TOP = 0b0100,
        /**
         * 垂直——中
         * 
         * @static
         * @type {number}
         */
        MIDDLE = 0b1000,

        /**
         * 垂直——下
         * 
         * @static
         * @type {number}
         */
        BOTTOM = 0b1100,

        /**
         * 水平——左
         * 
         * @static
         * @type {number}
         */
        LEFT = 0b01,

        /**
         * 水平——中
         * 
         * @static
         * @type {number}
         */
        CENTER = 0b10,

        /**
         * 水平——右
         * 
         * @static
         * @type {number}
         */
        RIGHT = 0b11,

        /**
         * 垂直方向的位运算mask
         * 
         * @static
         * @type {number}
         */
        VERTICAL_MASK = 0b1100,

        /**
         * 水平方向位运算mask
         * 
         * @static
         * @type {number}
         */
        HORIZON_MASK = 0b11,

        /**
         * 左上
         */
        TOP_LEFT = TOP | LEFT,

        /**
         * 中上
         */
        TOP_CENTER = TOP | CENTER,

        /**
         * 右上
         */
        TOP_RIGHT = TOP | RIGHT,

        /**
         * 左中
         */
        MIDDLE_LEFT = MIDDLE | LEFT,

        /**
         * 中心
         */
        MIDDLE_CENTER = MIDDLE | CENTER,

        /**
         * 右中
         */
        MIDDLE_RIGHT = MIDDLE | RIGHT,

        /**
         * 左下
         */
        BOTTOM_LEFT = BOTTOM | LEFT,

        /**
         * 中下
         */
        BOTTOM_CENTER = BOTTOM | CENTER,

        /**
         * 右下
         */
        BOTTOM_RIGHT = BOTTOM | RIGHT
    }

	/**
	 *
	 * @author builder
	 *
	 */
    export const Layout = {

        /**
         * 对DisplayObject，基于父级进行排布
         * 
         * @static
         * @ param {egret.DisplayObject} dis 要布局的可视对象
         * @ param {number} layout 布局方式
         * @ param {number} hoffset 在原布局基础上，水平方向的再偏移量（内部运算是"+",向左传负）
         * @ param {number} voffset 在原布局基础上，垂直方向的再偏移量（内部运算是"+",向上传负）
         * @ param {boolean} [innerV=true] 垂直方向上基于父级内部
         * @ param {boolean} [innerH=true] 水平方向上基于父级内部
         * @ param {egret.DisplayObjectContainer} [parent] 父级容器，默认取可视对象的父级
         */
        layout: function (dis: egret.DisplayObject, layout: number, hoffset: number = 0, voffset: number = 0, innerV = true, innerH = true, parent?: egret.DisplayObjectContainer) {
            let parentWidth = 0;
            let parentHeight = 0;
            let posx = 0;
            let posy = 0;
            if (!parent) {
                parent = dis.parent;
            }
            if (parent) {

                if (is(parent, egret.Stage)) {
                    parentWidth = (<egret.Stage>parent).stageWidth;
                    parentHeight = (<egret.Stage>parent).stageHeight;

                } else if (parent instanceof game.GameLayer) {
                    let stage = egret.sys.$TempStage;
                    parentWidth = stage.stageWidth;
                    parentHeight = stage.stageHeight;

                } else {
                    parentWidth = parent.width;
                    parentHeight = parent.height;
                }

            }
            let vertical = layout & LayoutType.VERTICAL_MASK;
            let horizon = layout & LayoutType.HORIZON_MASK;
            switch (vertical) {
                case LayoutType.TOP:
                    if (innerV) {
                        posy = 0;
                    }
                    else {
                        posy = -dis.height;
                    }
                    break;
                case LayoutType.MIDDLE: // 不支持非innerV
                    posy = parentHeight - dis.height >> 1;
                    break;
                case LayoutType.BOTTOM:
                    if (innerV) {
                        posy = parentHeight - dis.height;
                    }
                    else {
                        posy = parentHeight;
                    }
                    break;
            }

            switch (horizon) {
                case LayoutType.LEFT:
                    if (innerH) {
                        posx = 0;
                    }
                    else {
                        posx = -dis.width;
                    }
                    break;
                case LayoutType.CENTER: // 不支持非innerH
                    posx = parentWidth - dis.width >> 1;
                    break;
                case LayoutType.RIGHT:
                    if (innerH) {
                        posx = parentWidth - dis.width;
                    }
                    else {
                        posx = parentWidth;
                    }
                    break;
            }
            posx = posx + hoffset;
            posy = posy + voffset;
            dis.x = Math.round(posx);
            dis.y = Math.round(posy);
        }
    }
}