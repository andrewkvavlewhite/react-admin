import * as React from 'react';
import { cloneElement, isValidElement } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
var NodeTitle = function (_a) {
    var data = _a.data, nodeActions = _a.nodeActions;
    var classes = useStyles();
    return (React.createElement("div", { className: classes.root },
        React.createElement(Typography, { variant: "body1" }, data.title),
        isValidElement(nodeActions) &&
            cloneElement(nodeActions, {
                className: classes.menuButton,
                data: data,
            })));
};
export default NodeTitle;
var useStyles = makeStyles({
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
