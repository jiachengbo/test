"use strict";var acl=require("acl");acl=new acl(new acl.memoryBackend),exports.invokeRolesPolicies=function(){acl.allow([{roles:["admin"],allows:[{resources:"/",permissions:"*"},{resources:"/:sysparamId",permissions:"*"}]}])},exports.isAllowed=function(e,s,o){var r=e.user?e.user.roles:["guest"];acl.areAnyRolesAllowed(r,e.route.path,e.method.toLowerCase(),function(e,r){return e?s.status(500).send("Unexpected authorization error"):r?o():s.status(403).json({message:"User is not authorized"})})};