import React from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslate, useListContext, getFieldLabelTranslationArgs, } from 'react-admin';
import classnames from 'classnames';
import usePreferences from '../usePreferences';
var SelectColumnsMenu = function (_a) {
    var preference = _a.preference, columns = _a.columns, className = _a.className;
    var classes = useStyles();
    var _b = usePreferences(preference, Object.keys(columns)), columnsPref = _b[0], setColumnsPref = _b[1];
    var translate = useTranslate();
    var resource = useListContext().resource;
    var addColumn = function (event) {
        setColumnsPref(Object.keys(columns).filter(function (name) { return name === event.target.name || columnsPref.includes(name); }));
    };
    var removeColumn = function (event) {
        // always leave at least one column
        if (columnsPref.length > 1) {
            setColumnsPref(columnsPref.filter(function (name) { return name !== event.target.name; }));
        }
    };
    return (React.createElement("div", { className: classnames(classes.columnsContainer, className) }, Object.keys(columns).map(function (name) { return (React.createElement("div", { key: name },
        React.createElement(FormControlLabel, { control: React.createElement(Checkbox, { name: name, checked: columnsPref.includes(name), onClick: columnsPref.includes(name)
                    ? removeColumn
                    : addColumn }), label: translate.apply(void 0, getFieldLabelTranslationArgs({
                label: columns[name].props.label,
                resource: resource,
                source: name,
            })) }))); })));
};
export default SelectColumnsMenu;
var useStyles = makeStyles(function (theme) { return ({
    columnsContainer: {
        margin: theme.spacing(1) + "px " + theme.spacing(2) + "px",
    },
}); });
