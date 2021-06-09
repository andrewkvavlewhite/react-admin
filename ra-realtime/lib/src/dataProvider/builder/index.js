"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRealTimeMethodsInLocalBrowser = exports.addRealTimeMethodsBasedOnMercure = exports.addRealTimeMethodsBasedOnApiPlatform = exports.addLocksMethodsBasedOnALockResource = void 0;
// Locks
var addLocksMethodsBasedOnALockResource_1 = __importDefault(require("./addLocksMethodsBasedOnALockResource"));
exports.addLocksMethodsBasedOnALockResource = addLocksMethodsBasedOnALockResource_1.default;
// Real-Time
var addRealTimeMethodsBasedOnApiPlatform_1 = __importDefault(require("./addRealTimeMethodsBasedOnApiPlatform"));
exports.addRealTimeMethodsBasedOnApiPlatform = addRealTimeMethodsBasedOnApiPlatform_1.default;
var addRealTimeMethodsBasedOnMercure_1 = __importDefault(require("./addRealTimeMethodsBasedOnMercure"));
exports.addRealTimeMethodsBasedOnMercure = addRealTimeMethodsBasedOnMercure_1.default;
var addRealTimeMethodsInLocalBrowser_1 = __importDefault(require("./addRealTimeMethodsInLocalBrowser"));
exports.addRealTimeMethodsInLocalBrowser = addRealTimeMethodsInLocalBrowser_1.default;
