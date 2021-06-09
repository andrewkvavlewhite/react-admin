"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_admin_1 = require("react-admin");
var core_1 = require("@material-ui/core");
var Save_1 = __importDefault(require("@material-ui/icons/Save"));
var SaveRowButton = function (_a) {
    var dirty = _a.dirty, handleSubmit = _a.handleSubmit, invalid = _a.invalid, quitEditMode = _a.quitEditMode, saving = _a.saving, undoable = _a.undoable;
    var translate = react_admin_1.useTranslate();
    var onClick = function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        if (dirty && invalid) {
            return;
        }
        handleSubmit();
        if (undoable) {
            quitEditMode();
        }
    };
    return (react_1.default.createElement(core_1.Tooltip, { title: translate('ra.action.save', {
            _: 'ra.action.save',
        }) },
        react_1.default.createElement(core_1.IconButton, { disabled: saving, onClick: onClick, size: "small", color: "primary" },
            react_1.default.createElement(Save_1.default, null))));
};
exports.default = SaveRowButton;
