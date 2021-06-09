"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSavedQueries = void 0;
var usePreferences_1 = __importDefault(require("../usePreferences"));
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
exports.useSavedQueries = function (resource) {
    return usePreferences_1.default(resource + "SavedQueries", []);
};
