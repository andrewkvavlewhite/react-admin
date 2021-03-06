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
import { isValidElement } from 'react';
import PropTypes from 'prop-types';
import { Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
var ListToolbar = function (props) {
    var classesOverride = props.classes, filters = props.filters, actions = props.actions, rest = __rest(props, ["classes", "filters", "actions"]);
    var classes = useStyles(props);
    return (React.createElement(React.Fragment, null,
        React.createElement(Toolbar, { className: classes.toolbar }, isValidElement(actions) &&
            React.cloneElement(actions, __assign(__assign(__assign({}, rest), { className: classes.actions, filters: filters }), actions.props))),
        filters &&
            React.cloneElement(filters, __assign(__assign({}, rest), { context: 'form' }))));
};
ListToolbar.propTypes = {
    breadcrumb: PropTypes.element,
    classes: PropTypes.object,
    filters: PropTypes.element,
    actions: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
    exporter: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};
var useStyles = makeStyles(function (theme) {
    var _a, _b;
    return ({
        toolbar: (_a = {
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                paddingRight: 0
            },
            _a[theme.breakpoints.up('xs')] = {
                paddingLeft: 0,
            },
            _a[theme.breakpoints.down('xs')] = {
                paddingLeft: theme.spacing(2),
                backgroundColor: theme.palette.background.paper,
            },
            _a),
        actions: (_b = {
                alignItems: 'center',
                paddingTop: theme.spacing(3),
                minHeight: theme.spacing(5)
            },
            _b[theme.breakpoints.down('xs')] = {
                padding: theme.spacing(1),
                backgroundColor: theme.palette.background.paper,
            },
            _b.width = '100%',
            _b),
    });
}, { name: 'RaListToolbar' });
export default React.memo(ListToolbar);
