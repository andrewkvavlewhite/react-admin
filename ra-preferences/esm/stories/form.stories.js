/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { Form, Field } from 'react-final-form';
import { Select, MenuItem, InputLabel, FormControlLabel, Switch, Card, CardContent, List, ListItem, ListItemText, Typography, Button, Grid, Box, } from '@material-ui/core';
import usePreferences from '../src/usePreferences';
export default { title: 'ra-preferences/Form' };
var PreferencesForm = function () {
    var _a = usePreferences(), preferences = _a[0], setPreferences = _a[1];
    var handleSave = function (values) {
        setPreferences(values);
    };
    return (React.createElement(Form, { initialValues: preferences, onSubmit: handleSave }, function (_a) {
        var handleSubmit = _a.handleSubmit;
        return (React.createElement("form", { onSubmit: handleSubmit },
            React.createElement(Card, null,
                React.createElement(CardContent, null,
                    React.createElement(Typography, { variant: "h5", gutterBottom: true }, "Preferences"),
                    React.createElement(Field, { name: "density" }, function (props) { return (React.createElement(Box, { m: 2 },
                        React.createElement(InputLabel, { id: "density-select" }, "List density"),
                        React.createElement(Select, { labelId: "density-select", name: props.input.name, value: props.input.value, onChange: props.input.onChange },
                            React.createElement(MenuItem, { value: "small" }, "Small"),
                            React.createElement(MenuItem, { value: "medium" }, "Medium")))); }),
                    React.createElement(Field, { name: "divider" }, function (props) { return (React.createElement(Box, { m: 2 },
                        React.createElement(FormControlLabel, { control: React.createElement(Switch, { checked: props.input.value, onChange: props.input.onChange }), label: "Divider" }))); }),
                    React.createElement(Button, { type: "submit" }, "Update Preferences")))));
    }));
};
var items = [
    'Lorem ipsum dolor sit amet',
    'consectetur adipiscing elit',
    'sed do eiusmod tempor incididunt',
    'ut labore et dolore magna aliqua',
    'Ut enim ad minim veniam',
    'quis nostrud exercitation ullamco',
];
var ListWithDensity = function () {
    var preferences = usePreferences()[0];
    return (React.createElement(Card, null,
        React.createElement(CardContent, null,
            React.createElement(Typography, { variant: "h5", gutterBottom: true }, "Content"),
            React.createElement(List, { dense: preferences.density !== 'medium' }, items.map(function (item) { return (React.createElement(ListItem, { key: item, divider: preferences.divider },
                React.createElement(ListItemText, null, item))); })))));
};
export var Preferences_Form = function () { return (React.createElement(Grid, { container: true, spacing: 2 },
    React.createElement(Grid, { item: true },
        React.createElement(ListWithDensity, null)),
    React.createElement(Grid, { item: true },
        React.createElement(PreferencesForm, null)))); };
