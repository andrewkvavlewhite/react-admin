import * as React from 'react';
import { Children, cloneElement, ReactElement } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import {
    ComponentPropType,
    defaultExporter,
    ListControllerProps,
    useListContext,
    getListControllerProps,
    useVersion,
    sanitizeListRestProps,
} from 'ra-core';

import {
    Title,
    TitlePropType,
    Pagination as DefaultPagination,
    BulkDeleteButton,
    BulkActionsToolbar,
    ListProps,
} from 'react-admin';

import Empty from 'ra-ui-materialui/esm/list/Empty';
import { ListActions } from './ListActions';
import ListToolbar from './ListToolbar';

export const ListView = (props: ListViewProps): ReactElement => {
    const {
        actions,
        aside,
        bulkActionButtons,
        children,
        classes: classesOverride,
        className,
        component: Content,
        empty,
        exporter = defaultExporter,
        filters,
        pagination,
        title,
        hasList,
        hasEdit,
        hasShow,
        hasCreate,
        syncWithLocation,
        ...rest
    } = props;
    const controllerProps = getListControllerProps(props); // deprecated, to be removed in v4
    const listContext = useListContext(props);
    const classes = useStyles(props);
    const {
        defaultTitle,
        total,
        loaded,
        loading,
        filterValues,
        selectedIds,
    } = listContext;
    const version = useVersion();

    const renderList = (): ReactElement => (
        <>
            {(filters || actions) && (
                <ListToolbar
                    filters={filters}
                    {...controllerProps} // deprecated, use ListContext instead, to be removed in v4
                    actions={actions}
                    exporter={exporter} // deprecated, use ListContext instead, to be removed in v4
                />
            )}
            <div className={classes.main}>
                <Content
                    className={classnames(classes.content, {
                        [classes.bulkActionsDisplayed]: selectedIds.length > 0,
                    })}
                    key={version}
                >
                    {bulkActionButtons !== false && bulkActionButtons && (
                        <BulkActionsToolbar {...controllerProps}>
                            {bulkActionButtons}
                        </BulkActionsToolbar>
                    )}
                    {children &&
                        cloneElement(Children.only(children), {
                            ...controllerProps, // deprecated, use ListContext instead, to be removed in v4
                            hasBulkActions: bulkActionButtons !== false,
                        })}
                    {pagination && cloneElement(pagination, listContext)}
                </Content>
                {aside && cloneElement(aside, listContext)}
            </div>
        </>
    );

    const shouldRenderEmptyPage =
        loaded && !loading && total === 0 && !Object.keys(filterValues).length;

    return (
        <div
            className={classnames('list-page', classes.root, className)}
            {...sanitizeListRestProps(rest)}
        >
            <Title title={title} defaultTitle={defaultTitle} />
            {shouldRenderEmptyPage && empty !== false
                ? cloneElement(empty, listContext)
                : renderList()}
        </div>
    );
};

ListView.propTypes = {
    actions: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
    aside: PropTypes.element,
    basePath: PropTypes.string,
    bulkActionButtons: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
    children: PropTypes.element,
    className: PropTypes.string,
    classes: PropTypes.object,
    component: ComponentPropType,
    currentSort: PropTypes.shape({
        field: PropTypes.string.isRequired,
        order: PropTypes.string.isRequired,
    }),
    data: PropTypes.any,
    defaultTitle: PropTypes.string,
    displayedFilters: PropTypes.object,
    exporter: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    filterDefaultValues: PropTypes.object,
    filters: PropTypes.element,
    filterValues: PropTypes.object,
    hasCreate: PropTypes.bool,
    hideFilter: PropTypes.func,
    ids: PropTypes.array,
    loading: PropTypes.bool,
    onSelect: PropTypes.func,
    onToggleItem: PropTypes.func,
    onUnselectItems: PropTypes.func,
    page: PropTypes.number,
    pagination: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
    perPage: PropTypes.number,
    refresh: PropTypes.func,
    resource: PropTypes.string,
    selectedIds: PropTypes.array,
    setFilters: PropTypes.func,
    setPage: PropTypes.func,
    setPerPage: PropTypes.func,
    setSort: PropTypes.func,
    showFilter: PropTypes.func,
    title: TitlePropType,
    total: PropTypes.number,
    version: PropTypes.number,
};

const DefaultBulkActionButtons = (props): ReactElement => (
    <BulkDeleteButton {...props} />
);

ListView.defaultProps = {
    actions: <ListActions />,
    classes: {},
    component: Card,
    bulkActionButtons: <DefaultBulkActionButtons />,
    pagination: <DefaultPagination />,
    empty: <Empty />,
};

const useStyles = makeStyles(
    theme => ({
        root: {},
        main: {
            display: 'flex',
        },
        content: {
            marginTop: 0,
            transition: theme.transitions.create('margin-top'),
            position: 'relative',
            flex: '1 1 auto',
            [theme.breakpoints.down('xs')]: {
                boxShadow: 'none',
            },
            overflow: 'inherit',
        },
        bulkActionsDisplayed: {
            marginTop: -theme.spacing(8),
            transition: theme.transitions.create('margin-top'),
        },
        actions: {
            zIndex: 2,
            display: 'flex',
            justifyContent: 'flex-end',
            flexWrap: 'wrap',
        },
        noResults: { padding: 20 },
    }),
    { name: 'RaList' }
);

export interface ListViewProps
    extends Omit<
            ListProps,
            'filter' | 'basePath' | 'hasCreate' | 'perPage' | 'resource'
        >,
        ListControllerProps {
    children: ReactElement;
}
