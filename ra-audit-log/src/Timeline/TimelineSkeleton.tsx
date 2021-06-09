import * as React from 'react';
import { ReactElement } from 'react';
import {
    Card,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ClassesOverride, useTranslate } from 'react-admin';
import { TimelinePlaceholder } from './TimelinePlaceholder';
import { EventAvatar } from '../EventAvatar';

export const TimelineSkeleton = (
    props: TimelineSkeletonProps
): ReactElement => {
    const classes = useStyles(props);
    const translate = useTranslate();

    return (
        <div
            className={classes.root}
            aria-disabled={true}
            aria-label={translate('ra.message.loading')}
        >
            <div>
                {times(2, key1 => (
                    <div key={key1}>
                        <TimelinePlaceholder className={classes.subTitle} />
                        <Card className={classes.card}>
                            <List>
                                {times(5, key2 => (
                                    <ListItem key={key2}>
                                        <ListItemAvatar>
                                            <EventAvatar />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={<TimelinePlaceholder />}
                                            secondary={<TimelinePlaceholder />}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

const useStyles = makeStyles(
    theme => ({
        root: {
            width: 600,
            margin: 'auto',
        },
        card: {
            marginTop: theme.spacing(0.5),
            marginBottom: theme.spacing(1),
        },
        subTitle: {
            width: '60%',
            paddingBottom: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    }),
    {
        name: 'RaTimelineSkeleton',
    }
);

const times = (
    nbChildren: number,
    fn: (key?: number) => ReactElement
): ReactElement[] => Array.from({ length: nbChildren }, (_, key) => fn(key));

export interface TimelineSkeletonProps {
    classes?: ClassesOverride<typeof useStyles>;
    length?: number;
}
