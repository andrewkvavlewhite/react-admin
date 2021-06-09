import * as React from 'react';
import { Card, List, ListItem, ListItemAvatar, ListItemText, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslate } from 'react-admin';
import { TimelinePlaceholder } from './TimelinePlaceholder';
import { EventAvatar } from '../EventAvatar';
export var TimelineSkeleton = function (props) {
    var classes = useStyles(props);
    var translate = useTranslate();
    return (React.createElement("div", { className: classes.root, "aria-disabled": true, "aria-label": translate('ra.message.loading') },
        React.createElement("div", null, times(2, function (key1) { return (React.createElement("div", { key: key1 },
            React.createElement(TimelinePlaceholder, { className: classes.subTitle }),
            React.createElement(Card, { className: classes.card },
                React.createElement(List, null, times(5, function (key2) { return (React.createElement(ListItem, { key: key2 },
                    React.createElement(ListItemAvatar, null,
                        React.createElement(EventAvatar, null)),
                    React.createElement(ListItemText, { primary: React.createElement(TimelinePlaceholder, null), secondary: React.createElement(TimelinePlaceholder, null) }))); }))))); }))));
};
var useStyles = makeStyles(function (theme) { return ({
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
