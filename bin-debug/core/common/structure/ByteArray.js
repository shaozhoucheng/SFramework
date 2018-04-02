var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var core;
(function (core) {
    /**
     * 方便后续调整
     * 加入ProtoBuf的varint支持
     * @author builder
     *
     */
    var ByteArray = (function (_super) {
        __extends(ByteArray, _super);
        function ByteArray(buffer) {
            var _this = _super.call(this, buffer) || this;
            _this.endian = egret.Endian.LITTLE_ENDIAN;
            return _this;
        }
        /**
         *
         * 读取指定长度的Buffer
         * @param {number} length       指定的长度
         * @returns {Buffer}
         */
        ByteArray.prototype.readBuffer = function (length) {
            if (!this.validate(length))
                return undefined;
            var start = this.position;
            this.position += length;
            return this.buffer.slice(start, this.position);
        };
        /**
         *
         * 读取指定长度的ByteArray
         * @param {number} length       指定的长度
         * @returns {ByteArray}
         */
        ByteArray.prototype.readByteArray = function (length) {
            return new ByteArray(this.readBuffer(length));
        };
        /**
         * 向字节流中写入64位的可变长度的整数(Protobuf)
         */
        ByteArray.prototype.writeVarint64 = function (value) {
            var high = value.high;
            var low = value.low;
            if (high == 0) {
                this.writeVarint(low);
            }
            else {
                for (var i = 0; i < 4; ++i) {
                    this.writeByte((low & 0x7F) | 0x80);
                    low >>>= 7;
                }
                if ((high & (0xFFFFFFF << 3)) == 0) {
                    this.writeByte((high << 4) | low);
                }
                else {
                    this.writeByte((((high << 4) | low) & 0x7F) | 0x80);
                    this.writeVarint(high >>> 3);
                }
            }
        };
        /**
         * 向字节流中写入32位的可变长度的整数(Protobuf)
         */
        ByteArray.prototype.writeVarint = function (value) {
            for (;;) {
                if (value < 0x80) {
                    this.writeByte(value);
                    return;
                }
                else {
                    this.writeByte((value & 0x7F) | 0x80);
                    value >>>= 7;
                }
            }
        };
        /**
         * 读取字节流中的32位变长整数(Protobuf)
         */
        ByteArray.prototype.readVarint = function () {
            var result = 0;
            for (var i = 0;; i += 7) {
                var b = this.readUnsignedByte();
                if (i < 32) {
                    if (b >= 0x80) {
                        result |= ((b & 0x7f) << i);
                    }
                    else {
                        result |= (b << i);
                        break;
                    }
                }
                else {
                    while (this.readUnsignedByte() >= 0x80) {
                    }
                    break;
                }
            }
            return result;
        };
        /**
         * 读取字节流中的32位变长整数(Protobuf)
         */
        ByteArray.prototype.readVarint64 = function () {
            var result = new core.Int64();
            var b;
            var i = 0;
            for (;; i += 7) {
                b = this.readUnsignedByte();
                if (i == 28) {
                    break;
                }
                else {
                    if (b >= 0x80) {
                        result.low |= ((b & 0x7f) << i);
                    }
                    else {
                        result.low |= (b << i);
                        return result;
                    }
                }
            }
            if (b >= 0x80) {
                b &= 0x7f;
                result.low |= (b << i);
                result.high = b >>> 4;
            }
            else {
                result.low |= (b << i);
                result.high = b >>> 4;
                return result;
            }
            for (i = 3;; i += 7) {
                b = this.readUnsignedByte();
                if (i < 32) {
                    if (b >= 0x80) {
                        result.high |= ((b & 0x7f) << i);
                    }
                    else {
                        result.high |= (b << i);
                        break;
                    }
                }
            }
            return result;
        };
        return ByteArray;
    }(egret.ByteArray));
    core.ByteArray = ByteArray;
    __reflect(ByteArray.prototype, "core.ByteArray");
})(core || (core = {}));
//# sourceMappingURL=ByteArray.js.map