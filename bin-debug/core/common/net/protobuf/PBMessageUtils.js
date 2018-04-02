var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    /**
     *
     * @author builder
     * javascript 只会使用到 varint32->number string boolean
     *
     */
    var PBMessageUtils = (function () {
        function PBMessageUtils() {
        }
        PBMessageUtils.readFrom = function (msgType, bytes, len) {
            var ctor = PBMessageUtils.ctorByName[msgType];
            var msg = ctor ? new ctor : {};
            len = len || 0;
            var afterLen = 0;
            if (len > 0) {
                afterLen = bytes.bytesAvailable - len;
            }
            var encode = PBMessageUtils.structByName[msgType];
            if (!encode) {
                core.ThrowError("\u975E\u6CD5\u7684\u901A\u4FE1\u7C7B\u578B[" + msgType + "]\uFF0C\u5806\u6808\u4FE1\u606F:" + new Error());
                return;
            }
            //检查处理默认值
            for (var idx in encode) {
                var body = encode[idx];
                //0 key
                //1 required（可选） optional(必须要的) repeated（可以重复的）
                //2 数据类型
                //3 Message
                //4 默认值
                if (4 in body) {
                    var key = body[0];
                    //消息中没有对应key的数据，先赋值成默认值，等待后续处理
                    if (!(key in msg)) {
                        msg[key] = body[4];
                    }
                }
            }
            while (bytes.bytesAvailable > afterLen) {
                var tag = bytes.readVarint();
                if (tag == 0)
                    continue;
                var idx = tag >>> 3;
                var body = encode[idx];
                if (!body) {
                    core.ThrowError("\u8BFB\u53D6\u6D88\u606F\u7C7B\u578B\u4E3A\uFF1A" + msgType + "\uFF0C\u7D22\u5F15" + idx + "\u65F6\u6570\u636E\u51FA\u73B0\u9519\u8BEF\uFF0C\u627E\u4E0D\u5230\u5BF9\u5E94\u7684\u6570\u636E\u7ED3\u6784\u914D\u7F6E");
                    return;
                }
                var name_1 = body[0];
                var label = body[1];
                var type = body[2];
                var subMsgType = body[3];
                var value = void 0;
                switch (type) {
                    case 1 /* DOUBLE */:
                        value = bytes.readDouble();
                        break;
                    case 2 /* FLOAT */:
                        value = bytes.readFloat();
                        break;
                    case 3 /* INT64 */:
                    case 4 /* UINT64 */:
                    case 18 /* SINT64 */:
                        value = bytes.readVarint64().toNumber(); //理论上项目不使用
                        break;
                    case 5 /* INT32 */:
                    case 17 /* SINT32 */:
                        value = bytes.readVarint();
                        break;
                    case 13 /* UINT32 */:
                    case 14 /* ENUM */:
                        value = bytes.readVarint();
                        break;
                    case 6 /* FIXED64 */:
                    case 16 /* SFIXED64 */:
                        value = PBMessageUtils.readFix64(bytes).toNumber(); //理论上项目不使用
                        break;
                    case 7 /* FIXED32 */:
                        value = bytes.readUnsignedInt();
                        break;
                    case 8 /* BOOL */:
                        value = PBMessageUtils.readBoolean(bytes);
                        break;
                    case 9 /* STRING */:
                        value = PBMessageUtils.readString(bytes);
                        break;
                    case 10 /* GROUP */://(protobuf 已弃用)
                        value = undefined;
                        core.ThrowError("\u8BFB\u53D6\u6D88\u606F\u7C7B\u578B\u4E3A\uFF1A" + msgType + "\uFF0C\u7D22\u5F15" + idx + "\u65F6\u6570\u636E\u51FA\u73B0\u5DF2\u5F03\u7528\u7684GROUP\u5206\u7EC4\u7C7B\u578B(" + 10 /* GROUP */ + ")");
                        break;
                    case 11 /* MESSAGE */://消息
                        value = PBMessageUtils.readMessage(bytes, subMsgType);
                        break;
                    case 12 /* BYTES */:
                        value = PBMessageUtils.readBytes(bytes);
                        break;
                    case 15 /* SFIXED32 */:
                        value = bytes.readInt();
                        break;
                    default:
                        value = PBMessageUtils.readValue(tag, bytes);
                }
                if (label == 3) {
                    var arr = msg[name_1];
                    if (!arr)
                        msg[name_1] = arr = [];
                    arr.push(value);
                }
                else {
                    msg[name_1] = value;
                }
            }
            return msg;
        };
        PBMessageUtils.readValue = function (tag, bytes) {
            var wireType = tag & 7;
            var value;
            switch (wireType) {
                case 0://Varint	int32, int64, uint32, uint64, sint32, sint64, bool, enum
                    value = bytes.readVarint();
                    break;
                case 2://Length-delimi	string, bytes, embedded messages, packed repeated fields
                    value = PBMessageUtils.readString(bytes);
                    break;
                case 5://32-bit	fixed32, sfixed32, float
                    value = bytes.readInt();
                    break;
                case 1://64-bit	fixed64, sfixed64, double
                    value = bytes.readDouble();
                    break;
                //case 3://Start group	Groups (deprecated)
                //break;
                //case 4://End group	Groups (deprecated)
                //break;
                default:
                    core.ThrowError("protobuf的wireType未知");
            }
            return value;
        };
        PBMessageUtils.readFix64 = function (bytes) {
            var v = new core.Int64;
            v.low = bytes.readUnsignedInt();
            v.high = bytes.readUnsignedInt();
            return v;
        };
        PBMessageUtils.readBoolean = function (bytes) {
            return bytes.readVarint() > 0;
        };
        PBMessageUtils.readString = function (bytes) {
            var blen = bytes.readVarint();
            if (blen > 0) {
                return bytes.readUTFBytes(blen);
            }
            return "";
        };
        /**
         *
         * 读取消息
         * @private
         * @static
         * @param {number} tag          标签
         * @param {ByteArray} bytes     被处理的字节数组
         * @param {string} subMsgType   类型标识
         * @returns {Object}
         */
        PBMessageUtils.readMessage = function (bytes, msgType) {
            var blen = bytes.readVarint();
            if (blen > 0)
                return PBMessageUtils.readFrom(msgType, bytes, blen);
        };
        PBMessageUtils.readBytes = function (bytes) {
            var blen = bytes.readVarint();
            return bytes.readByteArray(blen);
        };
        PBMessageUtils.writeTo = function (msg, msgType, bytes) {
            if (msg == undefined) {
                return new core.ByteArray;
            }
            var messageEncode = PBMessageUtils.structByName[msgType]; // msg.mMessageEncode;
            if (!messageEncode) {
                core.ThrowError("\u975E\u6CD5\u7684\u901A\u4FE1\u7C7B\u578B[" + msgType + "]\uFF0C\u5806\u6808\u4FE1\u606F:" + new Error());
                return;
            }
            if (!bytes) {
                bytes = new core.ByteArray;
            }
            // bytes.endian = LITTLE_ENDIAN;
            for (var numberStr in messageEncode) {
                var num = +numberStr;
                var body = messageEncode[num];
                var label = body[1];
                var name_2 = body[0];
                if (label == 1 && !(name_2 in msg)) {
                    continue;
                }
                var value = msg[name_2];
                if (value == undefined || value === body[4] /* 默认值 */) {
                    continue;
                }
                var type = body[2];
                var subMsgType = body[3];
                var wireType = PBMessageUtils.type2WireType(type);
                var tag = (num << 3) | wireType;
                if (label == 3) {
                    for (var key in value) {
                        var element = value[key];
                        PBMessageUtils.writeElementTo(element, type, tag, bytes, subMsgType);
                    }
                }
                else {
                    PBMessageUtils.writeElementTo(value, type, tag, bytes, subMsgType);
                }
            }
            return bytes;
        };
        PBMessageUtils.writeElementTo = function (value, type, tag, bytes, subMsgType) {
            bytes.writeVarint(tag);
            switch (type) {
                case 7 /* FIXED32 */:
                    bytes.writeUnsignedInt(value);
                    break;
                case 15 /* SFIXED32 */:
                    bytes.writeInt(value);
                    break;
                case 2 /* FLOAT */:
                    bytes.writeFloat(value);
                    break;
                case 1 /* DOUBLE */:
                    bytes.writeDouble(value);
                    break;
                case 6 /* FIXED64 */:
                case 16 /* SFIXED64 */:
                    var v = new core.Int64();
                    v.fromNumber(value);
                    bytes.writeUnsignedInt(v.low);
                    bytes.writeUnsignedInt(v.high);
                    // bytes.writeVarint64(value as Int64);
                    break;
                case 5 /* INT32 */: //int32处理负数，没有按规定的 10字节数据进行处理，直接使用SINT32处理
                //  Signed Integers
                // As you saw in the previous section, all the protocol buffer types associated with wire type 0 are encoded as varints. However, there is an important difference between the signed int types (sint32 and sint64) and the "standard" int types (int32 and int64) when it comes to encoding negative numbers. If you use int32 or int64 as the type for a negative number, the resulting varint is always ten bytes long – it is, effectively, treated like a very large unsigned integer. If you use one of the signed types, the resulting varint uses ZigZag encoding, which is much more efficient.
                case 17 /* SINT32 */:
                    bytes.writeVarint(value);
                    break;
                case 14 /* ENUM */:
                case 13 /* UINT32 */:
                    bytes.writeVarint(value);
                    break;
                case 3 /* INT64 */:
                case 18 /* SINT64 */:
                case 4 /* UINT64 */:
                    {
                        var v_1 = new core.Int64();
                        v_1 = v_1.fromNumber(value);
                        bytes.writeVarint64(v_1);
                        // bytes.writeVarint64(value as Int64);
                        break;
                    }
                case 8 /* BOOL */:
                    bytes.writeVarint(value ? 1 : 0);
                    break;
                case 9 /* STRING */:
                case 12 /* BYTES */:
                case 11 /* MESSAGE */:
                    if (type == 11 /* MESSAGE */) {
                        var temp = PBMessageUtils.writeTo(value, subMsgType);
                    }
                    else if (type == 12 /* BYTES */) {
                        temp = value;
                    }
                    else {
                        temp = new core.ByteArray;
                        temp.writeUTFBytes(value);
                    }
                    length = temp ? temp.length : 0;
                    bytes.writeVarint(length);
                    if (length > 0) {
                        bytes.writeBytes(temp, 0, length);
                    }
                    break;
            }
        };
        PBMessageUtils.type2WireType = function (type) {
            switch (type) {
                case 7 /* FIXED32 */:
                case 15 /* SFIXED32 */:
                case 2 /* FLOAT */:
                    return 5;
                case 1 /* DOUBLE */:
                case 6 /* FIXED64 */:
                case 16 /* SFIXED64 */:
                    return 1;
                case 5 /* INT32 */:
                case 17 /* SINT32 */:
                case 14 /* ENUM */:
                case 13 /* UINT32 */:
                case 3 /* INT64 */:
                case 18 /* SINT64 */:
                case 4 /* UINT64 */:
                case 8 /* BOOL */:
                    return 0;
                case 9 /* STRING */:
                case 11 /* MESSAGE */:
                case 12 /* BYTES */:
                    return 2;
            }
            return -1;
        };
        PBMessageUtils.zigzag32 = function (n) {
            return (n << 1) ^ (n >> 31);
        };
        PBMessageUtils.decodeZigzag32 = function (n) {
            return n >> 1 ^ (((n & 1) << 31) >> 31);
        };
        /**
     *
     * 根据message名字得到的结构数据
     * @static
     * @type
     */
        PBMessageUtils.structByName = {};
        /**
         *
         * 根据message名字绑定的类名，用于读取消息时创建的对象
         * 如果没有注册，则直接使用{}创建对象
         * @static
         * @type {{ [index: string]: { new () } }}
         */
        PBMessageUtils.ctorByName = {};
        return PBMessageUtils;
    }());
    core.PBMessageUtils = PBMessageUtils;
    __reflect(PBMessageUtils.prototype, "core.PBMessageUtils");
})(core || (core = {}));
//# sourceMappingURL=PBMessageUtils.js.map