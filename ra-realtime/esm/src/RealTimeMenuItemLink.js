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
import React, { forwardRef, cloneElement, useCallback, useState, useEffect, } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import { MenuItem, ListItemIcon, Tooltip, Badge } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useSubscribeToRecordList } from './dataProvider';
/**
 * <MenuItemLink> equivalent, but with real-time update counts in badges
 *
 * @example
 *
 * import { RealTimeMenuItemLink } from '@react-admin/ra-realtime'
 *
 * const CustomMenu = ({ onMenuClick, logout }) => {
 *   const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));
 *   const open = useSelector(state => state.admin.ui.sidebarOpen);
 *   const resources = useSelector(getResources);
 *   return (
 *       <div>
 *           {resources.map(resource => (
 *               <RealTimeMenuItemLink
 *                   key={resource.name}
 *                   to={`/${resource.name}`}
 *                   primaryText={resource.options && resource.options.label || resource.name}
 *                   leftIcon={createElement(resource.icon)}
 *                   resource={resource.name}
 *                   badgeColor={'primary'}
 *                   onClick={onMenuClick}
 *                   sidebarIsOpen={open}
 *               />
 *           ))}
 *           <RealTimeMenuItemLink
 *               to="/custom-route"
 *               primaryText="Miscellaneous"
 *               leftIcon={<LabelIcon />}
 *               resource={resource.name}
 *               badgeColor={'error'}
 *               onClick={onMenuClick}
 *               sidebarIsOpen={open}
 *           />
 *           {isXSmall && logout}
 *       </div>
 *   );
 * }
 */
// This component is a copy of MenuItemLink with some specific changes for the badges
var RealTimeMenuItemLink = forwardRef(function (props, ref) {
    var classesOverride = props.classes, className = props.className, primaryText = props.primaryText, leftIcon = props.leftIcon, resource = props.resource, _a = props.badgeColor, badgeColor = _a === void 0 ? 'error' : _a, onClick = props.onClick, sidebarIsOpen = props.sidebarIsOpen, rest = __rest(props, ["classes", "className", "primaryText", "leftIcon", "resource", "badgeColor", "onClick", "sidebarIsOpen"]);
    var classes = useStyles(props);
    var location = useLocation();
    var _b = useState(0), countEvent = _b[0], setCountEvent = _b[1];
    useSubscribeToRecordList(resource, function (event) {
        var count = event.payload.ids.length;
        if (isMenuActive(location, props)) {
            var activeRecordId_1 = getActiveRecordIdFromRoute(location, props);
            if (activeRecordId_1 == null) {
                return;
            }
            count = event.payload.ids.filter(function (id) { return "" + id !== activeRecordId_1; }).length;
        }
        if (count) {
            setCountEvent(function (previous) { return previous + count; });
        }
    });
    useEffect(function () {
        // Reset the counter when the Menu path is the current path (i.e. when the resource List is displayed)
        if (location.pathname === props.to) {
            setCountEvent(0);
        }
    }, [location, props.to]);
    var handleMenuTap = useCallback(function (e) {
        onClick && onClick(e);
    }, [onClick]);
    var renderMenuItem = function () {
        return (React.createElement(MenuItem, __assign({ className: classnames(classes.root, className), activeClassName: classes.active, component: NavLinkRef, ref: ref }, rest, { onClick: handleMenuTap }), leftIcon ? (React.createElement(React.Fragment, null,
            React.createElement(StyledBadgeForIcon, { badgeContent: countEvent, color: badgeColor },
                React.createElement(ListItemIcon, { className: classes.icon }, cloneElement(leftIcon, {
                    titleAccess: primaryText,
                }))),
            primaryText)) : (React.createElement(StyledBadgeForText, { badgeContent: countEvent, color: badgeColor }, primaryText))));
    };
    if (sidebarIsOpen) {
        return renderMenuItem();
    }
    return (React.createElement(Tooltip, { title: primaryText, placement: "right" }, renderMenuItem()));
});
RealTimeMenuItemLink.displayName = 'RealTimeMenuItemLink';
RealTimeMenuItemLink.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    leftIcon: PropTypes.element,
    onClick: PropTypes.func,
    primaryText: PropTypes.node,
    resource: PropTypes.string,
    badgeColor: PropTypes.oneOf(['default', 'error', 'primary', 'secondary']),
    staticContext: PropTypes.object,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    sidebarIsOpen: PropTypes.bool,
};
var NavLinkRef = forwardRef(function (props, ref) { return (React.createElement(NavLink, __assign({ innerRef: ref }, props))); });
NavLinkRef.displayName = 'NavLinkRef';
var useStyles = makeStyles(function (theme) { return ({
    root: {
        color: theme.palette.text.secondary,
    },
    active: {
        color: theme.palette.text.primary,
    },
    icon: { minWidth: theme.spacing(5) },
}); }, { name: 'RaMenuItemLink' });
var StyledBadgeForIcon = withStyles(function (theme) { return ({
    badge: {
        right: 12,
        top: 3,
        border: "1px solid " + theme.palette.background.paper,
        padding: '0 4px',
    },
}); })(Badge);
var StyledBadgeForText = withStyles(function (theme) { return ({
    badge: {
        top: 3,
        border: "1px solid " + theme.palette.background.paper,
        padding: '0 4px',
    },
}); })(Badge);
export var isMenuActive = function (location, menuProps) {
    return location.pathname === menuProps.to ||
        location.pathname.includes(menuProps.to + "/");
};
export var getActiveRecordIdFromRoute = function (_a, _b) {
    var currentPath = _a.pathname;
    var menuPath = _b.to;
    var startIndex = currentPath.indexOf(menuPath.toString()) +
        menuPath.toString().length +
        1;
    var endIndex = currentPath.indexOf('/', startIndex);
    if (endIndex === -1) {
        endIndex = currentPath.length;
    }
    if (endIndex <= startIndex) {
        return null;
    }
    return currentPath.substring(startIndex, endIndex);
};
export default RealTimeMenuItemLink;
