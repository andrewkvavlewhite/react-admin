import * as React from 'react';
import { RecordContextProvider, useTranslate, } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import { Card, List, Typography } from '@material-ui/core';
import classnames from 'classnames';
import { TimelineItem } from './TimelineItem';
import { useTimelineGroup } from './useTimelineGroup';
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
export var TimelineGroup = function (props) {
    var className = props.className, _a = props.children, children = _a === void 0 ? React.createElement(TimelineItem, null) : _a;
    var classes = useStyles(props);
    var translate = useTranslate();
    var _b = useTimelineGroup(), label = _b.label, records = _b.records;
    var translatedLabel = translate(label, { _: label });
    return (React.createElement("div", { className: classnames(classes.root, className) },
        React.createElement(Typography, { variant: "subtitle1", gutterBottom: true, className: classes.label, role: "presentation" }, translatedLabel),
        React.createElement(Card, { className: classes.events },
            React.createElement(List, { component: "div", role: "list", "aria-label": translatedLabel }, records.map(function (record) { return (React.createElement(RecordContextProvider, { key: record.id, value: record }, children)); })))));
};
var useStyles = makeStyles(function (theme) { return ({
    root: {
        marginBottom: theme.spacing(1),
    },
    label: {},
    events: {},
}); }, { name: 'RaTimelineGroup' });
