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
exports.RemoveSavedQueryIconButton = void 0;
var React = __importStar(require("react"));
var react_1 = require("react");
var core_1 = require("@material-ui/core");
var react_admin_1 = require("react-admin");
var RemoveCircleOutline_1 = __importDefault(require("@material-ui/icons/RemoveCircleOutline"));
var RemoveSavedQueryDialog_1 = require("./RemoveSavedQueryDialog");
exports.RemoveSavedQueryIconButton = function (props) {
    var _a = react_1.useState(false), confirmationOpen = _a[0], setConfirmationOpen = _a[1];
    var handleConfirmationClose = function () {
        setConfirmationOpen(false);
    };
    var handleRemoveQueryClick = function () {
        setConfirmationOpen(true);
    };
    var translate = react_admin_1.useTranslate();
    return (React.createElement(React.Fragment, null,
        React.createElement(core_1.IconButton, __assign({ "aria-label": translate('ra-preferences.saved_queries.remove_label', {
                _: 'Remove saved query',
            }), size: "small", onClick: handleRemoveQueryClick }, props),
            React.createElement(RemoveCircleOutline_1.default, null)),
        React.createElement(RemoveSavedQueryDialog_1.RemoveSavedQueryDialog, { open: confirmationOpen, onClose: handleConfirmationClose })));
};
