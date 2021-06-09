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
var react_1 = __importDefault(require("react"));
var core_1 = require("@material-ui/core");
var Add_1 = __importDefault(require("@material-ui/icons/Add"));
var react_admin_1 = require("react-admin");
var CreateButton = function (props) {
    var translate = react_admin_1.useTranslate();
    return (react_1.default.createElement(core_1.Tooltip, { title: translate('ra.action.create', { _: 'ra.action.create' }) },
        react_1.default.createElement(core_1.IconButton, __assign({ size: "small", color: "primary", "aria-label": "create" }, props),
            react_1.default.createElement(Add_1.default, null),
            props.children)));
};
exports.default = CreateButton;
