"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var papaparse_1 = __importDefault(require("papaparse"));
exports["default"] = (function (text) {
    console.time('parse txt');
    var parsed = papaparse_1["default"].parse(text, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true
    });
    console.timeEnd('parse txt');
    return parsed;
});
