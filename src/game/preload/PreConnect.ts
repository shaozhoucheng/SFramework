module shao.game {
	export class PreConnect {
		public constructor() {
			this.initWEB();
		}

		public initWEB()
		{
			let webServer = new shao.WSNetService;
			let param = egret["server"];
			// egret["server"] = {
			// 	ip:server.extrenalIP,
			// 	port:server.tcpPort
			// }
			let wsUrl = "ws://{0}:{1}/websocket".substitute(param.ip, param.port);
			// alert(wsUrl);
			webServer.setUrl(wsUrl);
			webServer.connect();

			//szc 屏蔽
			// Core.socket = webServer;
		}
	}
}