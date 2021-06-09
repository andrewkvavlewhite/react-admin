"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Preferences_Form = void 0;
/* eslint-disable @typescript-eslint/explicit-function-return-type */
var react_1 = __importDefault(require("react"));
var react_final_form_1 = require("react-final-form");
var core_1 = require("@material-ui/core");
var usePreferences_1 = __importDefault(require("../src/usePreferences"));
exports.default = { title: 'ra-preferences/Form' };
var PreferencesForm = function () {
    var _a = usePreferences_1.default(), preferences = _a[0], setPreferences = _a[1];
    var handleSave = function (values) {
        setPreferences(values);
    };
    return (react_1.default.createElement(react_final_form_1.Form, { initialValues: preferences, onSubmit: handleSave }, function (_a) {
        var handleSubmit = _a.handleSubmit;
        return (react_1.default.createElement("form", { onSubmit: handleSubmit },
            react_1.default.createElement(core_1.Card, null,
                react_1.default.createElement(core_1.CardContent, null,
                    react_1.default.createElement(core_1.Typography, { variant: "h5", gutterBottom: true }, "Preferences"),
                    react_1.default.createElement(react_final_form_1.Field, { name: "density" }, function (props) { return (react_1.default.createElement(core_1.Box, { m: 2 },
                        react_1.default.createElement(core_1.InputLabel, { id: "density-select" }, "List density"),
                        react_1.default.createElement(core_1.Select, { labelId: "density-select", name: props.input.name, value: props.input.value, onChange: props.input.onChange },
                            react_1.default.createElement(core_1.MenuItem, { value: "small" }, "Small"),
                            react_1.default.createElement(core_1.MenuItem, { value: "medium" }, "Medium")))); }),
                    react_1.default.createElement(react_final_form_1.Field, { name: "divider" }, function (props) { return (react_1.default.createElement(core_1.Box, { m: 2 },
                        react_1.default.createElement(core_1.FormControlLabel, { control: react_1.default.createElement(core_1.Switch, { checked: props.input.value, onChange: props.input.onChange }), label: "Divider" }))); }),
                    react_1.default.createElement(core_1.Button, { type: "submit" }, "Update Preferences")))));
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
    var preferences = usePreferences_1.default()[0];
    return (react_1.default.createElement(core_1.Card, null,
        react_1.default.createElement(core_1.CardContent, null,
            react_1.default.createElement(core_1.Typography, { variant: "h5", gutterBottom: true }, "Content"),
            react_1.default.createElement(core_1.List, { dense: preferences.density !== 'medium' }, items.map(function (item) { return (react_1.default.createElement(core_1.ListItem, { key: item, divider: preferences.divider },
                react_1.default.createElement(core_1.ListItemText, null, item))); })))));
};
exports.Preferences_Form = function () { return (react_1.default.createElement(core_1.Grid, { container: true, spacing: 2 },
    react_1.default.createElement(core_1.Grid, { item: true },
        react_1.default.createElement(ListWithDensity, null)),
    react_1.default.createElement(core_1.Grid, { item: true },
        react_1.default.createElement(PreferencesForm, null)))); };
