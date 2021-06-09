"use strict";
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("./actions");
var fetchTypes_1 = require("./fetchTypes");
var constants_1 = require("./constants");
var initialState = {};
/**
 * Reducer for Tree state
 *
 * Store, for each resource with a tree, 2 objects:
 *  - nodes: a list of nodes indexd by id, containing an array of child ids
 *  - expanded: an array of the expanded ids
 *
 * @example
 *
 * tree: {
 *   categories: {
 *     nodes: {
 *       '1': [2,6],
 *       '2': [3],
 *       '3': [4,5],
 *       '4': [],
 *       '5': [],
 *       '6': [7,10,11],
 *       '7': [8,9],
 *       '8': [],
 *       '9': [],
 *       '10': [],
 *       '11': []
 *     },
 *     expanded: []
 *   }
 */
var treeReducer = function (state, _a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
    if (state === void 0) { state = initialState; }
    var type = _a.type, payload = _a.payload, requestPayload = _a.requestPayload, meta = _a.meta;
    if (!meta || !meta.resource) {
        return state;
    }
    var resourceState = state[meta.resource] || {
        nodes: undefined,
        expanded: [],
    };
    // handling node expansion
    if (type === actions_1.CHANGE_EXPANDED_NODES) {
        return __assign(__assign({}, state), (_b = {}, _b[meta.resource] = __assign(__assign({}, resourceState), { expanded: payload.map(String) }), _b));
    }
    if (type === actions_1.EXPAND_NODE) {
        if (resourceState.expanded.includes(payload)) {
            // already expanded
            return state;
        }
        // rc-tree should also expand ancestors but for some reasons it doesn't
        // determine all the ancestors that must be opened
        var newExpanded = [];
        var current_1 = payload;
        do {
            newExpanded = newExpanded.concat(String(current_1));
            current_1 = Object.keys(resourceState.nodes)
                .filter(function (id) {
                return resourceState.nodes[id].some(function (item) { return item == current_1; });
            })
                .pop();
        } while (current_1);
        // expand all these nodes
        return __assign(__assign({}, state), (_c = {}, _c[meta.resource] = __assign(__assign({}, resourceState), { expanded: resourceState.expanded.concat(newExpanded) }), _c));
    }
    // handling local node insertion
    if (type === actions_1.ADD_UNSAVED_ROOT_NODE) {
        return __assign(__assign({}, state), (_d = {}, _d[meta.resource] = __assign(__assign({}, resourceState), { nodes: __assign(__assign({}, (resourceState.nodes || {})), (_e = {}, _e[constants_1.UNSAVED_NEW_NODE] = [], _e)) }), _d));
    }
    if (type === actions_1.REMOVE_UNSAVED_ROOT_NODE) {
        var _t = resourceState.nodes, _u = constants_1.UNSAVED_NEW_NODE, _ = _t[_u], nodes = __rest(_t, [typeof _u === "symbol" ? _u : _u + ""]);
        return __assign(__assign({}, state), (_f = {}, _f[meta.resource] = __assign(__assign({}, resourceState), { nodes: nodes }), _f));
    }
    if (type === 'RA/CRUD_DELETE_OPTIMISTIC') {
        if (typeof resourceState.nodes !== 'undefined') {
            console.warn("A record from a tree resource should not be deleted using the dataProvider.delete method. Please use dataProvider.deleteBranch instead.");
        }
        return state;
    }
    if (type === 'RA/CRUD_DELETE_BRANCH_OPTIMISTIC') {
        var nodesToRemove_1 = getNodesToRemove(resourceState.nodes, payload.id);
        return __assign(__assign({}, state), (_g = {}, _g[meta.resource] = {
            expanded: resourceState.expanded.filter(function (id) { return !nodesToRemove_1.some(function (idToRemove) { return id == idToRemove; }); }),
            nodes: Object.keys(resourceState.nodes)
                .filter(function (id) {
                return !nodesToRemove_1.some(function (idToRemove) { return id == idToRemove; });
            })
                .reduce(function (acc, curr) {
                acc[curr] = resourceState.nodes[curr].filter(function (id) {
                    return !nodesToRemove_1.some(function (idToRemove) { return id == idToRemove; });
                });
                return acc;
            }, {}),
        }, _g));
    }
    if (type === actions_1.ADD_UNSAVED_CHILD_NODE) {
        return __assign(__assign({}, state), (_h = {}, _h[meta.resource] = __assign(__assign({}, resourceState), { nodes: __assign(__assign({}, (resourceState.nodes || {})), (_j = {}, _j[payload.parentId] = resourceState.nodes[payload.parentId].concat(constants_1.UNSAVED_NEW_NODE), _j[constants_1.UNSAVED_NEW_NODE] = [], _j)), 
            // expand parent id not expanded
            expanded: resourceState.expanded.includes(payload.parentId)
                ? resourceState.expanded
                : resourceState.expanded.concat(String(payload.parentId)) }), _h));
    }
    if (type === actions_1.REMOVE_UNSAVED_CHILD_NODE) {
        var _v = resourceState.nodes, _w = constants_1.UNSAVED_NEW_NODE, _ = _v[_w], nodes = __rest(_v, [typeof _w === "symbol" ? _w : _w + ""]);
        var children = nodes[payload.parentId].filter(function (e) { return e !== constants_1.UNSAVED_NEW_NODE; });
        return __assign(__assign({}, state), (_k = {}, _k[meta.resource] = __assign(__assign({}, resourceState), { nodes: __assign(__assign({}, nodes), (_l = {}, _l[payload.parentId] = children, _l)) }), _k));
    }
    if (!meta.fetchResponse) {
        return state;
    }
    // handling dataProvider response
    switch (meta.fetchResponse) {
        case fetchTypes_1.GET_TREE:
            return __assign(__assign({}, state), (_m = {}, _m[meta.resource] = __assign(__assign({}, resourceState), { nodes: __assign({}, payload.data.reduce(function (acc, node) {
                    acc[node.id] = node.children;
                    return acc;
                }, {})) }), _m));
        case fetchTypes_1.GET_ROOT_NODES:
        case fetchTypes_1.GET_CHILD_NODES:
            return __assign(__assign({}, state), (_o = {}, _o[meta.resource] = __assign(__assign({}, resourceState), { nodes: __assign(__assign({}, (resourceState.nodes || {})), payload.data.reduce(function (acc, node) {
                    acc[node.id] = node.children;
                    return acc;
                }, {})) }), _o));
        case fetchTypes_1.ADD_ROOT_NODE:
            return __assign(__assign({}, state), (_p = {}, _p[meta.resource] = __assign(__assign({}, resourceState), { nodes: __assign(__assign({}, (resourceState.nodes || {})), (_q = {}, _q[payload.data.id] = [], _q)) }), _p));
        case fetchTypes_1.ADD_CHILD_NODE:
            return __assign(__assign({}, state), (_r = {}, _r[meta.resource] = __assign(__assign({}, resourceState), { nodes: __assign(__assign({}, (resourceState.nodes || {})), (_s = {}, _s[requestPayload.parentId] = resourceState.nodes[requestPayload.parentId].concat(payload.data.id), _s[payload.data.id] = [], _s)) }), _r));
        default:
            return state;
    }
};
exports.default = treeReducer;
var getNodesToRemove = function (nodes, nodeId) {
    var children = nodes[nodeId];
    var ids = (children || []).reduce(function (acc, child) { return __spreadArrays(acc, getNodesToRemove(nodes, child)); }, []);
    ids.push(nodeId);
    return ids;
};
