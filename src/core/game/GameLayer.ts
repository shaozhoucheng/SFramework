module shao.game {

    /**
    * GameLayer
    * 用于后期扩展
    */
    export class GameLayer extends egret.Sprite {

        /**
         * 层id
         */
        public id: number;

        constructor(id: number) {
            super();
            this.id = id;
        }
    }


    /**
     * 需要对子对象排序的层
     */
    export class SortedLayer extends GameLayer {
        $doAddChild(child: egret.DisplayObject, index: number, notifyListeners: boolean = true): egret.DisplayObject {
            if ("depth" in child) {
                GameEngine.invalidateSort();
                return super.$doAddChild(child, index, notifyListeners);
            }
            else {
                throw new Error("Only IDepth can be added to this Layer(" + this.id + ")");
            }
        }

        /**
         * 进行排序
         */
        public sort() {
            //对子集排序
            this.$children.sort((a, b) => {
                return a["depth"] - b["depth"];
            });
        }

        // $doRemoveChild() {
        //     return super.$doRemoveChild(child, index, notifyListeners);
        // }

    }
}