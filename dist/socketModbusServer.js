"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Net = require("net"); //import socket module
const fs = require("fs");
let configfilePath = './config.json';
class SocketModbusServer {
    //--------------------------------------------------------------------------------
    constructor() {
        this.socketModbusServer = null;
        this.socket = null;
        console.log("start socket server of socketModbusServer");
        this.startServer();
    }
    //-------------------------------------------------------------------------------    
    async startServer() {
        await this.readConfigFile();
        this.configureServer();
    }
    //----------------------------------------------------------------------------------
    readConfigFile() {
        return new Promise((resolve, reject) => {
            let configJsonFile = fs.readFileSync(configfilePath, 'utf8'); //read config.json file
            let configJson = JSON.parse(configJsonFile); //parse coonfig.json file
            this.scoketModbusServerPort = configJson.scoketModbusServerPort;
            this.scoketModbusServerIP = configJson.scoketModbusServerIP;
            resolve(true);
        });
    }
    //-----------------------------------------------------------------------------------
    configureServer() {
        this.socketModbusServer = Net.createServer(); //create server
        this.socketModbusServer.listen(this.scoketModbusServerPort, this.scoketModbusServerIP, () => {
            console.log('socketModbusServer started,ip:' + this.scoketModbusServerIP + ',port:' + this.scoketModbusServerPort);
        }); //liseten ip and port
        this.socketModbusServer.on('close', () => {
            console.log((new Date()).toLocaleString() + 'socketModbusServer  is now closed');
        });
    }
    //-------------------------------------------------------------------------------------
    sendMessage(cmd) {
        this.socket.write(JSON.stringify(cmd));
    }
}
exports.SocketModbusServer = SocketModbusServer;
//# sourceMappingURL=socketModbusServer.js.map