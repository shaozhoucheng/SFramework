module shao {

    const enum PBType {
        DOUBLE = 1,
        FLOAT = 2,
        INT64 = 3,
        UINT64 = 4,
        INT32 = 5,
        FIXED64 = 6,
        FIXED32 = 7,
        BOOL = 8,
        STRING = 9,
        GROUP = 10,
        MESSAGE = 11,
        BYTES = 12,
        UINT32 = 13,
        ENUM = 14,
        SFIXED32 = 15,
        SFIXED64 = 16,
        SINT32 = 17,
        SINT64 = 18,
    }


    /**
    0 必有 属性名字
    1 必有 required optional repeated
    2 必有 数据类型
    3 可选 消息类型名称
    4 可选 默认值
    */
    declare type MessageStruct =
        [/**0 */string, /**1 */number,/**2 */number] |
        [/**属性名字 */string, /**选项 */number,/**数据类型 */number,/**如果是子消息，消息名称 */string] |
        [/**属性名字 */string, /**选项 */number,/**数据类型 */number,/**如果是子消息，消息名称 */string, /**默认值 */any]
	/**
	 *
	 * @author builder
	 * javascript 只会使用到 varint32->number string boolean
	 *
	 */
    export class PBMessageUtils {

        /**
     * 
     * 根据message名字得到的结构数据
     * @static
     * @type 
     */
        public static structByName: { /**消息名称*/[index: string]:
            {
                /**索引 */
                [index: number]:

                MessageStruct
            }
        } = {};

        /**
         * 
         * 根据message名字绑定的类名，用于读取消息时创建的对象
         * 如果没有注册，则直接使用{}创建对象
         * @static
         * @type {{ [index: string]: { new () } }}
         */
        public static ctorByName: { [index: string]: { new () } } = {};

        public static readFrom(msgType: string | number, bytes: ByteArray, len?: number): Object {
            let ctor = PBMessageUtils.ctorByName[msgType];
            let msg = ctor ? new ctor : {};
            len = len || 0;
            let afterLen = 0;
            if (len > 0) {
                afterLen = bytes.bytesAvailable - len;
            }
            let encode = PBMessageUtils.structByName[msgType];
            if (!encode) {
                ThrowError(`非法的通信类型[${msgType}]，堆栈信息:${new Error()}`);
                return;
            }
            //检查处理默认值
            for (let idx in encode) {
                let body = encode[idx];
                //0 key
                //1 required（可选） optional(必须要的) repeated（可以重复的）
                //2 数据类型
                //3 Message
                //4 默认值
                if (4 in body) {//有默认值
                    let key = body[0];
                    //消息中没有对应key的数据，先赋值成默认值，等待后续处理
                    if (!(key in msg)) {
                        msg[key] = body[4];
                    }
                }
            }
            while (bytes.bytesAvailable > afterLen) {
                let tag = bytes.readVarint();
                if (tag == 0)
                    continue;
                let idx = tag >>> 3;
                let body = encode[idx];
                if (!body) {
                    ThrowError(`读取消息类型为：${msgType}，索引${idx}时数据出现错误，找不到对应的数据结构配置`);
                    return;
                }
                let name = body[0];
                let label = body[1];
                let type = body[2];
                let subMsgType = body[3];
                let value: Object;
                switch (type) {
                    case PBType.DOUBLE:
                        value = bytes.readDouble();
                        break;
                    case PBType.FLOAT:
                        value = bytes.readFloat();
                        break;
                    case PBType.INT64:
                    case PBType.UINT64:
                    case PBType.SINT64:
                        value = bytes.readVarint64().toNumber();//理论上项目不使用
                        break;
                    case PBType.INT32:
                    case PBType.SINT32:
                        value = bytes.readVarint();
                        break;
                    case PBType.UINT32:
                    case PBType.ENUM:
                        value = bytes.readVarint();
                        break;
                    case PBType.FIXED64:
                    case PBType.SFIXED64:
                        value = PBMessageUtils.readFix64(bytes).toNumber();//理论上项目不使用
                        break;
                    case PBType.FIXED32:
                        value = bytes.readUnsignedInt();
                        break;
                    case PBType.BOOL:
                        value = PBMessageUtils.readBoolean(bytes);
                        break;
                    case PBType.STRING:
                        value = PBMessageUtils.readString(bytes);
                        break;
                    case PBType.GROUP://(protobuf 已弃用)
                        value = undefined;
                        ThrowError(`读取消息类型为：${msgType}，索引${idx}时数据出现已弃用的GROUP分组类型(${PBType.GROUP})`);
                        break;
                    case PBType.MESSAGE://消息
                        value = PBMessageUtils.readMessage(bytes, subMsgType);
                        break;
                    case PBType.BYTES:
                        value = PBMessageUtils.readBytes(bytes);
                        break;
                    case PBType.SFIXED32:
                        value = bytes.readInt();
                        break;
                    default:
                        value = PBMessageUtils.readValue(tag, bytes);
                }
                if (label == 3) {//repeated
                    let arr = msg[name];
                    if (!arr) msg[name] = arr = [];
                    arr.push(value);
                }
                else {
                    msg[name] = value;
                }
            }
            return msg;
        }

        private static readValue(tag: number, bytes: ByteArray): any {
            let wireType: number = tag & 7;
            let value: any;
            switch (wireType) {
                case 0: //Varint	int32, int64, uint32, uint64, sint32, sint64, bool, enum
                    value = bytes.readVarint();
                    break;
                case 2: //Length-delimi	string, bytes, embedded messages, packed repeated fields
                    value = PBMessageUtils.readString(bytes);
                    break;
                case 5: //32-bit	fixed32, sfixed32, float
                    value = bytes.readInt();
                    break;
                case 1: //64-bit	fixed64, sfixed64, double
                    value = bytes.readDouble();
                    break;
                //case 3://Start group	Groups (deprecated)
                //break;
                //case 4://End group	Groups (deprecated)
                //break;
                default:
                    ThrowError("protobuf的wireType未知");
            }
            return value;
        }


        private static readFix64(bytes: ByteArray) {
            let v: Int64 = new Int64;
            v.low = bytes.readUnsignedInt();
            v.high = bytes.readUnsignedInt();
            return v;
        }


        private static readBoolean(bytes: ByteArray): Object {
            return bytes.readVarint() > 0;
        }

        private static readString(bytes: ByteArray): Object {
            let blen: number = bytes.readVarint();
            if (blen > 0) {
                return bytes.readUTFBytes(blen);
            }
            return "";
        }


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
        private static readMessage(bytes: ByteArray, msgType: string): Object {
            let blen: number = bytes.readVarint();
            if (blen > 0) return PBMessageUtils.readFrom(msgType, bytes, blen);
        }

        private static readBytes(bytes: ByteArray): Object {
            let blen: number = bytes.readVarint();
            return bytes.readByteArray(blen);
        }

        public static writeTo(msg: Object, msgType: string, bytes?: ByteArray): ByteArray {
            if (msg == undefined) {
                return new ByteArray;
            }
            let messageEncode = PBMessageUtils.structByName[msgType];// msg.mMessageEncode;
            if (!messageEncode) {
                ThrowError(`非法的通信类型[${msgType}]，堆栈信息:${new Error()}`);
                return;
            }
            if (!bytes) {
                bytes = new ByteArray;
            }
            // bytes.endian = LITTLE_ENDIAN;
            for (let numberStr in messageEncode) {
                let num = +numberStr;
                let body = messageEncode[num];
                let label = body[1];
                let name = body[0];
                if (label == 1 && !(name in msg)) {
                    continue;
                }
                let value: Object = msg[name];
                if (value == undefined || value === body[4]/* 默认值 */) {
                    continue;
                }
                let type = body[2];
                let subMsgType = body[3];
                let wireType = PBMessageUtils.type2WireType(type);
                let tag = (num << 3) | wireType;
                if (label == 3) {
                    for (let key in value) {
                        let element = value[key];
                        PBMessageUtils.writeElementTo(element, type, tag, bytes, subMsgType);
                    }
                }
                else {
                    PBMessageUtils.writeElementTo(value, type, tag, bytes, subMsgType);
                }
            }
            return bytes;
        }

        public static writeElementTo(value: any, type: number, tag: number, bytes: ByteArray, subMsgType?: string): void {
            bytes.writeVarint(tag);
            switch (type) {
                case PBType.FIXED32:
                    bytes.writeUnsignedInt(value as number);
                    break;
                case PBType.SFIXED32:
                    bytes.writeInt(value as number);
                    break;
                case PBType.FLOAT:
                    bytes.writeFloat(value as number);
                    break;
                case PBType.DOUBLE:
                    bytes.writeDouble(value as number);
                    break;
                case PBType.FIXED64:
                case PBType.SFIXED64:
                    let v = new Int64();
                    v.fromNumber(value as number);
                    bytes.writeUnsignedInt(v.low);
                    bytes.writeUnsignedInt(v.high);

                    // bytes.writeVarint64(value as Int64);
                    break;
                case PBType.INT32://int32处理负数，没有按规定的 10字节数据进行处理，直接使用SINT32处理
                //  Signed Integers
                // As you saw in the previous section, all the protocol buffer types associated with wire type 0 are encoded as varints. However, there is an important difference between the signed int types (sint32 and sint64) and the "standard" int types (int32 and int64) when it comes to encoding negative numbers. If you use int32 or int64 as the type for a negative number, the resulting varint is always ten bytes long – it is, effectively, treated like a very large unsigned integer. If you use one of the signed types, the resulting varint uses ZigZag encoding, which is much more efficient.
                case PBType.SINT32:
                    bytes.writeVarint(value as number);
                    break;
                case PBType.ENUM:
                case PBType.UINT32:
                    bytes.writeVarint(value as number);
                    break;
                case PBType.INT64:
                case PBType.SINT64:
                case PBType.UINT64:
                    {
                        let v = new Int64();
                        v = v.fromNumber(value as number)
                        bytes.writeVarint64(v);

                        // bytes.writeVarint64(value as Int64);

                        break;
                    }
                case PBType.BOOL:
                    bytes.writeVarint(value ? 1 : 0);
                    break;
                case PBType.STRING:
                case PBType.BYTES:
                case PBType.MESSAGE:
                    if (type == PBType.MESSAGE) {
                        var temp: ByteArray = PBMessageUtils.writeTo(value, subMsgType);
                    }
                    else if (type == PBType.BYTES) {
                        temp = value as ByteArray;
                    }
                    else {
                        temp = new ByteArray;
                        temp.writeUTFBytes(value as string);
                    }
                    length = temp ? temp.length : 0;
                    bytes.writeVarint(length);
                    if (length > 0) {
                        bytes.writeBytes(temp, 0, length);
                    }
                    break;
            }
        }


        public static type2WireType(type: number): number {
            switch (type) {
                case PBType.FIXED32:
                case PBType.SFIXED32:
                case PBType.FLOAT:
                    return 5;
                case PBType.DOUBLE:
                case PBType.FIXED64:
                case PBType.SFIXED64:
                    return 1;
                case PBType.INT32:
                case PBType.SINT32:
                case PBType.ENUM:
                case PBType.UINT32:
                case PBType.INT64:
                case PBType.SINT64:
                case PBType.UINT64:
                case PBType.BOOL:
                    return 0;
                case PBType.STRING:
                case PBType.MESSAGE:
                case PBType.BYTES:
                    return 2;
            }
            return -1;
        }


        public static zigzag32(n: number) {
            return (n << 1) ^ (n >> 31);
        }

        public static decodeZigzag32(n: number) {
            return n >> 1 ^ (((n & 1) << 31) >> 31);
        }

    }
}