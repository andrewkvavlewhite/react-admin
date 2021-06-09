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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_admin_1 = require("react-admin");
var core_1 = require("@material-ui/core");
var Add_1 = __importDefault(require("@material-ui/icons/Add"));
var CreateResourceButton = function (_a) {
    var resource = _a.resource, props = __rest(_a, ["resource"]);
    var translate = react_admin_1.useTranslate();
    var getResourceLabel = react_admin_1.useGetResourceLabel();
    var singularResourceName = getResourceLabel(resource, 1);
    var label = translate('ra.page.create', { name: singularResourceName });
    return (react_1.default.createElement(core_1.Tooltip, { title: label },
        react_1.default.createElement(core_1.Button, __assign({ size: "small", color: "primary", "aria-label": label }, props),
            react_1.default.createElement(Add_1.default, null),
            label)));
};
exports.default = CreateResourceButton;
