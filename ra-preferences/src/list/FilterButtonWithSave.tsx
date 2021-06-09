import * as React from 'react';
import {
    useState,
    useCallback,
    useRef,
    forwardRef,
    ReactNode,
    ReactElement,
    HtmlHTMLAttributes,
} from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ContentFilter from '@material-ui/icons/FilterList';
import classnames from 'classnames';
import lodashGet from 'lodash/get';
import { useHistory } from 'react-router-dom';
import { stringify } from 'query-string';
import {
    Button,
    ClassesOverride,
    FieldTitle,
    useTranslate,
    useListContext,
} from 'react-admin';

import { useSavedQueries } from './useSavedQueries';
import { AddSavedQueryDialog } from './AddSavedQueryDialog';
import { RemoveSavedQueryDialog } from './RemoveSavedQueryDialog';

const useStyles = makeStyles(
    {
        root: { display: 'inline-block' },
    },
    { name: 'RaFilterButton' }
);

export const FilterButtonWithSave = (
    props: FilterButtonWithSaveProps
): ReactElement => {
    const { filters, className, ...rest } = props;
    const {
        filterValues,
        currentSort,
        perPage,
        displayedFilters = {},
        showFilter,
        resource,
    } = useListContext();
    const translate = useTranslate();
    const [open, setOpen] = useState(false);
    const anchorEl = useRef();
    const classes = useStyles(props);
    const [savedQueries] = useSavedQueries(resource);
    const history = useHistory();

    const hasFilterValues = !isEqual(filterValues, {});
    const hasSavedCurrentQuery = savedQueries.some(savedQuery =>
        isEqual(savedQuery.value, {
            filter: filterValues,
            sort: currentSort,
            perPage,
            displayedFilters,
        })
    );

    const hiddenFilters = filters.filter(
        (filterElement: JSX.Element) =>
            !filterElement.props.alwaysOn &&
            !displayedFilters[filterElement.props.source] &&
            typeof lodashGet(filterValues, filterElement.props.source) ===
                'undefined'
    );

    // menu state
    const handleClickButton = useCallback(
        event => {
            // This prevents ghost click.
            event.preventDefault();
            setOpen(true);
            anchorEl.current = event.currentTarget;
        },
        [anchorEl, setOpen]
    );
    const handleRequestClose = useCallback(() => {
        setOpen(false);
    }, [setOpen]);
    const handleShow = useCallback(
        ({ source, defaultValue }) => {
            showFilter(source, defaultValue);
            setOpen(false);
        },
        [showFilter, setOpen]
    );

    // add query dialog state
    const [addSavedQueryDialogOpen, setAddSavedQueryDialogOpen] = useState(
        false
    );
    const hideAddSavedQueryDialog = (): void => {
        setAddSavedQueryDialogOpen(false);
    };
    const showAddSavedQueryDialog = (): void => {
        setOpen(false);
        setAddSavedQueryDialogOpen(true);
    };

    // remove query dialog state
    const [
        removeSavedQueryDialogOpen,
        setRemoveSavedQueryDialogOpen,
    ] = useState(false);
    const hideRemoveSavedQueryDialog = (): void => {
        setRemoveSavedQueryDialogOpen(false);
    };
    const showRemoveSavedQueryDialog = (): void => {
        setOpen(false);
        setRemoveSavedQueryDialogOpen(true);
    };

    return (
        <div className={classnames(classes.root, className)} {...rest}>
            <Button
                className="add-filter"
                label="ra.action.add_filter"
                onClick={handleClickButton}
            >
                <ContentFilter />
            </Button>
            <Menu
                open={open}
                anchorEl={anchorEl.current}
                onClose={handleRequestClose}
            >
                {hiddenFilters.map((filterElement: JSX.Element) => (
                    <FilterButtonMenuItem
                        key={filterElement.props.source}
                        filter={filterElement}
                        onShow={handleShow}
                        resource={resource}
                    />
                ))}
                {savedQueries.map((savedQuery, index) =>
                    isEqual(savedQuery.value, {
                        filter: filterValues,
                        sort: currentSort,
                        perPage,
                        displayedFilters,
                    }) ? (
                        <MenuItem
                            onClick={showRemoveSavedQueryDialog}
                            key={index}
                        >
                            {translate(
                                'ra-preferences.saved_queries.remove_label_with_name',
                                {
                                    _: 'Remove query "%{name}"',
                                    name: savedQuery.label,
                                }
                            )}
                        </MenuItem>
                    ) : (
                        <MenuItem
                            onClick={(): void => {
                                history.push({
                                    search: stringify({
                                        filter: JSON.stringify(
                                            savedQuery.value.filter
                                        ),
                                        sort: savedQuery.value.sort.field,
                                        order: savedQuery.value.sort.order,
                                        page: 1,
                                        perPage: savedQuery.value.perPage,
                                        displayedFilters: JSON.stringify(
                                            savedQuery.value.displayedFilters
                                        ),
                                    }),
                                });
                                setOpen(false);
                            }}
                            key={index}
                        >
                            {savedQuery.label}
                        </MenuItem>
                    )
                )}
                {hasFilterValues && !hasSavedCurrentQuery ? (
                    <MenuItem onClick={showAddSavedQueryDialog}>
                        {translate('ra-preferences.saved_queries.new_label', {
                            _: 'Save current query...',
                        })}
                    </MenuItem>
                ) : null}
            </Menu>
            <AddSavedQueryDialog
                open={addSavedQueryDialogOpen}
                onClose={hideAddSavedQueryDialog}
            />
            <RemoveSavedQueryDialog
                open={removeSavedQueryDialogOpen}
                onClose={hideRemoveSavedQueryDialog}
            />
        </div>
    );
};

FilterButtonWithSave.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    filters: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export interface FilterButtonWithSaveProps
    extends HtmlHTMLAttributes<HTMLDivElement> {
    classes?: ClassesOverride<typeof useStyles>;
    className?: string;
    filters: ReactNode[];
}

// FIXME: remove once react-admin exports FilterButtonMenuItem
// eslint-disable-next-line react/display-name
const FilterButtonMenuItem = forwardRef<any, FilterButtonMenuItemProps>(
    (props, ref) => {
        const { filter, onShow, resource } = props;
        const handleShow = useCallback(() => {
            onShow({
                source: filter.props.source,
                defaultValue: filter.props.defaultValue,
            });
        }, [filter.props.defaultValue, filter.props.source, onShow]);

        return (
            <MenuItem
                className="new-filter-item"
                data-key={filter.props.source}
                data-default-value={filter.props.defaultValue}
                key={filter.props.source}
                onClick={handleShow}
                ref={ref}
            >
                <FieldTitle
                    label={filter.props.label}
                    source={filter.props.source}
                    resource={resource}
                />
            </MenuItem>
        );
    }
);

FilterButtonMenuItem.propTypes = {
    filter: PropTypes.element.isRequired,
    onShow: PropTypes.func.isRequired,
    resource: PropTypes.string.isRequired,
};

interface FilterButtonMenuItemProps {
    filter: JSX.Element;
    onShow: (params: { source: string; defaultValue: any }) => void;
    resource: string;
}
