"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var VenueCreate_1 = __importDefault(require("./VenueCreate"));
var VenueEdit_1 = __importDefault(require("./VenueEdit"));
var VenueList_1 = __importDefault(require("./VenueList"));
exports.default = { list: VenueList_1.default, edit: VenueEdit_1.default, create: VenueCreate_1.default };
