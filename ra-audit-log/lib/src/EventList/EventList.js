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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventListSmallContent = exports.EventList = void 0;
var React = __importStar(require("react"));
var react_admin_1 = require("react-admin");
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var AuthorField_1 = require("../AuthorField");
var Timeline_1 = require("../Timeline");
var ActionField_1 = require("../ActionField");
var ResourceField_1 = require("../ResourceField");
var EventListFilter_1 = require("./EventListFilter");
var EventFilterAside_1 = require("./EventFilterAside");
var useGetActionLink_1 = require("../useGetActionLink");
/**
 * A pre-configured List for event logs. Provides adequate views and filters.
 * @param props
 */
exports.EventList = function (props) {
    var authorResource = props.authorResource, dateFilters = props.dateFilters, eventResource = props.eventResource, rest = __rest(props, ["authorResource", "dateFilters", "eventResource"]);
    var controllerProps = react_admin_1.useListController(__assign({ sort: { field: 'date', order: 'desc' } }, props));
    var isSmall = core_1.useMediaQuery(function (theme) { return theme.breakpoints.down('sm'); });
    var getActionLink = useGetActionLink_1.useGetActionLink();
    var handleRowClick = function (id, basePath, record) {
        return getActionLink(record);
    };
    return (React.createElement(react_admin_1.ListContextProvider, { value: controllerProps },
        React.createElement(react_admin_1.ListView, __assign({ component: isSmall ? exports.EventListSmallContent : undefined, bulkActionButtons: false, aside: isSmall ? undefined : (React.createElement(EventFilterAside_1.EventFilterAside, { authorResource: authorResource, dateFilters: dateFilters, eventResource: eventResource })), filters: isSmall ? (React.createElement(EventListFilter_1.EventListFilter, { authorResource: authorResource, dateFilters: dateFilters, eventResource: eventResource })) : undefined }, rest, controllerProps), isSmall ? (React.createElement(Timeline_1.TimelineList, null)) : (React.createElement(react_admin_1.Datagrid, { rowClick: handleRowClick },
            React.createElement(react_admin_1.DateField, { source: "date" }),
            React.createElement(ResourceField_1.ResourceField, { source: "resource" }),
            React.createElement(AuthorField_1.AuthorField, { authorResource: authorResource, source: "author" }),
            React.createElement(ActionField_1.ActionField, { source: "action" }))))));
};
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: theme.spacing(0.5),
        paddingRight: theme.spacing(0.5),
        width: '100%',
    },
}); });
exports.EventListSmallContent = function (props) {
    var classes = useStyles();
    return React.createElement("div", __assign({}, props, { className: classes.root }));
};
