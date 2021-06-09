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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchResultsGroup = void 0;
var React = __importStar(require("react"));
var react_1 = require("react");
var react_admin_1 = require("react-admin");
var core_1 = require("@material-ui/core");
var SearchResultItem_1 = require("./SearchResultItem");
/**
 * A component which displays search results for a specific target.
 *
 * @param props {SearchResultsGroupProps}
 * @param props.data {SearchResultDataItem[]} The search results
 * @param props.label {ReactElement|string} The target label
 * @param props.onClose {Function} The function to call when the Search PopOver should be closed.
 */
exports.SearchResultsGroup = function (props) {
    var _a = props.children, children = _a === void 0 ? defaultChildren : _a, data = props.data, label = props.label, onClose = props.onClose;
    var translate = react_admin_1.useTranslate();
    var classes = useStyles(props);
    return (React.createElement(React.Fragment, null,
        React.createElement(core_1.ListSubheader, { className: classes.subHeader, component: "h3", role: "presentation" }, react_1.isValidElement(label)
            ? label
            : translate(label.toString(), { _: label })),
        data.map(function (searchResultItem) {
            return react_1.cloneElement(children, {
                key: searchResultItem.id,
                data: searchResultItem,
                onClose: onClose,
            });
        })));
};
var useStyles = core_1.makeStyles(function (theme) { return ({
    subHeader: {
        background: theme.palette.background.paper,
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
}); });
var defaultChildren = React.createElement(SearchResultItem_1.SearchResultItem, null);
