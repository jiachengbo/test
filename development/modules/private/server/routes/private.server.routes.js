"use strict";var path=require("path"),router=require("express").Router(),prictrl=require(path.resolve("./modules/private/server/controllers/private.server.controller"));module.exports=function(r){router.route("/localstorage").post(prictrl.getLocalStorage),r.use("/api",router)};