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
import * as React from 'react';
import { SaveButton, Toolbar as RaToolbar } from 'react-admin';
import { makeStyles } from '@material-ui/core';
import DeleteButton from './DeleteButton';
var Toolbar = function (props) {
    return (React.createElement(RaToolbar, __assign({}, props),
        React.createElement(InnerToolbar, { alwaysEnableSaveButton: props.alwaysEnableSaveButton })));
};
var valueOrDefault = function (value, defaultValue) { return (typeof value === 'undefined' ? defaultValue : value); };
// Required intermediate component because RaToolbar will clone its children and inject props into them
// However, we don't want these props injected on the div used for spacing
var InnerToolbar = function (props) {
    var alwaysEnableSaveButton = props.alwaysEnableSaveButton, basePath = props.basePath, handleSubmitWithRedirect = props.handleSubmitWithRedirect, handleSubmit = props.handleSubmit, invalid = props.invalid, pristine = props.pristine, record = props.record, redirect = props.redirect, resource = props.resource, saving = props.saving, submitOnEnter = props.submitOnEnter, undoable = props.undoable;
    var classes = useStyles(props);
    // Use form pristine to enable or disable the save button
    // if alwaysEnableSaveButton is undefined
    var disabled = !valueOrDefault(alwaysEnableSaveButton, !pristine);
    return (React.createElement("div", { className: classes.defaultToolbar },
        React.createElement(SaveButton, { handleSubmitWithRedirect: handleSubmitWithRedirect || handleSubmit, disabled: disabled, invalid: invalid, redirect: redirect, saving: saving, submitOnEnter: submitOnEnter }),
        React.createElement(DeleteButton, { basePath: basePath, record: record, resource: resource, undoable: undoable })));
};
export default Toolbar;
var useStyles = makeStyles({
    defaultToolbar: {
        flex: 1,
        display: 'flex',
        justifyContent: 'space-between',
    },
}, { name: 'RaToolbar' });
