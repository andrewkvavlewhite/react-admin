import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { shallowEqual, useSelector } from 'react-redux';
import inflection from 'inflection';
import { makeStyles, useMediaQuery, Theme } from '@material-ui/core';
import DefaultIcon from '@material-ui/icons/ViewList';
import classnames from 'classnames';
import {
    MenuProps,
    getResources,
    useTranslate,
    Translate,
    ReduxState,
    DashboardMenuItem,
} from 'react-admin';
import RealTimeMenuItemLink from './RealTimeMenuItemLink';

/**
 * <Menu> equivalent, but with real-time update counts in badges
 *
 * @example
 *
 * import { RealTimeMenu } from '@react-admin/ra-realtime'
 *
 * const CustomLayout: FC = (props) => (<Layout {...props} menu={RealTimeMenu} />;
 *
 * const MyAdmin = props => (
 *     <Admin
 *         dataProvider={realTimeDataProvider}
 *         layout={CustomLayout}
 *         i18nProvider={i18nProvider}
 *     >
 *         <Resource
 *             name="posts"
 *             list={PostList}
 *             show={PostShow}
 *         />
 *     </Admin>
 * );
 */

const useStyles = makeStyles(
    {
        main: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
        },
    },
    { name: 'RaMenu' }
);

const translatedResourceName = (resource: any, translate: Translate): string =>
    translate(`resources.${resource.name}.name`, {
        smart_count: 2,
        _:
            resource.options && resource.options.label
                ? translate(resource.options.label, {
                      smart_count: 2,
                      _: resource.options.label,
                  })
                : inflection.humanize(inflection.pluralize(resource.name)),
    });

// This component is a copy of Menu with some specific changes for the badges
const RealTimeMenu: FC<MenuProps> = props => {
    const {
        classes: classesOverride,
        className,
        dense,
        hasDashboard,
        onMenuClick,
        logout,
        ...rest
    } = props;
    const translate = useTranslate();
    const classes = useStyles(props);
    const isXSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('xs')
    );
    const open = useSelector((state: ReduxState) => state.admin.ui.sidebarOpen);
    const resources = useSelector(getResources, shallowEqual) as Array<any>;

    // Used to force redraw on navigation
    useSelector((state: ReduxState) => state.router.location.pathname);

    return (
        <div className={classnames(classes.main, className)} {...rest}>
            {hasDashboard && (
                <DashboardMenuItem
                    onClick={onMenuClick}
                    dense={dense}
                    sidebarIsOpen={open}
                />
            )}
            {/* Usage of RealTimeMenuItemLink instead of MenuItemLink*/}
            {resources
                .filter(r => r.hasList)
                .map(resource => (
                    <RealTimeMenuItemLink
                        key={resource.name}
                        to={`/${resource.name}`}
                        primaryText={translatedResourceName(
                            resource,
                            translate
                        )}
                        leftIcon={
                            resource.icon ? <resource.icon /> : <DefaultIcon />
                        }
                        resource={resource.name}
                        onClick={onMenuClick}
                        dense={dense}
                        sidebarIsOpen={open}
                    />
                ))}
            {isXSmall && logout}
        </div>
    );
};

RealTimeMenu.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    dense: PropTypes.bool,
    hasDashboard: PropTypes.bool,
    logout: PropTypes.element,
    onMenuClick: PropTypes.func,
};

RealTimeMenu.defaultProps = {
    onMenuClick: (): void => null,
};

export default RealTimeMenu;
