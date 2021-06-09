"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var react_admin_1 = require("react-admin");
var classnames_1 = __importDefault(require("classnames"));
var usePreferences_1 = __importDefault(require("../usePreferences"));
var SelectColumnsMenu = function (_a) {
    var preference = _a.preference, columns = _a.columns, className = _a.className;
    var classes = useStyles();
    var _b = usePreferences_1.default(preference, Object.keys(columns)), columnsPref = _b[0], setColumnsPref = _b[1];
    var translate = react_admin_1.useTranslate();
    var resource = react_admin_1.useListContext().resource;
    var addColumn = function (event) {
        setColumnsPref(Object.keys(columns).filter(function (name) { return name === event.target.name || columnsPref.includes(name); }));
    };
    var removeColumn = function (event) {
        // always leave at least one column
        if (columnsPref.length > 1) {
            setColumnsPref(columnsPref.filter(function (name) { return name !== event.target.name; }));
        }
    };
    return (react_1.default.createElement("div", { className: classnames_1.default(classes.columnsContainer, className) }, Object.keys(columns).map(function (name) { return (react_1.default.createElement("div", { key: name },
        react_1.default.createElement(core_1.FormControlLabel, { control: react_1.default.createElement(core_1.Checkbox, { name: name, checked: columnsPref.includes(name), onClick: columnsPref.includes(name)
                    ? removeColumn
                    : addColumn }), label: translate.apply(void 0, react_admin_1.getFieldLabelTranslationArgs({
                label: columns[name].props.label,
                resource: resource,
                source: name,
            })) }))); })));
};
exports.default = SelectColumnsMenu;
var useStyles = styles_1.makeStyles(function (theme) { return ({
    columnsContainer: {
        margin: theme.spacing(1) + "px " + theme.spacing(2) + "px",
    },
}); });
