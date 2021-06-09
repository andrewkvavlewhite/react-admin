"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var BandList_1 = __importDefault(require("./BandList"));
var BandEdit_1 = __importDefault(require("./BandEdit"));
var BandCreate_1 = __importDefault(require("./BandCreate"));
exports.default = { list: BandList_1.default, edit: BandEdit_1.default, create: BandCreate_1.default };
