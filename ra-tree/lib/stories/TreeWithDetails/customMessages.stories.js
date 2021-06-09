"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var react_1 = __importDefault(require("react"));
var react_admin_1 = require("react-admin");
var history_1 = require("history");
var dataProvider_1 = __importDefault(require("./dataProvider"));
var CategoriesCreate_1 = __importDefault(require("../CategoriesCreate"));
var src_1 = require("../../src");
var ra_i18n_polyglot_1 = __importDefault(require("ra-i18n-polyglot"));
var ra_language_english_1 = __importDefault(require("ra-language-english"));
var ra_language_french_1 = __importDefault(require("ra-language-french"));
var ra_tree_language_english_1 = __importDefault(require("../../src/i18n/ra-tree-language-english"));
var ra_tree_language_french_1 = __importDefault(require("../../src/i18n/ra-tree-language-french"));
var SimpleForm_1 = __importDefault(require("../../src/SimpleForm"));
var customEnglishMessages = react_admin_1.mergeTranslations(ra_language_english_1.default, ra_tree_language_english_1.default, {
    'ra-tree': {
        action: {
            add_child: 'Add a daughter',
            add_root: 'Add a god',
        },
    },
});
var i18nCustomProvider = ra_i18n_polyglot_1.default(function (locale) {
    if (locale === 'fr') {
        return react_admin_1.mergeTranslations(ra_language_french_1.default, ra_tree_language_french_1.default);
    }
    return customEnglishMessages;
}, 'en');
var CategoriesEdit = function (props) { return (react_1.default.createElement(src_1.EditNode, __assign({}, props),
    react_1.default.createElement(SimpleForm_1.default, null,
        react_1.default.createElement(react_admin_1.TextField, { source: "id" }),
        react_1.default.createElement(react_admin_1.TextInput, { source: "name" }),
        react_1.default.createElement(react_admin_1.ReferenceManyField, { label: "Products", reference: "products", target: "category_id" },
            react_1.default.createElement(react_admin_1.Datagrid, null,
                react_1.default.createElement(react_admin_1.TextField, { source: "name" })))))); };
var CategoriesList = function (props) { return (react_1.default.createElement(src_1.TreeWithDetails, __assign({ titleField: "name", edit: CategoriesEdit, create: CategoriesCreate_1.default }, props))); };
exports.App = function () { return (react_1.default.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), dataProvider: dataProvider_1.default, i18nProvider: i18nCustomProvider, customReducers: { tree: src_1.reducer } },
    react_1.default.createElement(react_admin_1.Resource, { name: "categories", list: CategoriesList }),
    react_1.default.createElement(react_admin_1.Resource, { name: "products", list: react_admin_1.ListGuesser }))); };
exports.default = { title: 'ra-tree/TreeWithDetails/CustomMessages' };
