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
exports.TimelineGroup = void 0;
var React = __importStar(require("react"));
var react_admin_1 = require("react-admin");
var styles_1 = require("@material-ui/core/styles");
var core_1 = require("@material-ui/core");
var classnames_1 = __importDefault(require("classnames"));
var TimelineItem_1 = require("./TimelineItem");
var useTimelineGroup_1 = require("./useTimelineGroup");
/**
 * Default component to display a group of audit logs.
 * @see Timeline
 *
 * @example <caption>To use a custom item component</caption>
 * import { TimelineGroup } from '@react-admin/ra-audit-log';
 * import { useRecordContext } from 'react-admin';
 * import { ListItem, ListItemText } from '@material-ui/core';
 * import { getTextFromRecord } from './getTextFromRecord';
 *
 * const MyTimelineItem => {
 *     const record = useRecordContext();
 *     const label = getTextFromRecord(record);
 *
 *     return (
 *         <ListItem>
 *             <ListItemText>{label}</ListItemText>
 *         </ListItem>
 *     );
 * }
 *
 * const MyTimelineGroup = () => {
 *     return (
 *         <TimelineGroup>
 *             <MyTimelineItem />
 *         </TimelineGroup>
 *     );
 * };
 */
exports.TimelineGroup = function (props) {
    var className = props.className, _a = props.children, children = _a === void 0 ? React.createElement(TimelineItem_1.TimelineItem, null) : _a;
    var classes = useStyles(props);
    var translate = react_admin_1.useTranslate();
    var _b = useTimelineGroup_1.useTimelineGroup(), label = _b.label, records = _b.records;
    var translatedLabel = translate(label, { _: label });
    return (React.createElement("div", { className: classnames_1.default(classes.root, className) },
        React.createElement(core_1.Typography, { variant: "subtitle1", gutterBottom: true, className: classes.label, role: "presentation" }, translatedLabel),
        React.createElement(core_1.Card, { className: classes.events },
            React.createElement(core_1.List, { component: "div", role: "list", "aria-label": translatedLabel }, records.map(function (record) { return (React.createElement(react_admin_1.RecordContextProvider, { key: record.id, value: record }, children)); })))));
};
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        marginBottom: theme.spacing(1),
    },
    label: {},
    events: {},
}); }, { name: 'RaTimelineGroup' });
