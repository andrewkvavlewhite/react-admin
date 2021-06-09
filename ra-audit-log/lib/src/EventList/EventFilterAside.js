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
exports.EventFilterAside = void 0;
var React = __importStar(require("react"));
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var react_admin_1 = require("react-admin");
var classnames_1 = __importDefault(require("classnames"));
var AuthorFilterList_1 = require("./AuthorFilterList");
var EventDateFilterList_1 = require("./EventDateFilterList");
var ResourceFilterList_1 = require("./ResourceFilterList");
/**
 * Includes all the default filters for the EventList in a component usable in an aside sidebar.
 * @param props The component props
 * @param {string} props.authorResource Optional. The name of the resource for authors.
 * @param {string} props.className Optional. A css class name.
 * @param {object} props.classes Optional. An object of styles from material-ui hook built with makeStyles
 * @param {object} props.dateFilters Optional. A map of date filters where the key is the label (which can be a translation key) and the value a function returning a date.
 * @param {string} props.eventsResource Optional. The name of the resource for events. Defaults to `events`
 */
exports.EventFilterAside = function (props) {
    var authorResource = props.authorResource, className = props.className, dateFilters = props.dateFilters, eventResource = props.eventResource;
    var classes = useStyles(props);
    return (React.createElement(core_1.Card, { className: classnames_1.default(classes.root, className) },
        React.createElement(core_1.CardContent, { className: classes.cardContent },
            React.createElement(react_admin_1.FilterLiveSearch, { source: "q" }),
            React.createElement(EventDateFilterList_1.EventDateFilterList, { dateFilters: dateFilters }),
            React.createElement(ResourceFilterList_1.ResourceFilterList, { eventResource: eventResource }),
            React.createElement(AuthorFilterList_1.AuthorFilterList, { authorResource: authorResource }))));
};
var useStyles = styles_1.makeStyles(function (theme) {
    var _a;
    return ({
        root: (_a = {},
            _a[theme.breakpoints.up('sm')] = {
                order: -1,
                width: '19em',
                marginRight: '1em',
            },
            _a[theme.breakpoints.down('sm')] = {
                display: 'none',
            },
            _a),
        cardContent: {
            display: 'flex',
            flexDirection: 'column',
        },
    });
}, {
    name: 'RaEventFilterAside',
});
