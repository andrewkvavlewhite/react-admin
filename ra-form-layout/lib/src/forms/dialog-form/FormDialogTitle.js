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
var React = __importStar(require("react"));
var react_1 = require("react");
var core_1 = require("@material-ui/core");
var Close_1 = __importDefault(require("@material-ui/icons/Close"));
var react_admin_1 = require("react-admin");
var FormDialogTitle = function (props) {
    var translate = react_admin_1.useTranslate();
    var classes = useStyles(props);
    var defaultTitle = props.defaultTitle, onClose = props.onClose, record = props.record, title = props.title;
    return (React.createElement(core_1.DialogTitle, { id: "edit-dialog-title" },
        react_1.isValidElement(title)
            ? react_1.cloneElement(title, { record: record })
            : title
                ? translate(title, { _: title })
                : defaultTitle,
        React.createElement(core_1.IconButton, { "aria-label": translate('ra.action.close'), className: classes.closeButton, onClick: onClose },
            React.createElement(Close_1.default, null))));
};
exports.default = FormDialogTitle;
var useStyles = core_1.makeStyles(function (theme) { return ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}); }, {
    name: 'RaFormDialogTitle',
});
