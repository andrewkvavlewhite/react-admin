import * as React from 'react';
import { ReactElement } from 'react';
import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ClassesOverride, FilterLiveSearch } from 'react-admin';
import classnames from 'classnames';
import { GetDateFilter } from './types';
import { AuthorFilterList } from './AuthorFilterList';
import { EventDateFilterList } from './EventDateFilterList';
import { ResourceFilterList } from './ResourceFilterList';

/**
 * Includes all the default filters for the EventList in a component usable in an aside sidebar.
 * @param props The component props
 * @param {string} props.authorResource Optional. The name of the resource for authors.
 * @param {string} props.className Optional. A css class name.
 * @param {object} props.classes Optional. An object of styles from material-ui hook built with makeStyles
 * @param {object} props.dateFilters Optional. A map of date filters where the key is the label (which can be a translation key) and the value a function returning a date.
 * @param {string} props.eventsResource Optional. The name of the resource for events. Defaults to `events`
 */
export const EventFilterAside = (
    props: EventFilterAsideProps
): ReactElement => {
    const { authorResource, className, dateFilters, eventResource } = props;
    const classes = useStyles(props);

    return (
        <Card className={classnames(classes.root, className)}>
            <CardContent className={classes.cardContent}>
                <FilterLiveSearch source="q" />
                <EventDateFilterList dateFilters={dateFilters} />
                <ResourceFilterList eventResource={eventResource} />
                <AuthorFilterList authorResource={authorResource} />
            </CardContent>
        </Card>
    );
};

const useStyles = makeStyles(
    theme => ({
        root: {
            [theme.breakpoints.up('sm')]: {
                order: -1, // display on the left rather than on the right of the list
                width: '19em',
                marginRight: '1em',
            },
            [theme.breakpoints.down('sm')]: {
                display: 'none',
            },
        },
        cardContent: {
            display: 'flex',
            flexDirection: 'column',
        },
    }),
    {
        name: 'RaEventFilterAside',
    }
);

export interface EventFilterAsideProps {
    authorResource?: string;
    className?: string;
    classes?: ClassesOverride<typeof useStyles>;
    dateFilters?: Record<string, GetDateFilter>;
    eventResource?: string;
}
