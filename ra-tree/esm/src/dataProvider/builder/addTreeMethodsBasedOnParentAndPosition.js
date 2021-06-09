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
import deleteBranchByDeletingAllChildren from './deleteBranchByDeletingAllChildren';
import deleteBranchByDeletingNode from './deleteBranchByDeletingNode';
/**
 * Provided the records contain a parent_id and a position field,
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
 *     parent_id: 35,
 *     position: 4, // zero-based
 * }
 *
 * @param {DataProvider} dataProvider The dataProvider to augment
 * @param {string} parentIdField The name of the field containing the parent id. Defaults to 'parent_id'
 * @param {string} positionField The name of the field containing the position of a node inside its parent. Defaults to 'position'
 * @param {boolean} apiSupportBranchDeletion Indicates whether the API will handle children deletion when deleting a node as well as the siblings update. If false, the dataProvider will handle it by making multiple requests in the right order. Defaults to `false`.
 */
var addTreeMethodsBasedOnParentAndPosition = function (dataProvider, parentIdField, positionField, apiSupportBranchDeletion) {
    if (parentIdField === void 0) { parentIdField = 'parent_id'; }
    if (positionField === void 0) { positionField = 'position'; }
    if (apiSupportBranchDeletion === void 0) { apiSupportBranchDeletion = false; }
    var deleteBranch = apiSupportBranchDeletion
        ? deleteBranchByDeletingNode
        : deleteBranchByDeletingAllChildren;
    var treeDataProvider = __assign(__assign({}, dataProvider), { getTree: function (resource) { return __awaiter(void 0, void 0, void 0, function () {
            var data, treeRecords;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, dataProvider.getList(resource, {
                            filter: {},
                            sort: { field: positionField, order: 'ASC' },
                            pagination: { page: 1, perPage: 1000 },
                        })];
                    case 1:
                        data = (_a.sent()).data;
                        treeRecords = data.map(function (record) { return (__assign(__assign({}, record), { children: data
                                .filter(function (r) { return r[parentIdField] == record.id; })
                                .sort(function (a, b) { return a[positionField] - b[positionField]; })
                                .map(function (child) { return child.id; }) })); });
                        return [2 /*return*/, {
                                data: treeRecords,
                            }];
                }
            });
        }); }, getRootNodes: function (resource) { return __awaiter(void 0, void 0, void 0, function () {
            var data, treeRecords;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, dataProvider.getList(resource, {
                            filter: (_a = {}, _a[parentIdField] = null, _a),
                            sort: { field: positionField, order: 'ASC' },
                            pagination: { page: 1, perPage: 1000 },
                        })];
                    case 1:
                        data = (_b.sent()).data;
                        return [4 /*yield*/, Promise.all(data.map(function (record) {
                                var _a;
                                return dataProvider
                                    .getList(resource, {
                                    filter: (_a = {}, _a[parentIdField] = record.id, _a),
                                    sort: {
                                        field: positionField,
                                        order: 'ASC',
                                    },
                                    pagination: { page: 1, perPage: 1000 },
                                })
                                    .then(function (_a) {
                                    var data = _a.data;
                                    return (__assign(__assign({}, record), { children: data.map(function (_a) {
                                            var id = _a.id;
                                            return id;
                                        }) }));
                                });
                            }))];
                    case 2:
                        treeRecords = _b.sent();
                        return [2 /*return*/, {
                                data: treeRecords,
                            }];
                }
            });
        }); }, getParentNode: function (resource, _a) {
            var childId = _a.childId;
            return __awaiter(void 0, void 0, void 0, function () {
                var tree, child, parent;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, treeDataProvider.getTree(resource)];
                        case 1:
                            tree = (_b.sent()).data;
                            child = tree.find(function (node) { return node.id === childId; });
                            if (!child) {
                                return [2 /*return*/, { data: undefined }];
                            }
                            parent = tree.find(function (node) { return node.id === child[parentIdField]; });
                            return [2 /*return*/, {
                                    data: parent,
                                }];
                    }
                });
            });
        }, getChildNodes: function (resource, _a) {
            var parentId = _a.parentId;
            return __awaiter(void 0, void 0, void 0, function () {
                var data, treeRecords;
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, dataProvider.getList(resource, {
                                filter: (_b = {}, _b[parentIdField] = parentId, _b),
                                sort: { field: positionField, order: 'ASC' },
                                pagination: { page: 1, perPage: 1000 },
                            })];
                        case 1:
                            data = (_c.sent()).data;
                            return [4 /*yield*/, Promise.all(data.map(function (record) {
                                    var _a;
                                    return dataProvider
                                        .getList(resource, {
                                        filter: (_a = {}, _a[parentIdField] = record.id, _a),
                                        sort: {
                                            field: positionField,
                                            order: 'ASC',
                                        },
                                        pagination: { page: 1, perPage: 1000 },
                                    })
                                        .then(function (_a) {
                                        var data = _a.data;
                                        return (__assign(__assign({}, record), { children: data.map(function (_a) {
                                                var id = _a.id;
                                                return id;
                                            }) }));
                                    });
                                }))];
                        case 2:
                            treeRecords = _c.sent();
                            return [2 /*return*/, {
                                    data: treeRecords,
                                }];
                    }
                });
            });
        }, moveAsNthChildOf: function (resource, _a) {
            var source = _a.source, destination = _a.destination, position = _a.position;
            return __awaiter(void 0, void 0, void 0, function () {
                var destinationSiblings, sourceSiblings;
                var _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0: return [4 /*yield*/, dataProvider.getList(resource, {
                                filter: (_b = {},
                                    _b[parentIdField] = destination.id,
                                    _b[positionField + "_gte"] = position,
                                    _b),
                                sort: {
                                    field: positionField,
                                    order: 'ASC',
                                },
                                pagination: { page: 1, perPage: 1000 },
                            })];
                        case 1:
                            destinationSiblings = (_e.sent()).data;
                            if (!(destinationSiblings.length > 0)) return [3 /*break*/, 3];
                            return [4 /*yield*/, Promise.all(destinationSiblings.map(function (item) {
                                    var _a;
                                    return dataProvider.update(resource, {
                                        id: item.id,
                                        data: (_a = {}, _a[positionField] = item[positionField] + 1, _a),
                                        previousData: item,
                                    });
                                }))];
                        case 2:
                            _e.sent();
                            _e.label = 3;
                        case 3: return [4 /*yield*/, dataProvider.getList(resource, {
                                filter: (_c = {},
                                    _c[parentIdField] = source[parentIdField],
                                    _c[positionField + "_gt"] = source[positionField],
                                    _c),
                                sort: {
                                    field: positionField,
                                    order: 'ASC',
                                },
                                pagination: { page: 1, perPage: 1000 },
                            })];
                        case 4:
                            sourceSiblings = (_e.sent()).data;
                            if (!(sourceSiblings.length > 0)) return [3 /*break*/, 6];
                            return [4 /*yield*/, Promise.all(sourceSiblings.map(function (item) {
                                    var _a;
                                    return dataProvider.update(resource, {
                                        id: item.id,
                                        data: (_a = {}, _a[positionField] = item[positionField] - 1, _a),
                                        previousData: item,
                                    });
                                }))];
                        case 5:
                            _e.sent();
                            _e.label = 6;
                        case 6: 
                        // 3. Change the parent and position of the source node
                        return [4 /*yield*/, dataProvider.update(resource, {
                                id: source.id,
                                data: (_d = {},
                                    _d[parentIdField] = destination.id,
                                    _d[positionField] = position,
                                    _d),
                                previousData: source,
                            })];
                        case 7:
                            // 3. Change the parent and position of the source node
                            _e.sent();
                            return [2 /*return*/, { data: {} }];
                    }
                });
            });
        }, moveAsNthSiblingOf: function (resource, _a) {
            var source = _a.source, destination = _a.destination, position = _a.position;
            return __awaiter(void 0, void 0, void 0, function () {
                var destinationSiblingsToUpdateFilter, destinationSiblings, sourceSiblingsToUpdateFilters, sourceSiblings;
                var _b, _c, _d, _e, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            if ((source[positionField] > destination[positionField] &&
                                source[parentIdField] === destination[parentIdField]) ||
                                position === 0) {
                                destinationSiblingsToUpdateFilter = (_b = {},
                                    _b[parentIdField] = destination[parentIdField],
                                    _b[positionField + "_gte"] = destination[positionField],
                                    _b);
                            }
                            if (source[parentIdField] !== destination[parentIdField] &&
                                position > 0) {
                                destinationSiblingsToUpdateFilter = (_c = {},
                                    _c[parentIdField] = destination[parentIdField],
                                    _c[positionField + "_gt"] = destination[positionField],
                                    _c);
                            }
                            if (!destinationSiblingsToUpdateFilter) return [3 /*break*/, 3];
                            return [4 /*yield*/, dataProvider.getList(resource, {
                                    filter: destinationSiblingsToUpdateFilter,
                                    sort: {
                                        field: positionField,
                                        order: 'ASC',
                                    },
                                    pagination: { page: 1, perPage: 1000 },
                                })];
                        case 1:
                            destinationSiblings = (_g.sent()).data;
                            if (!(destinationSiblings.length > 0)) return [3 /*break*/, 3];
                            return [4 /*yield*/, Promise.all(destinationSiblings.map(function (item) {
                                    var _a;
                                    return item.id === source.id
                                        ? Promise.resolve(undefined)
                                        : dataProvider.update(resource, {
                                            id: item.id,
                                            data: (_a = {},
                                                _a[positionField] = item[positionField] + 1,
                                                _a),
                                            previousData: item,
                                        });
                                }))];
                        case 2:
                            _g.sent();
                            _g.label = 3;
                        case 3:
                            if (source[parentIdField] === destination[parentIdField]) {
                                sourceSiblingsToUpdateFilters = (_d = {},
                                    _d[parentIdField] = source[parentIdField],
                                    _d[positionField + "_gt"] = source[positionField],
                                    _d[positionField + "_lte"] = destination[positionField],
                                    _d);
                            }
                            else {
                                sourceSiblingsToUpdateFilters = (_e = {},
                                    _e[parentIdField] = source[parentIdField],
                                    _e[positionField + "_gt"] = source[positionField],
                                    _e);
                            }
                            return [4 /*yield*/, dataProvider.getList(resource, {
                                    filter: sourceSiblingsToUpdateFilters,
                                    sort: {
                                        field: positionField,
                                        order: 'ASC',
                                    },
                                    pagination: { page: 1, perPage: 1000 },
                                })];
                        case 4:
                            sourceSiblings = (_g.sent()).data;
                            if (!(sourceSiblings.length > 0)) return [3 /*break*/, 6];
                            return [4 /*yield*/, Promise.all(sourceSiblings.map(function (item) {
                                    var _a;
                                    return item.id === source.id
                                        ? Promise.resolve(undefined)
                                        : dataProvider.update(resource, {
                                            id: item.id,
                                            data: (_a = {},
                                                _a[positionField] = item[positionField] - 1,
                                                _a),
                                            previousData: item,
                                        });
                                }))];
                        case 5:
                            _g.sent();
                            _g.label = 6;
                        case 6: 
                        // 3. Change the parent and position of the source node
                        return [4 /*yield*/, dataProvider.update(resource, {
                                id: source.id,
                                data: (_f = {},
                                    _f[parentIdField] = destination.parent_id,
                                    _f[positionField] = source[parentIdField] === destination[parentIdField]
                                        ? destination[positionField]
                                        : position,
                                    _f),
                                previousData: source,
                            })];
                        case 7:
                            // 3. Change the parent and position of the source node
                            _g.sent();
                            return [2 /*return*/, { data: {} }];
                    }
                });
            });
        }, addRootNode: function (resource, _a) {
            var data = _a.data;
            return __awaiter(void 0, void 0, void 0, function () {
                var roots, rootPosition, newRoot;
                var _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, dataProvider.getList(resource, {
                                filter: (_b = {}, _b[parentIdField] = null, _b),
                                sort: { field: positionField, order: 'ASC' },
                                pagination: { page: 1, perPage: 1000 },
                            })];
                        case 1:
                            roots = (_d.sent()).data;
                            rootPosition = roots.length > 0
                                ? roots.reduce(function (acc, curr) {
                                    return curr[positionField] > acc
                                        ? curr[positionField]
                                        : acc;
                                }, -Infinity) + 1
                                : 0;
                            return [4 /*yield*/, dataProvider.create(resource, {
                                    data: __assign(__assign({}, data), (_c = {}, _c[parentIdField] = null, _c[positionField] = rootPosition, _c)),
                                })];
                        case 2:
                            newRoot = (_d.sent()).data;
                            return [2 /*return*/, { data: __assign(__assign({}, newRoot), { children: [] }) }];
                    }
                });
            });
        }, addChildNode: function (resource, _a) {
            var parentId = _a.parentId, data = _a.data;
            return __awaiter(void 0, void 0, void 0, function () {
                var siblings, childPosition, newRoot;
                var _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, dataProvider.getList(resource, {
                                filter: (_b = {}, _b[parentIdField] = parentId, _b),
                                sort: { field: positionField, order: 'ASC' },
                                pagination: { page: 1, perPage: 1000 },
                            })];
                        case 1:
                            siblings = (_d.sent()).data;
                            childPosition = siblings.length > 0
                                ? siblings.reduce(function (acc, curr) {
                                    return curr[positionField] > acc
                                        ? curr[positionField]
                                        : acc;
                                }, -Infinity) + 1
                                : 0;
                            return [4 /*yield*/, dataProvider.create(resource, {
                                    data: __assign(__assign({}, data), (_c = {}, _c[parentIdField] = parentId, _c[positionField] = childPosition, _c)),
                                })];
                        case 2:
                            newRoot = (_d.sent()).data;
                            return [2 /*return*/, { data: __assign(__assign({}, newRoot), { children: [] }) }];
                    }
                });
            });
        }, deleteBranch: function (resource, params) { return __awaiter(void 0, void 0, void 0, function () {
            var id, data, siblings;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = params.id, data = params.data;
                        // Deletion of the record itself must be handled by specialized method.
                        return [4 /*yield*/, deleteBranch(treeDataProvider, resource, params)];
                    case 1:
                        // Deletion of the record itself must be handled by specialized method.
                        _a.sent();
                        return [4 /*yield*/, treeDataProvider.getChildNodes(resource, {
                                parentId: data[parentIdField],
                            })];
                    case 2:
                        siblings = (_a.sent()).data;
                        // update the siblings position
                        return [4 /*yield*/, Promise.all(siblings
                                .filter(function (node) {
                                return node[positionField] > data[positionField] &&
                                    node.id !== id;
                            })
                                .map(function (node) {
                                var _a;
                                return dataProvider.update(resource, {
                                    id: node.id,
                                    data: __assign(__assign({}, node), (_a = {}, _a[positionField] = node[positionField] - 1, _a)),
                                    previousData: node,
                                });
                            }))];
                    case 3:
                        // update the siblings position
                        _a.sent();
                        return [2 /*return*/, { data: data }];
                }
            });
        }); } });
    return treeDataProvider;
};
export default addTreeMethodsBasedOnParentAndPosition;
