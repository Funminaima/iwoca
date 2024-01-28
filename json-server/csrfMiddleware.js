"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.csrfMiddleware = void 0;
var config_js_1 = require("./config.js");
function csrfMiddleware(req, res, next) {
    if (req.method !== "POST") {
        return next();
    }
    var client_xcsrf_token = req.headers["x-csrftoken"];
    if (client_xcsrf_token === undefined) {
        return res.status(403).send(JSON.stringify({
            error: "Permission Denied: X-CSRF token required",
            detail: 'Retrieve your X-CSRF token from "/api/auth/xcsrftoken/" and set it as a "x-csrftoken" header',
        }));
    }
    if (client_xcsrf_token !== config_js_1.SERVER_XCSRF_TOKEN) {
        return res.status(403).send(JSON.stringify({
            error: "Permission Denied: X-CSRF token incorrect",
            detail: "Make sure you are sending the correct token",
        }));
    }
    next();
}
exports.csrfMiddleware = csrfMiddleware;
