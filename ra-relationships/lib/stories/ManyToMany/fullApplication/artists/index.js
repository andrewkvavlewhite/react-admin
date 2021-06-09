"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ArtistList_1 = __importDefault(require("./ArtistList"));
var ArtistEdit_1 = __importDefault(require("./ArtistEdit"));
var ArtistCreate_1 = __importDefault(require("./ArtistCreate"));
exports.default = { list: ArtistList_1.default, edit: ArtistEdit_1.default, create: ArtistCreate_1.default };
