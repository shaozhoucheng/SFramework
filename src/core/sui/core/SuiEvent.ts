module shao.sui {

    /**
     * SuiEvent 区段 -1000 - -1999
     * 
     * @export
     * @enum {number}
     */
    export const enum SuiEvent {

        /*===============================ListItemRender====================================*/
        /**
        * 选中未选中
        * 
        * @static
        * @type {string}
        */
        CHOOSE_STATE_CHANGE = -1000,
        /**
         * List中单击事件
         */
        ITEM_TOUCH_TAP = -1001,

        /*===============================Group====================================*/
        /**
         * 分组发生改变
         */
        GROUP_CHANGE = -1020,


        /*===============================NumbericStepper/Slider====================================*/
        VALUE_CHANGE = -1040,

        /*===============================SCROLLER/PAGE====================================*/
        PAGE_CHANGE = -1050,

        SCROLL_POSITION_CHANGE = -1051,


    }
}