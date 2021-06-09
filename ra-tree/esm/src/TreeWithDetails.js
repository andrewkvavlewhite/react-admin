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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
import { cloneElement, useMemo, } from 'react';
import PropTypes from 'prop-types';
import { linkToRecord, WithPermissions, CreateButton, ComponentPropType, Title, } from 'react-admin';
import { useHistory, useLocation, Switch, Route } from 'react-router-dom';
import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Tree } from './Tree';
import { useTreeController } from './controllers';
import { UNSAVED_NEW_NODE } from './constants';
import DefaultNodeActions from './NodeActions';
import { useGetChildNodesCallback } from './dataProvider';
/**
 * Main Tree component, to be used instead of List in a Resource.
 *
 * You MUST include the tree reducer in the Admin for this component to work. Also,
 * the dataProvider must support tree methods, e.g. getTree, moveAsNthSiblingOf, etc.
 *
 * @example
 *
 * import React, { ComponentProps, FC } from 'react';
 * import { Admin, Resource, List, ListGuesser } from 'react-admin';
 * import { reducer as tree, TreeWithDetails } from '@react-admin/ra-tree';
 *
 * // tree-augmented dataProvider
 * import dataProvider from './dataProvider';
 * import i18nProvider from './i18nProvider';
 *
 * const CategoriesEdit: FC = props => (
 *     <Edit {...props}>
 *         <SimpleForm>
 *             <TextInput source="name" />
 *         </SimpleForm>
 *     </Edit>
 * );
 *
 * const CategoriesList: FC<Props> = props => (
 *     <TreeWithDetails
 *         titleField="name"
 *         edit={CategoriesEdit}
 *         draggable
 *         showLine
 *         {...props}
 *     />
 * );
 *
 * type Props = ComponentProps<typeof List>;
 *
 * export const App: FC = () => (
 *     <Admin
 *         dataProvider={dataProvider}
 *         i18nProvider={i18nProvider}
 *         customReducers={{ tree }}
 *     >
 *         <Resource name="categories" list={CategoriesList} />
 *         <Resource name="products" list={ListGuesser} />
 *     </Admin>
 * );
 */
export var TreeWithDetails = function (_a) {
    var _b = _a.allowMultipleRoots, allowMultipleRoots = _b === void 0 ? false : _b, basePath = _a.basePath, create = _a.create, edit = _a.edit, hideRootNodes = _a.hideRootNodes, _c = _a.lazy, lazy = _c === void 0 ? false : _c, _d = _a.linkTo, linkTo = _d === void 0 ? 'edit' : _d, _e = _a.nodeActions, nodeActions = _e === void 0 ? React.createElement(DefaultNodeActions, null) : _e, resource = _a.resource, show = _a.show, showLine = _a.showLine, title = _a.title, _f = _a.titleField, titleField = _f === void 0 ? 'title' : _f, props = __rest(_a, ["allowMultipleRoots", "basePath", "create", "edit", "hideRootNodes", "lazy", "linkTo", "nodeActions", "resource", "show", "showLine", "title", "titleField"]);
    var classes = useStyles();
    var history = useHistory();
    var location = useLocation();
    // find id in location to set it as selected
    // location can be /posts, /posts/123, or /posts/123/show, or /posts/create
    var pattern = new RegExp(basePath + "/([^/]*)/*.*");
    var matches = pattern.exec(location.pathname);
    var idInLocation = matches && matches[1];
    var defaultSelectedKeys = useMemo(function () {
        return idInLocation && idInLocation !== 'create'
            ? [idInLocation]
            : [UNSAVED_NEW_NODE];
    }, [idInLocation]);
    var _g = useTreeController({
        hideRootNodes: hideRootNodes,
        lazy: lazy,
        resource: resource,
        titleField: titleField,
    }), defaultTitle = _g.defaultTitle, tree = _g.tree, loaded = _g.loaded, expandedKeys = _g.expandedKeys, handleDrop = _g.handleDrop, handleExpand = _g.handleExpand;
    var getChildNodes = useGetChildNodesCallback(resource);
    var handleClick = function (event, treeNode) {
        history.push(linkToRecord(basePath, treeNode.id, linkTo));
    };
    var handleLoadData = function (node) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getChildNodes(node.id)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    if (!loaded) {
        return null;
    }
    var canCreateNode = !tree || tree.length === 0 || allowMultipleRoots;
    return (React.createElement("div", { className: classes.container },
        React.createElement("div", { className: classes.cardTree },
            React.createElement(Card, null,
                React.createElement(CardContent, null,
                    React.createElement(Tree, __assign({ treeData: tree, onDrop: handleDrop, onExpand: handleExpand, onClick: handleClick, expandedKeys: expandedKeys, selectedKeys: defaultSelectedKeys, showLine: showLine, nodeActions: cloneElement(nodeActions, __assign({ basePath: basePath,
                            resource: resource }, nodeActions.props)), loadData: lazy ? handleLoadData : undefined }, sanitizeRestProps(props))),
                    canCreateNode && (React.createElement(CreateButton, { label: "ra-tree.action.add_root", basePath: basePath }))))),
        React.createElement("div", { className: classes.actionCard },
            React.createElement(Switch, null,
                create && (React.createElement(Route, { path: basePath + "/create", render: function (routeProps) { return (React.createElement(WithPermissions, __assign({ component: create, basePath: basePath, resource: resource }, routeProps))); } })),
                show && (React.createElement(Route, { path: basePath + "/:id/show", render: function (routeProps) { return (React.createElement(WithPermissions, __assign({ component: show, basePath: basePath, resource: resource, id: decodeURIComponent(routeProps.match
                            .params.id) }, routeProps, props))); } })),
                edit && (React.createElement(Route, { path: basePath + "/:id", render: function (routeProps) { return (React.createElement(WithPermissions, __assign({ component: edit, basePath: basePath, resource: resource, id: decodeURIComponent(routeProps.match
                            .params.id) }, routeProps))); } })),
                React.createElement(Route, { path: basePath, render: function () { return (React.createElement(Title, { title: title, defaultTitle: defaultTitle })); } })))));
};
var sanitizeRestProps = function (_a) {
    var permission = _a.permission, basePath = _a.basePath, history = _a.history, location = _a.location, match = _a.match, options = _a.options, hasList = _a.hasList, hasEdit = _a.hasEdit, hasShow = _a.hasShow, hasCreate = _a.hasCreate, rest = __rest(_a, ["permission", "basePath", "history", "location", "match", "options", "hasList", "hasEdit", "hasShow", "hasCreate"]);
    return rest;
};
TreeWithDetails.propTypes = {
    basePath: PropTypes.string.isRequired,
    edit: ComponentPropType,
    create: ComponentPropType,
    resource: PropTypes.string.isRequired,
};
export default TreeWithDetails;
var useStyles = makeStyles({
    actionCard: {
        width: '100%',
    },
    cardTree: {
        minWidth: '300px',
        marginTop: '1em',
        marginRight: '1em',
    },
    container: {
        display: 'flex',
    },
});
