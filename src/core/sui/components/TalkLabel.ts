module shao.sui {
    export class TalkLabel {
        public constructor(txt: egret.TextField, talk: string, time: number=300, callback?: Function,target?:any) {
            this._talk = talk;
            this._txt = txt;
            this._time = time;
            this._cb = callback
            this._target = target
        }

        private _talk: string;
        private _time: number;
        private _cb: Function;
        private _txt: egret.TextField;
        private _count: number;
        private _target: any;
        private _cur:number;
        private _timer:egret.Timer;

        public playTalk() {
            this._count = this._talk.length;
            let timer: egret.Timer=this._timer = new egret.Timer(this._time);
            this._cur = 0;
            timer.addEventListener(egret.TimerEvent.TIMER, this.onTimeUpdate, this);
            // timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimeComplete, this);
            timer.start();
        }

        private onTimeUpdate(evt:egret.TimerEvent)
        {
            if(this._cur == this._talk.length)
            {
                this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimeUpdate, this);
                if(this._cb)
                {
                    this._cb.call(this._target)
                }
                return;
            }
            this._txt.text +=this._talk[this._cur]
            this._cur++;
        }

        // private onTimeComplete(evt:egret.TimerEvent)
        // {

        // }

        public clearTalk() {

        }
    }
}