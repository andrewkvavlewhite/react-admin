import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
export var TimelinePlaceholder = function (props) {
    var className = props.className;
    var classes = useStyles(props);
    // Must be a span because it's used inside a Typography which is a p by default
    return React.createElement("span", { className: classnames(classes.root, className) }, "\u00A0");
};
var useStyles = makeStyles(function (theme) { return ({
    root: {
        backgroundColor: theme.palette.grey[400],
        display: 'inline-block',
    },
}); }, { name: 'RaTimelinePlaceholder' });
