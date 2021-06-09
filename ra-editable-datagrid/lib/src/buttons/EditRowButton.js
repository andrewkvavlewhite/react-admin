"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var core_1 = require("@material-ui/core");
var Create_1 = __importDefault(require("@material-ui/icons/Create"));
var react_admin_1 = require("react-admin");
var EditableRowContext_1 = __importDefault(require("../EditableRowContext"));
var EditRowButton = function () {
    var openEditMode = react_1.useContext(EditableRowContext_1.default);
    var translate = react_admin_1.useTranslate();
    return (react_1.default.createElement(core_1.Tooltip, { title: translate('ra.action.edit', { _: 'ra.action.edit' }) },
        react_1.default.createElement(core_1.IconButton, { onClick: openEditMode, size: "small", color: "primary", "aria-label": "edit" },
            react_1.default.createElement(Create_1.default, null))));
};
exports.default = EditRowButton;
