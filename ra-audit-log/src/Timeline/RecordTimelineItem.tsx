import * as React from 'react';
import { ReactElement } from 'react';
import {
    ListItem,
    ListItemText,
    ListItemAvatar,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
    ClassesOverride,
    useLocale,
    useRecordContext,
    useTranslate,
} from 'react-admin';
import classnames from 'classnames';
import { EventRecord } from '../types';
import { EventAvatar } from '../EventAvatar';
import { useEventLabel } from '../useEventLabel';
import { TimelineItemProps } from './TimelineItem';

/**
 * Default component to display an audit logs.
 * @see Timeline
 */
export const RecordTimelineItem = (
    props: RecordTimelineItemProps
): ReactElement => {
    const { className, classes: classesOverride, ...rest } = props;
    const classes = useStyles(props);
    const translate = useTranslate();
    const locale = useLocale();
    const record = useRecordContext<EventRecord>(props.record);
    const actionLabel = useEventLabel({ record, variant: 'short' });

    if (!record) {
        return null;
    }

    return (
        <ListItem
            className={classnames(classes.root, className)}
            button={false}
            {...rest}
        >
            <ListItemAvatar>
                <EventAvatar
                    alt={record.author.fullName}
                    src={record.author.avatar}
                    fullName={record.author.fullName}
                    role="presentation"
                />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <>
                        <Typography
                            color="textPrimary"
                            className={classes.content}
                        >
                            <strong className={classes.author}>
                                {record.author.fullName ||
                                    translate(
                                        `ra-audit-log.author`,
                                        record.author
                                    )}
                            </strong>
                        </Typography>
                        <span className={classes.date}>
                            {new Date(record.date).toLocaleString(locale)}
                        </span>
                    </>
                }
                secondary={
                    <span className={classes.action}>{actionLabel}</span>
                }
            />
        </ListItem>
    );
};

const useStyles = makeStyles(
    {
        root: {},
        content: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        author: {},
        action: {},
        date: {},
    },
    {
        name: 'RaTimelineItem',
    }
);

export interface RecordTimelineItemProps
    extends Omit<TimelineItemProps, 'link' | 'button'> {
    className?: string;
    classes?: ClassesOverride<typeof useStyles>;
    record?: EventRecord;
}
