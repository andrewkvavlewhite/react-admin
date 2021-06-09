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
import * as React from 'react';
import { Datagrid, DateField, ListContextProvider, ListView, useListController, } from 'react-admin';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AuthorField } from '../AuthorField';
import { TimelineList } from '../Timeline';
import { ActionField } from '../ActionField';
import { ResourceField } from '../ResourceField';
import { EventListFilter } from './EventListFilter';
import { EventFilterAside } from './EventFilterAside';
import { useGetActionLink } from '../useGetActionLink';
/**
 * A pre-configured List for event logs. Provides adequate views and filters.
 * @param props
 */
export var EventList = function (props) {
    var authorResource = props.authorResource, dateFilters = props.dateFilters, eventResource = props.eventResource, rest = __rest(props, ["authorResource", "dateFilters", "eventResource"]);
    var controllerProps = useListController(__assign({ sort: { field: 'date', order: 'desc' } }, props));
    var isSmall = useMediaQuery(function (theme) { return theme.breakpoints.down('sm'); });
    var getActionLink = useGetActionLink();
    var handleRowClick = function (id, basePath, record) {
        return getActionLink(record);
    };
    return (React.createElement(ListContextProvider, { value: controllerProps },
        React.createElement(ListView, __assign({ component: isSmall ? EventListSmallContent : undefined, bulkActionButtons: false, aside: isSmall ? undefined : (React.createElement(EventFilterAside, { authorResource: authorResource, dateFilters: dateFilters, eventResource: eventResource })), filters: isSmall ? (React.createElement(EventListFilter, { authorResource: authorResource, dateFilters: dateFilters, eventResource: eventResource })) : undefined }, rest, controllerProps), isSmall ? (React.createElement(TimelineList, null)) : (React.createElement(Datagrid, { rowClick: handleRowClick },
            React.createElement(DateField, { source: "date" }),
            React.createElement(ResourceField, { source: "resource" }),
            React.createElement(AuthorField, { authorResource: authorResource, source: "author" }),
            React.createElement(ActionField, { source: "action" }))))));
};
var useStyles = makeStyles(function (theme) { return ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: theme.spacing(0.5),
        paddingRight: theme.spacing(0.5),
        width: '100%',
    },
}); });
export var EventListSmallContent = function (props) {
    var classes = useStyles();
    return React.createElement("div", __assign({}, props, { className: classes.root }));
};
