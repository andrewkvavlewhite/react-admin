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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveSavedQueryDialog = void 0;
var React = __importStar(require("react"));
var isEqual_1 = __importDefault(require("lodash/isEqual"));
var react_admin_1 = require("react-admin");
var core_1 = require("@material-ui/core");
var useSavedQueries_1 = require("./useSavedQueries");
exports.RemoveSavedQueryDialog = function (_a) {
    var open = _a.open, onClose = _a.onClose;
    var translate = react_admin_1.useTranslate();
    var _b = react_admin_1.useListContext(), resource = _b.resource, filterValues = _b.filterValues, currentSort = _b.currentSort, perPage = _b.perPage, displayedFilters = _b.displayedFilters;
    var _c = useSavedQueries_1.useSavedQueries(resource), savedQueries = _c[0], setSavedQueries = _c[1];
    var removeQuery = function () {
        var index = savedQueries.findIndex(function (savedFilter) {
            return isEqual_1.default(savedFilter.value, {
                filter: filterValues,
                sort: currentSort,
                perPage: perPage,
                displayedFilters: displayedFilters,
            });
        });
        setSavedQueries(__spreadArrays(savedQueries.slice(0, index), savedQueries.slice(index + 1)));
        onClose();
    };
    return (React.createElement(core_1.Dialog, { open: open, onClose: onClose, "aria-labelledby": "alert-dialog-title", "aria-describedby": "alert-dialog-description" },
        React.createElement(core_1.DialogTitle, { id: "alert-dialog-title" }, translate('ra-preferences.saved_queries.remove_dialog_title', {
            _: 'Remove saved query?',
        })),
        React.createElement(core_1.DialogContent, null,
            React.createElement(core_1.DialogContentText, null, translate('ra-preferences.saved_queries.remove_message', {
                _: 'Are you sure you want to remove that item from your list of saved queries?',
            }))),
        React.createElement(core_1.DialogActions, null,
            React.createElement(core_1.Button, { onClick: onClose }, translate('ra.action.cancel')),
            React.createElement(core_1.Button, { onClick: removeQuery, color: "primary", 
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus: true }, translate('ra.action.confirm')))));
};
