import * as React from 'react';
import { DetailedHTMLProps, HTMLAttributes, ReactElement } from 'react';
import {
    Datagrid,
    DateField,
    ListContextProvider,
    ListProps,
    ListView,
    useListController,
} from 'react-admin';
import { useMediaQuery, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AuthorField } from '../AuthorField';
import { TimelineList } from '../Timeline';
import { ActionField } from '../ActionField';
import { ResourceField } from '../ResourceField';
import { EventListFilter } from './EventListFilter';
import { GetDateFilter } from './types';
import { EventFilterAside } from './EventFilterAside';
import { useGetActionLink } from '../useGetActionLink';

/**
 * A pre-configured List for event logs. Provides adequate views and filters.
 * @param props
 */
export const EventList = (props: EventListProps): ReactElement => {
    const { authorResource, dateFilters, eventResource, ...rest } = props;
    const controllerProps = useListController({
        sort: { field: 'date', order: 'desc' },
        ...props,
    });
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));
    const getActionLink = useGetActionLink();
    const handleRowClick = (id, basePath, record): string | undefined =>
        getActionLink(record);

    return (
        <ListContextProvider value={controllerProps}>
            <ListView
                component={isSmall ? EventListSmallContent : undefined}
                bulkActionButtons={false}
                aside={
                    isSmall ? undefined : (
                        <EventFilterAside
                            authorResource={authorResource}
                            dateFilters={dateFilters}
                            eventResource={eventResource}
                        />
                    )
                }
                filters={
                    isSmall ? (
                        <EventListFilter
                            authorResource={authorResource}
                            dateFilters={dateFilters}
                            eventResource={eventResource}
                        />
                    ) : undefined
                }
                {...rest}
                {...controllerProps}
            >
                {isSmall ? (
                    <TimelineList />
                ) : (
                    <Datagrid rowClick={handleRowClick}>
                        <DateField source="date" />
                        <ResourceField source="resource" />
                        <AuthorField
                            authorResource={authorResource}
                            source="author"
                        />
                        <ActionField source="action" />
                    </Datagrid>
                )}
            </ListView>
        </ListContextProvider>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: theme.spacing(0.5),
        paddingRight: theme.spacing(0.5),
        width: '100%',
    },
}));

interface EventListProps extends ListProps {
    authorResource?: string;
    dateFilters?: Record<string, GetDateFilter>;
    eventResource?: string;
}

export const EventListSmallContent = (
    props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
): ReactElement => {
    const classes = useStyles();

    return <div {...props} className={classes.root} />;
};
