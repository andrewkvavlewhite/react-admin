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
var React = __importStar(require("react"));
var react_admin_1 = require("react-admin");
var core_1 = require("@material-ui/core");
var DeleteButton_1 = __importDefault(require("./DeleteButton"));
var Toolbar = function (props) {
    return (React.createElement(react_admin_1.Toolbar, __assign({}, props),
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
        React.createElement(react_admin_1.SaveButton, { handleSubmitWithRedirect: handleSubmitWithRedirect || handleSubmit, disabled: disabled, invalid: invalid, redirect: redirect, saving: saving, submitOnEnter: submitOnEnter }),
        React.createElement(DeleteButton_1.default, { basePath: basePath, record: record, resource: resource, undoable: undoable })));
};
exports.default = Toolbar;
var useStyles = core_1.makeStyles({
    defaultToolbar: {
        flex: 1,
        display: 'flex',
        justifyContent: 'space-between',
    },
}, { name: 'RaToolbar' });
