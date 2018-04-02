var core;
(function (core) {
    var mvc;
    (function (mvc) {
        var inter1 = "addReadyExecute";
        var inter2 = "startSync";
        function isIAsync(instance) {
            /*不验证数据，因为现在做的是get asyncHelper(),不默认创建AsyncHelper，调用的时候才创建，这样会导致多一次调用*/
            if (!(inter1 in instance || typeof instance[inter1] !== "function") /*|| !(instance[inter1] instanceof AsyncHelper)*/) {
                return false;
            }
            if (!(inter2 in instance) || typeof instance[inter2] !== "function" || instance[inter2].length != 0) {
                return false;
            }
            return true;
        }
        mvc.isIAsync = isIAsync;
    })(mvc = core.mvc || (core.mvc = {}));
})(core || (core = {}));
//# sourceMappingURL=IAsync.js.map