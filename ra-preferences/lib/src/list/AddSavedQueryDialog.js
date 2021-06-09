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
exports.AddSavedQueryDialog = void 0;
var React = __importStar(require("react"));
var react_1 = require("react");
var react_admin_1 = require("react-admin");
var core_1 = require("@material-ui/core");
var useSavedQueries_1 = require("./useSavedQueries");
exports.AddSavedQueryDialog = function (_a) {
    var open = _a.open, onClose = _a.onClose;
    var translate = react_admin_1.useTranslate();
    var _b = react_admin_1.useListContext(), resource = _b.resource, filterValues = _b.filterValues, displayedFilters = _b.displayedFilters, currentSort = _b.currentSort, perPage = _b.perPage;
    var _c = useSavedQueries_1.useSavedQueries(resource), savedQueries = _c[0], setSavedQueries = _c[1];
    // input state
    var _d = react_1.useState(''), queryName = _d[0], setQueryName = _d[1];
    var handleQueryNameChange = function (event) {
        setQueryName(event.target.value);
    };
    var handleFormSubmit = function (e) {
        e.preventDefault();
        addQuery();
    };
    var addQuery = function () {
        setSavedQueries(savedQueries.concat({
            label: queryName,
            value: {
                filter: filterValues,
                sort: currentSort,
                perPage: perPage,
                displayedFilters: displayedFilters,
            },
        }));
        setQueryName('');
        onClose();
    };
    return (React.createElement(core_1.Dialog, { open: open, onClose: onClose, "aria-labelledby": "form-dialog-title" },
        React.createElement(core_1.DialogTitle, { id: "form-dialog-title" }, translate('ra-preferences.saved_queries.new_dialog_title', {
            _: 'Save current query as',
        })),
        React.createElement(core_1.DialogContent, null,
            React.createElement("form", { onSubmit: handleFormSubmit },
                React.createElement(core_1.TextField
                // eslint-disable-next-line jsx-a11y/no-autofocus
                , { 
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus: true, margin: "dense", id: "name", label: translate('ra-preferences.saved_queries.query_name', {
                        _: 'Query name',
                    }), fullWidth: true, value: queryName, onChange: handleQueryNameChange }))),
        React.createElement(core_1.DialogActions, null,
            React.createElement(core_1.Button, { onClick: onClose }, translate('ra.action.cancel')),
            React.createElement(core_1.Button, { onClick: addQuery, color: "primary" }, translate('ra.action.save')))));
};
