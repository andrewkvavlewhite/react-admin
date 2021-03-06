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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_1 = require("react");
var core_1 = require("@material-ui/core");
var NodeTitle = function (_a) {
    var data = _a.data, nodeActions = _a.nodeActions;
    var classes = useStyles();
    return (React.createElement("div", { className: classes.root },
        React.createElement(core_1.Typography, { variant: "body1" }, data.title),
        react_1.isValidElement(nodeActions) &&
            react_1.cloneElement(nodeActions, {
                className: classes.menuButton,
                data: data,
            })));
};
exports.default = NodeTitle;
var useStyles = core_1.makeStyles({
    root: {
        position: 'relative',
        '&:hover': {
            '& $menuButton': {
                opacity: 1,
            },
        },
    },
    menuButton: {
        opacity: 0,
    },
});
