"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomItems = exports.WithCurrentValue = exports.DarkMode = exports.Loading = exports.Default = void 0;
var React = __importStar(require("react"));
var react_final_form_1 = require("react-final-form");
var core_1 = require("@material-ui/core");
var MusicNote_1 = __importDefault(require("@material-ui/icons/MusicNote"));
var react_admin_1 = require("react-admin");
var ra_i18n_polyglot_1 = __importDefault(require("ra-i18n-polyglot"));
var ra_language_english_1 = __importDefault(require("ra-language-english"));
var merge_1 = __importDefault(require("lodash/merge"));
var src_1 = require("../../src");
exports.default = {
    title: 'ra-relationships/DualListInput',
};
var i18nProvider = ra_i18n_polyglot_1.default(function () { return merge_1.default(ra_language_english_1.default, src_1.raRelationshipsLanguageEnglish); }, 'en' // Default locale
);
var choices = [
    { id: 0, name: 'Rock', icon: React.createElement(MusicNote_1.default, null), disabled: false },
    { id: 1, name: 'Jazz', icon: React.createElement(MusicNote_1.default, null), disabled: false },
    { id: 2, name: 'Country', icon: React.createElement(MusicNote_1.default, null), disabled: true },
    { id: 3, name: 'Pop', icon: React.createElement(MusicNote_1.default, null), disabled: false },
    { id: 4, name: 'Metal', icon: React.createElement(MusicNote_1.default, null), disabled: false },
    { id: 5, name: 'Rap', icon: React.createElement(MusicNote_1.default, null), disabled: false },
    { id: 6, name: 'Raegae', icon: React.createElement(MusicNote_1.default, null), disabled: false },
    { id: 7, name: 'Classical', icon: React.createElement(MusicNote_1.default, null), disabled: false },
];
exports.Default = function () { return (React.createElement(react_admin_1.TranslationProvider, { i18nProvider: i18nProvider },
    React.createElement(React.Fragment, null,
        React.createElement(core_1.CssBaseline, null),
        React.createElement(core_1.Card, null,
            React.createElement(core_1.CardContent, null,
                React.createElement(react_final_form_1.Form, { onSubmit: function (_a) {
                        var values = _a.values;
                        console.log({ values: values }); // eslint-disable-line
                    }, render: function () { return (React.createElement(src_1.DualListInput, { label: "Items", source: "items", choices: choices })); } })))))); };
exports.Loading = function () {
    var _a = React.useState(true), loading = _a[0], setLoading = _a[1];
    React.useEffect(function () {
        setTimeout(function () {
            setLoading(false);
        }, 2000);
    }, []);
    return (React.createElement(react_admin_1.TranslationProvider, { i18nProvider: i18nProvider },
        React.createElement(React.Fragment, null,
            React.createElement(core_1.CssBaseline, null),
            React.createElement(core_1.Card, null,
                React.createElement(core_1.CardContent, null,
                    React.createElement(react_final_form_1.Form, { onSubmit: function (_a) {
                            var values = _a.values;
                            console.log({ values: values }); // eslint-disable-line
                        }, render: function () { return (React.createElement(src_1.DualListInput, { label: "Items", source: "items", choices: choices, loading: loading })); } }))))));
};
exports.DarkMode = function () { return (React.createElement(core_1.ThemeProvider, { theme: core_1.createMuiTheme({ palette: { type: 'dark' } }) },
    React.createElement(exports.Default, null))); };
var initialValues = {
    items: [0, 3, 4],
};
exports.WithCurrentValue = function () { return (React.createElement(react_admin_1.TranslationProvider, { i18nProvider: i18nProvider },
    React.createElement(React.Fragment, null,
        React.createElement(core_1.CssBaseline, null),
        React.createElement(core_1.Card, null,
            React.createElement(core_1.CardContent, null,
                React.createElement(react_final_form_1.Form, { initialValues: initialValues, onSubmit: function (_a) {
                        var values = _a.values;
                        console.log({ values: values }); // eslint-disable-line
                    }, render: function () { return (React.createElement(src_1.DualListInput, { label: "Items", source: "items", choices: choices })); } })))))); };
var CustomItem = function (_a) {
    var record = _a.record;
    return (React.createElement(React.Fragment, null,
        React.createElement(core_1.ListItemIcon, null,
            React.createElement(MusicNote_1.default, null)),
        React.createElement(core_1.ListItemText, { primary: record.name })));
};
exports.CustomItems = function () { return (React.createElement(react_admin_1.TranslationProvider, { i18nProvider: i18nProvider },
    React.createElement(React.Fragment, null,
        React.createElement(core_1.CssBaseline, null),
        React.createElement(core_1.Card, null,
            React.createElement(core_1.CardContent, null,
                React.createElement(react_final_form_1.Form, { onSubmit: function (_a) {
                        var values = _a.values;
                        console.log({ values: values }); // eslint-disable-line
                    }, render: function () { return (React.createElement(src_1.DualListInput, { label: "Items", source: "items", choices: choices, optionText: React.createElement(CustomItem, null) })); } })))))); };
