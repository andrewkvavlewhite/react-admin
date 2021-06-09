var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import PropTypes from 'prop-types';
import { shallowEqual, useSelector } from 'react-redux';
import inflection from 'inflection';
import { makeStyles, useMediaQuery } from '@material-ui/core';
import DefaultIcon from '@material-ui/icons/ViewList';
import classnames from 'classnames';
import { getResources, useTranslate, DashboardMenuItem, } from 'react-admin';
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
var useStyles = makeStyles({
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
}, { name: 'RaMenu' });
var translatedResourceName = function (resource, translate) {
    return translate("resources." + resource.name + ".name", {
        smart_count: 2,
        _: resource.options && resource.options.label
            ? translate(resource.options.label, {
                smart_count: 2,
                _: resource.options.label,
            })
            : inflection.humanize(inflection.pluralize(resource.name)),
    });
};
// This component is a copy of Menu with some specific changes for the badges
var RealTimeMenu = function (props) {
    var classesOverride = props.classes, className = props.className, dense = props.dense, hasDashboard = props.hasDashboard, onMenuClick = props.onMenuClick, logout = props.logout, rest = __rest(props, ["classes", "className", "dense", "hasDashboard", "onMenuClick", "logout"]);
    var translate = useTranslate();
    var classes = useStyles(props);
    var isXSmall = useMediaQuery(function (theme) {
        return theme.breakpoints.down('xs');
    });
    var open = useSelector(function (state) { return state.admin.ui.sidebarOpen; });
    var resources = useSelector(getResources, shallowEqual);
    // Used to force redraw on navigation
    useSelector(function (state) { return state.router.location.pathname; });
    return (React.createElement("div", __assign({ className: classnames(classes.main, className) }, rest),
        hasDashboard && (React.createElement(DashboardMenuItem, { onClick: onMenuClick, dense: dense, sidebarIsOpen: open })),
        resources
            .filter(function (r) { return r.hasList; })
            .map(function (resource) { return (React.createElement(RealTimeMenuItemLink, { key: resource.name, to: "/" + resource.name, primaryText: translatedResourceName(resource, translate), leftIcon: resource.icon ? React.createElement(resource.icon, null) : React.createElement(DefaultIcon, null), resource: resource.name, onClick: onMenuClick, dense: dense, sidebarIsOpen: open })); }),
        isXSmall && logout));
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
    onMenuClick: function () { return null; },
};
export default RealTimeMenu;
