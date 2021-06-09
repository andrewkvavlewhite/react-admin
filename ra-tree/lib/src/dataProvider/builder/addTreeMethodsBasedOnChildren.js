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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var deleteBranchByDeletingAllChildren_1 = __importDefault(require("./deleteBranchByDeletingAllChildren"));
var deleteBranchByDeletingNode_1 = __importDefault(require("./deleteBranchByDeletingNode"));
/**
 * Provided the records contain an array of children ids,
 * augment a dataProvider by adding the Tree methods (getTree, getRootNodes, etc).
 *
 * These methods will call regular dataProvider methods (getList, getOne, update).
 *
 * @warning Do not use in production.
 *
 * The added Tree methods call the API way too much, sometimes asking for the
 * entire tree. In practice, you should implement an optimized API route for
 * each of the Tree methods.
 *
 * @example // Compatible APIs should return records like
 * {
 *     id: 1234,
 *     name: 'hello',
 *     isRoot: false,
 *     children: [45, 356, 1],
 * }
 *
 * @param {DataProvider} dataProvider The dataProvider to augment
 * @param {string} childrenField The name of the field containing the children ids. Defaults to 'children'
 * @param {string} isRootField The name of the field containing the root status. Defaults to 'isRoot'
 * @param {boolean} apiSupportBranchDeletion Indicates whether the API will handle children deletion when deleting a node as well as the parent update. If false, the dataProvider will handle it by making multiple requests in the right order. Defaults to `false`.
 */
var addTreeMethodsBasedOnChildren = function (dataProvider, childrenField, isRootField, apiSupportBranchDeletion) {
    if (childrenField === void 0) { childrenField = 'children'; }
    if (isRootField === void 0) { isRootField = 'isRoot'; }
    if (apiSupportBranchDeletion === void 0) { apiSupportBranchDeletion = false; }
    var deleteBranch = apiSupportBranchDeletion
        ? deleteBranchByDeletingNode_1.default
        : deleteBranchByDeletingAllChildren_1.default;
    var treeDataProvider = __assign(__assign({}, dataProvider), { getTree: function (resource) { return __awaiter(void 0, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, dataProvider.getList(resource, {
                            filter: {},
                            sort: { field: 'id', order: 'ASC' },
                            pagination: { page: 1, perPage: 1000 },
                        })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, {
                                data: data,
                            }];
                }
            });
        }); }, getRootNodes: function (resource) { return __awaiter(void 0, void 0, void 0, function () {
            var data;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, dataProvider.getList(resource, {
                            filter: (_a = {}, _a[isRootField] = true, _a),
                            sort: { field: 'id', order: 'ASC' },
                            pagination: { page: 1, perPage: 1000 },
                        })];
                    case 1:
                        data = (_b.sent()).data;
                        return [2 /*return*/, {
                                data: data,
                            }];
                }
            });
        }); }, getParentNode: function (resource, _a) {
            var childId = _a.childId;
            return __awaiter(void 0, void 0, void 0, function () {
                var tree, parent;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, treeDataProvider.getTree(resource)];
                        case 1:
                            tree = (_b.sent()).data;
                            parent = tree.find(function (node) { return node.children.includes(childId); });
                            return [2 /*return*/, {
                                    data: parent,
                                }];
                    }
                });
            });
        }, getChildNodes: function (resource, _a) {
            var parentId = _a.parentId;
            return __awaiter(void 0, void 0, void 0, function () {
                var parent, data, children;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, dataProvider.getOne(resource, {
                                id: parentId,
                            })];
                        case 1:
                            parent = (_b.sent()).data;
                            return [4 /*yield*/, dataProvider.getList(resource, {
                                    filter: { id: parent[childrenField] },
                                    sort: { field: 'id', order: 'ASC' },
                                    pagination: { page: 1, perPage: 1000 },
                                })];
                        case 2:
                            data = (_b.sent()).data;
                            children = parent.children
                                .map(function (id) { return data.find(function (record) { return record.id === id; }); })
                                .filter(function (record) { return !!record; });
                            return [2 /*return*/, {
                                    data: children,
                                }];
                    }
                });
            });
        }, moveAsNthChildOf: function (resource, _a) {
            var source = _a.source, destination = _a.destination, position = _a.position;
            return __awaiter(void 0, void 0, void 0, function () {
                var nodes, sourceParent, children;
                var _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0: return [4 /*yield*/, dataProvider.getList(resource, {
                                filter: {},
                                sort: { field: 'id', order: 'ASC' },
                                pagination: { page: 1, perPage: 1000 },
                            })];
                        case 1:
                            nodes = (_e.sent()).data;
                            sourceParent = nodes
                                .filter(function (node) { return node.children.includes(source.id); })
                                .pop();
                            if (!sourceParent) return [3 /*break*/, 3];
                            return [4 /*yield*/, dataProvider.update(resource, {
                                    id: sourceParent.id,
                                    data: (_b = {},
                                        _b[childrenField] = sourceParent[childrenField].filter(function (childId) { return childId !== source.id; }),
                                        _b),
                                    previousData: sourceParent,
                                })];
                        case 2:
                            _e.sent();
                            _e.label = 3;
                        case 3:
                            if (!(position === 0)) return [3 /*break*/, 5];
                            return [4 /*yield*/, dataProvider.update(resource, {
                                    id: destination.id,
                                    data: (_c = {},
                                        _c[childrenField] = [].concat(source.id, destination[childrenField]),
                                        _c),
                                    previousData: destination,
                                })];
                        case 4:
                            _e.sent();
                            return [3 /*break*/, 7];
                        case 5:
                            children = [].concat(destination[childrenField].slice(0, position - 1), source.id, destination[childrenField].slice(position));
                            return [4 /*yield*/, dataProvider.update(resource, {
                                    id: destination.id,
                                    data: (_d = {},
                                        _d[childrenField] = children,
                                        _d),
                                    previousData: destination,
                                })];
                        case 6:
                            _e.sent();
                            _e.label = 7;
                        case 7: return [2 /*return*/, { data: {} }];
                    }
                });
            });
        }, moveAsNthSiblingOf: function (resource, _a) {
            var source = _a.source, destination = _a.destination, position = _a.position;
            return __awaiter(void 0, void 0, void 0, function () {
                var nodes, sourceParent, destinationParent, children, destinationPosition;
                var _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0: return [4 /*yield*/, dataProvider.getList(resource, {
                                filter: {},
                                sort: { field: 'id', order: 'ASC' },
                                pagination: { page: 1, perPage: 1000 },
                            })];
                        case 1:
                            nodes = (_e.sent()).data;
                            sourceParent = nodes
                                .filter(function (node) { return node.children.includes(source.id); })
                                .pop();
                            destinationParent = nodes
                                .filter(function (node) { return node.children.includes(destination.id); })
                                .pop();
                            if (!(sourceParent &&
                                destinationParent &&
                                sourceParent.id === destinationParent.id)) return [3 /*break*/, 3];
                            children = __spreadArrays(destinationParent.children);
                            destinationPosition = children.indexOf(destination.id);
                            children.splice(destinationPosition, 0, children.splice(children.indexOf(source.id), 1)[0]);
                            return [4 /*yield*/, dataProvider.update(resource, {
                                    id: destinationParent.id,
                                    data: (_b = {},
                                        _b[childrenField] = children,
                                        _b),
                                    previousData: destinationParent,
                                })];
                        case 2:
                            _e.sent();
                            return [3 /*break*/, 7];
                        case 3:
                            if (!sourceParent) return [3 /*break*/, 5];
                            return [4 /*yield*/, dataProvider.update(resource, {
                                    id: sourceParent.id,
                                    data: (_c = {},
                                        _c[childrenField] = sourceParent[childrenField].filter(function (childId) { return childId !== source.id; }),
                                        _c),
                                    previousData: sourceParent,
                                })];
                        case 4:
                            _e.sent();
                            _e.label = 5;
                        case 5: 
                        // 4. Add source in destinationParent children
                        return [4 /*yield*/, dataProvider.update(resource, {
                                id: destinationParent.id,
                                data: (_d = {},
                                    _d[childrenField] = destinationParent[childrenField]
                                        .slice(0, position)
                                        .concat(source.id, destinationParent[childrenField].slice(position)),
                                    _d),
                                previousData: destinationParent,
                            })];
                        case 6:
                            // 4. Add source in destinationParent children
                            _e.sent();
                            _e.label = 7;
                        case 7: return [2 /*return*/, { data: {} }];
                    }
                });
            });
        }, addRootNode: function (resource, _a) {
            var data = _a.data;
            return __awaiter(void 0, void 0, void 0, function () {
                var _b;
                return __generator(this, function (_c) {
                    return [2 /*return*/, dataProvider.create(resource, {
                            data: __assign(__assign({}, data), (_b = {}, _b[isRootField] = true, _b[childrenField] = [], _b)),
                        })];
                });
            });
        }, addChildNode: function (resource, _a) {
            var parentId = _a.parentId, data = _a.data;
            return __awaiter(void 0, void 0, void 0, function () {
                var parent, newChild;
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, dataProvider.getOne(resource, {
                                id: parentId,
                            })];
                        case 1:
                            parent = (_c.sent()).data;
                            return [4 /*yield*/, dataProvider.create(resource, {
                                    data: __assign(__assign({}, data), (_b = {}, _b[isRootField] = false, _b[childrenField] = [], _b)),
                                })];
                        case 2:
                            newChild = _c.sent();
                            // update parent children
                            return [4 /*yield*/, dataProvider.update(resource, {
                                    id: parentId,
                                    data: __assign(__assign({}, parent), { children: parent.children.concat(newChild.data.id) }),
                                    previousData: parent,
                                })];
                        case 3:
                            // update parent children
                            _c.sent();
                            return [2 /*return*/, newChild];
                    }
                });
            });
        }, deleteBranch: function (resource, params) { return __awaiter(void 0, void 0, void 0, function () {
            var id, data, parent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = params.id, data = params.data;
                        // Deletion of the record itself must be handled by specialized method.
                        return [4 /*yield*/, deleteBranch(treeDataProvider, resource, params)];
                    case 1:
                        // Deletion of the record itself must be handled by specialized method.
                        _a.sent();
                        return [4 /*yield*/, treeDataProvider.getParentNode(resource, { childId: id })];
                    case 2:
                        parent = (_a.sent()).data;
                        if (!parent) return [3 /*break*/, 4];
                        return [4 /*yield*/, dataProvider.update(resource, {
                                id: parent.id,
                                data: __assign(__assign({}, parent), { children: parent.children.filter(function (childId) { return childId !== id; }) }),
                                previousData: parent,
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, { data: data }];
                }
            });
        }); } });
    return treeDataProvider;
};
exports.default = addTreeMethodsBasedOnChildren;
