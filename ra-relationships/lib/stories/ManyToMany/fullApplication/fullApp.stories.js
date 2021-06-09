"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullApplication = void 0;
var react_1 = __importDefault(require("react"));
var react_admin_1 = require("react-admin");
var history_1 = require("history");
var dataprovider_1 = __importDefault(require("./dataprovider"));
var bands_1 = __importDefault(require("./bands"));
var venues_1 = __importDefault(require("./venues"));
var performances_1 = __importDefault(require("./performances"));
var artists_1 = __importDefault(require("./artists"));
exports.default = {
    title: 'ra-relationships/many-to-many',
};
exports.FullApplication = function () { return (react_1.default.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), dataProvider: dataprovider_1.default },
    react_1.default.createElement(react_admin_1.Resource, __assign({ name: "bands" }, bands_1.default)),
    react_1.default.createElement(react_admin_1.Resource, __assign({ name: "venues" }, venues_1.default)),
    react_1.default.createElement(react_admin_1.Resource, __assign({ name: "artists" }, artists_1.default)),
    react_1.default.createElement(react_admin_1.Resource, { name: "members" }),
    react_1.default.createElement(react_admin_1.Resource, __assign({ name: "performances" }, performances_1.default)))); };
