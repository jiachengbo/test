"use strict";var path=require("path"),errorHandler=require(path.resolve("./modules/core/server/controllers/errors.server.controller")),dbTools=require(path.resolve("./config/private/dbtools")),logger=require(path.resolve("./config/lib/logger")).getLogger_FileNameBase(__filename);exports.create=function(e,r){return dbTools.setParam(e.body.name,e.body.data).then(function(e){r.json(e)}).catch(function(e){return logger.error("sysParam create error:",e),r.status(422).send({message:errorHandler.getErrorMessage(e)})})},exports.read=function(e,r){var o=e.model?e.model:{};r.json(o)},exports.update=function(e,r){return dbTools.setParam(e.body.name,e.body.data).then(function(r){return e.query.name!==e.body.name?dbTools.delParam(e.query.name).then(function(){return r}):r}).then(function(e){r.json(e)}).catch(function(e){return r.status(422).send({message:errorHandler.getErrorMessage(e)})})},exports.delete=function(e,r){var o=e.model;return dbTools.delParam(o.name).then(function(){r.json(o)}).catch(function(e){return r.status(422).send({message:errorHandler.getErrorMessage(e)})})},exports.list=function(e,r){var o=dbTools.getAllParam(),t=[];for(var a in o){var n={name:a,data:o[a]};t.push(n)}return r.jsonp(t)},exports.sysParamByID=function(e,r,o,t){if(!dbTools.haveParam(t))return logger.error("No sysParam with that identifier has been found:"+t),r.status(404).send({message:"No sysParam with that identifier has been found:"+t});e.model={name:t,data:dbTools.getParam(t)},o()};