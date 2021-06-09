"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ra_data_fakerest_1 = __importDefault(require("ra-data-fakerest"));
var data_1 = __importDefault(require("../data"));
exports.default = ra_data_fakerest_1.default(data_1.default, true);
