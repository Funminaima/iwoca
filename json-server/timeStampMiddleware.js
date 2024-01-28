"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeStampMiddleware = void 0;
function timeStampMiddleware(req, res, next) {
    if (req.method !== "POST") {
        return next();
    }
    var created_date = new Date();
    var expiry_date = new Date();
    expiry_date.setDate(expiry_date.getDate() + 30);
    req.body.date_created = created_date;
    req.body.expiry_date = expiry_date;
    next();
}
exports.timeStampMiddleware = timeStampMiddleware;
