import * as React from 'react';
import { isValidElement, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Exporter, ClassesOverride } from 'react-admin';
import { BreadcrumbProps } from '@react-admin/ra-navigation';

const ListToolbar = (props: ListToolbarProps): ReactElement => {
    const { classes: classesOverride, filters, actions, ...rest } = props;
    const classes = useStyles(props);

    return (
        <>
            <Toolbar className={classes.toolbar}>
                {isValidElement(actions) &&
                    React.cloneElement(actions, {
                        ...rest,
                        className: classes.actions,
                        filters,
                        ...actions.props,
                    })}
            </Toolbar>
            {filters &&
                React.cloneElement(filters, {
                    ...rest,
                    context: 'form',
                })}
        </>
    );
};

ListToolbar.propTypes = {
    breadcrumb: PropTypes.element,
    classes: PropTypes.object,
    filters: PropTypes.element,
    actions: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
    exporter: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};

export interface ListToolbarProps
    extends Omit<ToolbarProps, 'classes' | 'onSelect'> {
    actions?: ReactElement | boolean;
    breadcrumb?: ReactElement<BreadcrumbProps>;
    classes?: ClassesOverride<typeof useStyles>;
    filters?: ReactElement;
    exporter?: Exporter | boolean;
}

const useStyles = makeStyles(
    theme => ({
        toolbar: {
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingRight: 0,
            [theme.breakpoints.up('xs')]: {
                paddingLeft: 0,
            },
            [theme.breakpoints.down('xs')]: {
                paddingLeft: theme.spacing(2),
                backgroundColor: theme.palette.background.paper,
            },
        },
        actions: {
            alignItems: 'center',
            paddingTop: theme.spacing(3),
            minHeight: theme.spacing(5),
            [theme.breakpoints.down('xs')]: {
                padding: theme.spacing(1),
                backgroundColor: theme.palette.background.paper,
            },
            width: '100%',
        },
    }),
    { name: 'RaListToolbar' }
);

export default React.memo(ListToolbar);
