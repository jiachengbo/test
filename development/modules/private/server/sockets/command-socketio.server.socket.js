"use strict";function CommandSocketIo(){Command.apply(this,arguments)}var path=require("path"),Command=require(path.resolve("./modules/private/server/sockets/command.server.socket")),logger=require(path.resolve("./config/lib/logger")).getLogger_FileNameBase(__filename);CommandSocketIo.prototype=Object.create(Command.prototype),CommandSocketIo.prototype._buildMsg=function(e){return{id:e.id,attempttimes:e.attempttimes,lastsend_time:e.lastsend_time,msgsend:e.msgsend}},CommandSocketIo.prototype.sendCmd=function(e,t,o){logger.debug("socketio sendcmd:",e);var m=this._buildMsg(e);t?this.socket.emit(e.msgcode,m,o):(this.socket.emit(e.msgcode,m),o(null,null))},module.exports=CommandSocketIo;