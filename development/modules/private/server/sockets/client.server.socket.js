"use strict";function SocketsCtrl(){EventEmitter.call(this)}var path=require("path"),EventEmitter=require("events"),sequelize=require(path.resolve("./config/lib/sequelize")),connSocket=require(path.resolve("./config/private/socket.io")).getConnSocket(),logger=require(path.resolve("./config/lib/logger")).getLogger("def.socketio.client");SocketsCtrl.prototype=Object.create(EventEmitter.prototype);var socketsCtrl=new SocketsCtrl;module.exports=socketsCtrl,connSocket&&(connSocket.on("error",function(e){logger.error("connSocket error:",e)}),connSocket.on("disconnect",function(){logger.info("connSocket disconnect")}),connSocket.on("connect",function(){logger.info("connSocket id %s connected %s",connSocket.id,connSocket.connected)}));