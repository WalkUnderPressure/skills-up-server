"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isObject_1 = __importDefault(require("../lib/isObject"));
const loggerMiddleware = (req, res, next) => {
    const tabSymbol = '\t';
    const doubleTabSymbol = '\t\t';
    const { method, url, headers, params, query, body } = req;
    const dataToPrint = { method, url, headers, params, query, body };
    const requestInfo = Object.entries(dataToPrint).map(([itemName, itemInfo]) => {
        let toPrint = JSON.stringify(itemInfo);
        if ((0, isObject_1.default)(itemInfo)) {
            toPrint = toPrint
                .split('","')
                .join(`\n${doubleTabSymbol}`)
                .replace(/{/gi, `\n${doubleTabSymbol}`)
                .replace(/}/gi, '');
        }
        return `${tabSymbol}${itemName}${tabSymbol}=> ${toPrint.replace(/"/gi, '')}`;
    }).join('\n');
    console.info(">>> Request info:\n", requestInfo);
    next();
};
exports.default = loggerMiddleware;
