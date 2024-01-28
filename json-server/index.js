"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var json_server_1 = require("json-server");
var db_1 = require("./db");
var csrfMiddleware_1 = require("./csrfMiddleware");
var contentTypeMiddleware_1 = require("./contentTypeMiddleware");
var timeStampMiddleware_1 = require("./timeStampMiddleware");
var config_1 = require("./config");
var create = json_server_1.default.create, _router = json_server_1.default.router, defaults = json_server_1.default.defaults, bodyParser = json_server_1.default.bodyParser;
var server = create();
var router = _router((0, db_1.createDb)());
var jsonServerMiddlewares = defaults();
var DELAY = 500;
var API_BASE = "/api";
var PORT = 3001;
server.use(jsonServerMiddlewares);
server.use(csrfMiddleware_1.csrfMiddleware);
server.use(contentTypeMiddleware_1.contentTypeMiddleware);
server.use(function (req, res, next) {
    setTimeout(next, DELAY);
});
server.use(bodyParser);
server.use(timeStampMiddleware_1.timeStampMiddleware);
server.get("".concat(API_BASE, "/auth/xcsrftoken"), function (req, res) {
    res.status(200).send(JSON.stringify({ xcsrftoken: config_1.SERVER_XCSRF_TOKEN }));
});
server.use(API_BASE, router);
server.listen(PORT, function () {
    console.log("JSON Server is running");
});
