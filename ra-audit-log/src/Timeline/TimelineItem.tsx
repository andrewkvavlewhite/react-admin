import * as React from 'react';
import { ReactElement } from 'react';
import {
    ListItem,
    ListItemProps,
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
import { Link } from 'react-router-dom';
import { useEventLabel } from '../useEventLabel';
import { LinkType, useGetActionLink } from '../useGetActionLink';

/**
 * Default component to display an audit logs.
 * @see Timeline
 */
export const TimelineItem = (props: TimelineItemProps): ReactElement => {
    const { className, classes: classesOverride, link, ...rest } = props;
    const classes = useStyles(props);
    const translate = useTranslate();
    const locale = useLocale();
    const record = useRecordContext<EventRecord>(props.record);
    const actionLabel = useEventLabel({ record, variant: 'inline' });
    const getActionLink = useGetActionLink();

    if (!record) {
        return null;
    }

    const linkTo = getActionLink(record, link);

    return (
        <ListItem
            // @ts-ignore
            component={linkTo ? Link : 'div'}
            role="listitem"
            to={linkTo}
            className={classnames(classes.root, className)}
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
                    <Typography color="textPrimary" className={classes.content}>
                        <strong className={classes.author}>
                            {record.author.fullName ||
                                translate(`ra-audit-log.author`, record.author)}
                        </strong>
                        <span className={classes.action}>{actionLabel}</span>
                    </Typography>
                }
                secondary={new Date(record.date).toLocaleString(locale)}
            />
        </ListItem>
    );
};

const useStyles = makeStyles(
    theme => ({
        root: {
            '&:hover': {
                backgroundColor: theme.palette.action.hover,
            },
        },
        content: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        author: {
            marginRight: theme.spacing(0.5),
        },
        action: {},
    }),
    {
        name: 'RaTimelineItem',
    }
);

export interface TimelineItemProps extends ListItemProps {
    className?: string;
    classes?: ClassesOverride<typeof useStyles>;
    record?: EventRecord;
    link?: LinkType;
}
