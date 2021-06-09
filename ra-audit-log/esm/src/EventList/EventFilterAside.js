import * as React from 'react';
import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FilterLiveSearch } from 'react-admin';
import classnames from 'classnames';
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
export var EventFilterAside = function (props) {
    var authorResource = props.authorResource, className = props.className, dateFilters = props.dateFilters, eventResource = props.eventResource;
    var classes = useStyles(props);
    return (React.createElement(Card, { className: classnames(classes.root, className) },
        React.createElement(CardContent, { className: classes.cardContent },
            React.createElement(FilterLiveSearch, { source: "q" }),
            React.createElement(EventDateFilterList, { dateFilters: dateFilters }),
            React.createElement(ResourceFilterList, { eventResource: eventResource }),
            React.createElement(AuthorFilterList, { authorResource: authorResource }))));
};
var useStyles = makeStyles(function (theme) {
    var _a;
    return ({
        root: (_a = {},
            _a[theme.breakpoints.up('sm')] = {
                order: -1,
                width: '19em',
                marginRight: '1em',
            },
            _a[theme.breakpoints.down('sm')] = {
                display: 'none',
            },
            _a),
        cardContent: {
            display: 'flex',
            flexDirection: 'column',
        },
    });
}, {
    name: 'RaEventFilterAside',
});
