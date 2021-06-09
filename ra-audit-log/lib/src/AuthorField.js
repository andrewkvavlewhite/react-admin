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
exports.AuthorField = void 0;
var React = __importStar(require("react"));
var react_admin_1 = require("react-admin");
var styles_1 = require("@material-ui/core/styles");
var classnames_1 = __importDefault(require("classnames"));
var AvatarField_1 = require("./AvatarField");
/**
 * A react-admin field which displays the author of an event with its avatar if available.
 */
exports.AuthorField = function (props) {
    var authorResource = props.authorResource, className = props.className, classesOverride = props.classes, link = props.link, source = props.source, rest = __rest(props, ["authorResource", "className", "classes", "link", "source"]);
    var classes = useStyles(props);
    var record = react_admin_1.useRecordContext(props);
    if (authorResource) {
        return (React.createElement(react_admin_1.ReferenceField, __assign({ source: "author.id", reference: authorResource, link: link }, rest),
            React.createElement(exports.AuthorField, null)));
    }
    return record ? (React.createElement("div", { className: classnames_1.default(classes.root, className) },
        React.createElement(AvatarField_1.AvatarField, { source: "avatar", record: record.author ? record.author : record, className: classes.small }),
        React.createElement(react_admin_1.TextField, __assign({ source: "fullName" }, rest, { record: record.author ? record.author : record })))) : null;
};
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    small: {
        display: 'inline-flex',
        width: theme.spacing(3),
        height: theme.spacing(3),
        marginRight: theme.spacing(1),
    },
}); });
exports.AuthorField.defaultProps = {
    addLabel: true,
};
