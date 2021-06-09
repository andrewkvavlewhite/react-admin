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
exports.TimelineSkeleton = void 0;
var React = __importStar(require("react"));
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var react_admin_1 = require("react-admin");
var TimelinePlaceholder_1 = require("./TimelinePlaceholder");
var EventAvatar_1 = require("../EventAvatar");
exports.TimelineSkeleton = function (props) {
    var classes = useStyles(props);
    var translate = react_admin_1.useTranslate();
    return (React.createElement("div", { className: classes.root, "aria-disabled": true, "aria-label": translate('ra.message.loading') },
        React.createElement("div", null, times(2, function (key1) { return (React.createElement("div", { key: key1 },
            React.createElement(TimelinePlaceholder_1.TimelinePlaceholder, { className: classes.subTitle }),
            React.createElement(core_1.Card, { className: classes.card },
                React.createElement(core_1.List, null, times(5, function (key2) { return (React.createElement(core_1.ListItem, { key: key2 },
                    React.createElement(core_1.ListItemAvatar, null,
                        React.createElement(EventAvatar_1.EventAvatar, null)),
                    React.createElement(core_1.ListItemText, { primary: React.createElement(TimelinePlaceholder_1.TimelinePlaceholder, null), secondary: React.createElement(TimelinePlaceholder_1.TimelinePlaceholder, null) }))); }))))); }))));
};
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        width: 600,
        margin: 'auto',
    },
    card: {
        marginTop: theme.spacing(0.5),
        marginBottom: theme.spacing(1),
    },
    subTitle: {
        width: '60%',
        paddingBottom: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}); }, {
    name: 'RaTimelineSkeleton',
});
var times = function (nbChildren, fn) { return Array.from({ length: nbChildren }, function (_, key) { return fn(key); }); };
