module shao.game {
     /**~ = -(X+1) */
    export function $appendPNG(uri: string): string {
        if (!uri) return "";
        if (!~uri.indexOf(".")) {
            uri += Extension.PNG;
        }
        return uri;
    }

    /**~ = -(X+1) */
    export function $appendJPG(uri: string): string {
        if (!~uri.indexOf(".")) {
            uri += Extension.JPG;
        }
        return uri;
    }
}