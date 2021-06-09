import * as React from 'react';
import { ReactElement, ReactNode } from 'react';
import {
    ClassesOverride,
    RecordContextProvider,
    useTranslate,
} from 'react-admin';
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
export const TimelineGroup = (props: TimelineGroupProps): ReactElement => {
    const { className, children = <TimelineItem /> } = props;
    const classes = useStyles(props);
    const translate = useTranslate();
    const { label, records } = useTimelineGroup();

    const translatedLabel = translate(label, { _: label });

    return (
        <div className={classnames(classes.root, className)}>
            <Typography
                variant="subtitle1"
                gutterBottom
                className={classes.label}
                role="presentation"
            >
                {translatedLabel}
            </Typography>
            <Card className={classes.events}>
                <List component="div" role="list" aria-label={translatedLabel}>
                    {records.map(record => (
                        <RecordContextProvider key={record.id} value={record}>
                            {children}
                        </RecordContextProvider>
                    ))}
                </List>
            </Card>
        </div>
    );
};

const useStyles = makeStyles(
    theme => ({
        root: {
            marginBottom: theme.spacing(1),
        },
        label: {},
        events: {},
    }),
    { name: 'RaTimelineGroup' }
);

export interface TimelineGroupProps {
    children?: ReactNode;
    className?: string;
    classes?: ClassesOverride<typeof useStyles>;
}
