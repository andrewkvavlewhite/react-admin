"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_admin_1 = require("react-admin");
var core_1 = require("@material-ui/core");
var Cancel_1 = __importDefault(require("@material-ui/icons/Cancel"));
var CancelEditButton = function (_a) {
    var cancel = _a.cancel;
    var translate = react_admin_1.useTranslate();
    return (react_1.default.createElement(core_1.Tooltip, { title: translate('ra.action.cancel', {
            _: 'ra.action.cancel',
        }) },
        react_1.default.createElement(core_1.IconButton, { onClick: cancel, size: "small" },
            react_1.default.createElement(Cancel_1.default, null))));
};
exports.default = CancelEditButton;
