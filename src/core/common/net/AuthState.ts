module core {
        /**
         * 用户认证
         * @author builder
         *
         */
        export class AuthState {
                /**
                 * 认证成功
                 */
                public static AUTH_SUCCESS = 0;
                /**
                 * 票据验证失败，要求客户端重新登录
                 */
                public static AUTH_FAILED = 1;
        }
}
