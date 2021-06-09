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
import * as React from 'react';
import { ListItem, ListItemText, ListItemAvatar, Typography, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useLocale, useRecordContext, useTranslate, } from 'react-admin';
import classnames from 'classnames';
import { EventAvatar } from '../EventAvatar';
import { useEventLabel } from '../useEventLabel';
/**
 * Default component to display an audit logs.
 * @see Timeline
 */
export var RecordTimelineItem = function (props) {
    var className = props.className, classesOverride = props.classes, rest = __rest(props, ["className", "classes"]);
    var classes = useStyles(props);
    var translate = useTranslate();
    var locale = useLocale();
    var record = useRecordContext(props.record);
    var actionLabel = useEventLabel({ record: record, variant: 'short' });
    if (!record) {
        return null;
    }
    return (React.createElement(ListItem, __assign({ className: classnames(classes.root, className), button: false }, rest),
        React.createElement(ListItemAvatar, null,
            React.createElement(EventAvatar, { alt: record.author.fullName, src: record.author.avatar, fullName: record.author.fullName, role: "presentation" })),
        React.createElement(ListItemText, { primary: React.createElement(React.Fragment, null,
                React.createElement(Typography, { color: "textPrimary", className: classes.content },
                    React.createElement("strong", { className: classes.author }, record.author.fullName ||
                        translate("ra-audit-log.author", record.author))),
                React.createElement("span", { className: classes.date }, new Date(record.date).toLocaleString(locale))), secondary: React.createElement("span", { className: classes.action }, actionLabel) })));
};
var useStyles = makeStyles({
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
