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
exports.ResourceField = void 0;
var React = __importStar(require("react"));
var react_admin_1 = require("react-admin");
var get_1 = __importDefault(require("lodash/get"));
var core_1 = require("@material-ui/core");
var useGetResourceLabel_1 = require("./useGetResourceLabel");
/**
 * A react-admin field which displays a the name of the resource targeted by an event.
 */
exports.ResourceField = function (props) {
    var record = react_admin_1.useRecordContext(props);
    var getResourceLabel = useGetResourceLabel_1.useGetResourceLabel();
    if (!record) {
        return null;
    }
    var _a = props.source, source = _a === void 0 ? 'resource' : _a;
    var resource = get_1.default(record, source);
    return (React.createElement(core_1.Typography, __assign({ component: "span", variant: "body2" }, react_admin_1.sanitizeFieldRestProps(props)), getResourceLabel(resource, 1)));
};
exports.ResourceField.defaultProps = {
    addLabel: true,
};
