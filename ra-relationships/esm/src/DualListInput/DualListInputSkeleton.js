import * as React from 'react';
import { useTimeout, useTranslate } from 'react-admin';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
export var DualListInputSkeleton = function (_a) {
    var className = _a.className;
    var translate = useTranslate();
    var classes = useStyles();
    var oneSecondHasPassed = useTimeout(1000);
    if (oneSecondHasPassed) {
        return (React.createElement("div", { "aria-disabled": "true", "aria-label": translate('ra.message.loading'), className: classnames(className, classes.root) }));
    }
    return null;
};
var useStyles = makeStyles(function (theme) { return ({
    root: {
        backgroundColor: theme.palette.divider,
        borderStyle: 'none',
    },
}); }, {
    name: 'RaDualListInputSkeleton',
});
