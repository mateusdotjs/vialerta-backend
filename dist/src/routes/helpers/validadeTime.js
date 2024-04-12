"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTime = void 0;
function validateTime(time) {
    let date = new Date();
    switch (time) {
        case "30min":
            date.setMinutes(date.getMinutes() - 30);
            break;
        case "1h":
            date.setMinutes(date.getMinutes() - 60);
            break;
        case "24h":
            date.setDate(date.getDate() - 1);
            break;
        case "1w":
            date.setDate(date.getDate() - 7);
            break;
        case "1m":
            date.setHours(0, 0, 0, 0);
            date.setDate(1);
            break;
        default:
            return null;
    }
    return date.toISOString();
}
exports.validateTime = validateTime;
