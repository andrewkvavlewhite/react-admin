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
exports.DualListInputSkeleton = void 0;
var React = __importStar(require("react"));
var react_admin_1 = require("react-admin");
var classnames_1 = __importDefault(require("classnames"));
var styles_1 = require("@material-ui/core/styles");
exports.DualListInputSkeleton = function (_a) {
    var className = _a.className;
    var translate = react_admin_1.useTranslate();
    var classes = useStyles();
    var oneSecondHasPassed = react_admin_1.useTimeout(1000);
    if (oneSecondHasPassed) {
        return (React.createElement("div", { "aria-disabled": "true", "aria-label": translate('ra.message.loading'), className: classnames_1.default(className, classes.root) }));
    }
    return null;
};
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        backgroundColor: theme.palette.divider,
        borderStyle: 'none',
    },
}); }, {
    name: 'RaDualListInputSkeleton',
});
