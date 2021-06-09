import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Popper } from '@material-ui/core';
var useStyles = makeStyles(function (theme) { return ({
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
    return (React.createElement(Popper, { className: classes.tip, id: 'event-popper', open: true },
        React.createElement(Card, { className: classes.paper },
            React.createElement(CardContent, null,
                React.createElement(Typography, { gutterBottom: true, variant: "h5", component: "h2" }, "Simulate other users actions"),
                children))));
};
export default CustomPopper;
