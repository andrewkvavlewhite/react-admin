"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_admin_1 = require("react-admin");
var lab_1 = require("@material-ui/lab");
var Warning = function (_a) {
    var message = _a.message, refresh = _a.refresh, onRefresh = _a.onRefresh;
    var translate = react_admin_1.useTranslate();
    return (react_1.default.createElement(lab_1.Alert, { severity: "warning", action: refresh && react_1.default.createElement(react_admin_1.RefreshButton, { onClick: onRefresh }) },
        react_1.default.createElement(lab_1.AlertTitle, null, translate('ra-realtime.notification.title')),
        message));
};
exports.default = Warning;
