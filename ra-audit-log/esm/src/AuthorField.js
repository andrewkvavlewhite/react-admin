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
import { ReferenceField, TextField, useRecordContext, } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { AvatarField } from './AvatarField';
/**
 * A react-admin field which displays the author of an event with its avatar if available.
 */
export var AuthorField = function (props) {
    var authorResource = props.authorResource, className = props.className, classesOverride = props.classes, link = props.link, source = props.source, rest = __rest(props, ["authorResource", "className", "classes", "link", "source"]);
    var classes = useStyles(props);
    var record = useRecordContext(props);
    if (authorResource) {
        return (React.createElement(ReferenceField, __assign({ source: "author.id", reference: authorResource, link: link }, rest),
            React.createElement(AuthorField, null)));
    }
    return record ? (React.createElement("div", { className: classnames(classes.root, className) },
        React.createElement(AvatarField, { source: "avatar", record: record.author ? record.author : record, className: classes.small }),
        React.createElement(TextField, __assign({ source: "fullName" }, rest, { record: record.author ? record.author : record })))) : null;
};
var useStyles = makeStyles(function (theme) { return ({
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
AuthorField.defaultProps = {
    addLabel: true,
};
