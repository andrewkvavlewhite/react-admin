import * as React from 'react';
import PropTypes from 'prop-types';
import { shallowEqual, useSelector } from 'react-redux';
import DashboardIcon from '@material-ui/icons/Dashboard';
import inflection from 'inflection';
import DefaultIcon from '@material-ui/icons/ViewList';
import { getResources, useTranslate } from 'react-admin';
import { MenuItemCategory, MultiLevelMenu } from '@react-admin/ra-navigation';
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
var Menu = function (_a) {
    var hasDashboard = _a.hasDashboard;
    var translate = useTranslate();
    var resources = useSelector(getResources, shallowEqual);
    return (React.createElement(MultiLevelMenu, { variant: "categories" },
        hasDashboard && (React.createElement(MenuItemCategory, { name: "dashboard", to: "/", exact: true, label: "Dashboard", icon: React.createElement(DashboardIcon, null) })),
        resources
            .filter(function (r) { return r.hasList; })
            .map(function (resource) { return (React.createElement(MenuItemCategory, { key: resource.name, name: resource.name, to: "/" + resource.name, exact: true, label: translatedResourceName(resource, translate), icon: resource.icon ? React.createElement(resource.icon, null) : React.createElement(DefaultIcon, null) })); })));
};
Menu.propTypes = {
    hasDashboard: PropTypes.bool,
};
export default Menu;
