"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var styles_1 = require("@material-ui/core/styles");
var core_1 = require("@material-ui/core");
var useStyles = styles_1.makeStyles(function (theme) { return ({
    tip: {
        zIndex: 1000,
        position: 'fixed',
        bottom: 0,
        top: 'unset !important',
        left: 'unset !important',
        right: 0,
        width: 380,
        marginRight: 32,
        marginBottom: 10,
    },
    paper: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
    },
}); });
var CustomPopper = function (_a) {
    var children = _a.children;
    var classes = useStyles();
    return (react_1.default.createElement(core_1.Popper, { className: classes.tip, id: 'event-popper', open: true },
        react_1.default.createElement(core_1.Card, { className: classes.paper },
            react_1.default.createElement(core_1.CardContent, null,
                react_1.default.createElement(core_1.Typography, { gutterBottom: true, variant: "h5", component: "h2" }, "Simulate other users actions"),
                children))));
};
exports.default = CustomPopper;
