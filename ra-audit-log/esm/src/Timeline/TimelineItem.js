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
import { Link } from 'react-router-dom';
import { useEventLabel } from '../useEventLabel';
import { useGetActionLink } from '../useGetActionLink';
/**
 * Default component to display an audit logs.
 * @see Timeline
 */
export var TimelineItem = function (props) {
    var className = props.className, classesOverride = props.classes, link = props.link, rest = __rest(props, ["className", "classes", "link"]);
    var classes = useStyles(props);
    var translate = useTranslate();
    var locale = useLocale();
    var record = useRecordContext(props.record);
    var actionLabel = useEventLabel({ record: record, variant: 'inline' });
    var getActionLink = useGetActionLink();
    if (!record) {
        return null;
    }
    var linkTo = getActionLink(record, link);
    return (React.createElement(ListItem
    // @ts-ignore
    , __assign({ 
        // @ts-ignore
        component: linkTo ? Link : 'div', role: "listitem", to: linkTo, className: classnames(classes.root, className) }, rest),
        React.createElement(ListItemAvatar, null,
            React.createElement(EventAvatar, { alt: record.author.fullName, src: record.author.avatar, fullName: record.author.fullName, role: "presentation" })),
        React.createElement(ListItemText, { primary: React.createElement(Typography, { color: "textPrimary", className: classes.content },
                React.createElement("strong", { className: classes.author }, record.author.fullName ||
                    translate("ra-audit-log.author", record.author)),
                React.createElement("span", { className: classes.action }, actionLabel)), secondary: new Date(record.date).toLocaleString(locale) })));
};
var useStyles = makeStyles(function (theme) { return ({
    root: {
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
    },
    content: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    author: {
        marginRight: theme.spacing(0.5),
    },
    action: {},
}); }, {
    name: 'RaTimelineItem',
});
