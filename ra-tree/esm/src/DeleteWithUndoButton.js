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
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import ActionDelete from '@material-ui/icons/Delete';
import classnames from 'classnames';
import { Button } from 'react-admin';
import { useDeleteBranchWithUndoController } from './controllers';
var DeleteWithUndoButton = function (props) {
    var _a = props.label, label = _a === void 0 ? 'ra.action.delete' : _a, classesOverride = props.classes, className = props.className, _b = props.icon, icon = _b === void 0 ? defaultIcon : _b, onClick = props.onClick, resource = props.resource, record = props.record, basePath = props.basePath, _c = props.redirect, redirect = _c === void 0 ? 'list' : _c, rest = __rest(props, ["label", "classes", "className", "icon", "onClick", "resource", "record", "basePath", "redirect"]);
    var classes = useStyles(props);
    var _d = useDeleteBranchWithUndoController({
        resource: resource,
        record: record,
        basePath: basePath,
        redirect: redirect,
        onClick: onClick,
    }), loading = _d.loading, handleDelete = _d.handleDelete;
    return (React.createElement(Button, __assign({ onClick: handleDelete, disabled: loading, label: label, className: classnames('ra-delete-button', classes.deleteButton, className), key: "button" }, rest), icon));
};
var useStyles = makeStyles(function (theme) { return ({
    deleteButton: {
        color: theme.palette.error.main,
        '&:hover': {
            backgroundColor: fade(theme.palette.error.main, 0.12),
            // Reset on mouse devices
            '@media (hover: none)': {
                backgroundColor: 'transparent',
            },
        },
    },
}); }, { name: 'RaDeleteWithUndoButton' });
var defaultIcon = React.createElement(ActionDelete, null);
DeleteWithUndoButton.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.object,
    className: PropTypes.string,
    label: PropTypes.string,
    record: PropTypes.any,
    redirect: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.func,
    ]),
    resource: PropTypes.string,
    icon: PropTypes.element,
};
export default DeleteWithUndoButton;
