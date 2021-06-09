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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordTimelineItem = void 0;
var React = __importStar(require("react"));
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var react_admin_1 = require("react-admin");
var classnames_1 = __importDefault(require("classnames"));
var EventAvatar_1 = require("../EventAvatar");
var useEventLabel_1 = require("../useEventLabel");
/**
 * Default component to display an audit logs.
 * @see Timeline
 */
exports.RecordTimelineItem = function (props) {
    var className = props.className, classesOverride = props.classes, rest = __rest(props, ["className", "classes"]);
    var classes = useStyles(props);
    var translate = react_admin_1.useTranslate();
    var locale = react_admin_1.useLocale();
    var record = react_admin_1.useRecordContext(props.record);
    var actionLabel = useEventLabel_1.useEventLabel({ record: record, variant: 'short' });
    if (!record) {
        return null;
    }
    return (React.createElement(core_1.ListItem, __assign({ className: classnames_1.default(classes.root, className), button: false }, rest),
        React.createElement(core_1.ListItemAvatar, null,
            React.createElement(EventAvatar_1.EventAvatar, { alt: record.author.fullName, src: record.author.avatar, fullName: record.author.fullName, role: "presentation" })),
        React.createElement(core_1.ListItemText, { primary: React.createElement(React.Fragment, null,
                React.createElement(core_1.Typography, { color: "textPrimary", className: classes.content },
                    React.createElement("strong", { className: classes.author }, record.author.fullName ||
                        translate("ra-audit-log.author", record.author))),
                React.createElement("span", { className: classes.date }, new Date(record.date).toLocaleString(locale))), secondary: React.createElement("span", { className: classes.action }, actionLabel) })));
};
var useStyles = styles_1.makeStyles({
    root: {},
    content: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    author: {},
    action: {},
    date: {},
}, {
    name: 'RaTimelineItem',
});
