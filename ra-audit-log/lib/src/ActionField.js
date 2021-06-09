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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionField = void 0;
var React = __importStar(require("react"));
var core_1 = require("@material-ui/core");
var react_admin_1 = require("react-admin");
var useEventLabel_1 = require("./useEventLabel");
/**
 * A react-admin field which displays a label specific to an event action.
 */
exports.ActionField = function (props) {
    var record = react_admin_1.useRecordContext(props);
    var actionLabel = useEventLabel_1.useEventLabel({ record: record, variant: 'inline' });
    if (!record) {
        return null;
    }
    return (React.createElement(core_1.Typography, __assign({ component: "span", variant: "body2" }, react_admin_1.sanitizeFieldRestProps(props)), actionLabel));
};
exports.ActionField.defaultProps = {
    addLabel: true,
};
