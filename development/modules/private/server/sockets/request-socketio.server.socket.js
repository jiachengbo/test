"use strict";
function RequestSocketIo() {
  Request.apply(this, arguments)
}
var path = require("path"), fs = require("fs"),
  Request = require(path.resolve("./modules/private/server/sockets/request.server.socket")),
  logger = require(path.resolve("./config/lib/logger")).getLogger_FileNameBase(__filename);
RequestSocketIo.prototype = Object.create(Request.prototype), RequestSocketIo.prototype.listen = function (e) {
  this.socket.on(this.msgcode, e.bind(this))
}, RequestSocketIo.prototype.sendRespon = function (e, t, o, s) {
  this.options.respon && (s ? (t.lastsend_time = new Date, s(e, t.msgsend)) : logger.error("REQUEST %s need respon, but fn not valid", this.msgcode))
}, RequestSocketIo.prototype.stopListen = function () {
  this.socket.removeAllListeners([this.msgcode])
}, RequestSocketIo.prototype.updateReqPacket = function (e, t) {
  return t && "object" == typeof t ? "number" != typeof t.id ? "request col id not valid error" : (e.reqid = t.id.toString(), "string" != typeof t.lastsend_time ? "request col lastsend_time not valid error" : (e.first_time = new Date(t.lastsend_time), "number" != typeof t.attempttimes ? "request col attempttimes not valid error" : (e.attempttimes = t.attempttimes, e.msgrecv = t.msgsend, e.lastrecv_time = new Date, e))) : "request data not valid error"
}, module.exports = RequestSocketIo;
