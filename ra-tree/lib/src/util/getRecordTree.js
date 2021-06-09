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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Turn a flat array of TreeRecords into a tree structure,
 * where each tree has an array of TreeRecords as children.
 *
 * @example
 *
 * getRecordTree([
 *   { id: 1, title: 'foo1', children: [3, 4] },
 *   { id: 2, title: 'foo2', children: [] },
 *   { id: 3, title: 'foo3', children: [5] },
 *   { id: 4, title: 'foo4', children: [] },
 *   { id: 5, title: 'foo5', children: [] },
 * ]);
 * => [
 *   { id: 1, title: 'foo1', children: [
 *     { id: 3, title: 'foo3', children: [
 *       { id: 5, title: 'foo5', children: [] },
 *     ] },
 *     { id: 4, title: 'foo4', children: [] },
 *   ] },
 *   { id: 2, title: 'foo2', children: [] },
 * ]
 */
var getRecordTree = function (treeRecords) {
    var treeRecordsById = treeRecords.reduce(function (acc, curr) {
        acc[curr.id] = curr;
        return acc;
    }, {});
    var childRecordIds = Array.from(new Set(treeRecords.flatMap(function (treeRecord) { return treeRecord.children; })));
    var rootRecords = treeRecords.filter(function (_a) {
        var id = _a.id;
        return !childRecordIds.includes(id);
    });
    var addChildren = function (record, recordId) { return (__assign(__assign({ 
        // Those two lines ensure we have the minimum props needed for rc-tree
        // even though we may not have loaded the records yet (lazy mode)
        id: recordId, key: recordId.toString() }, record), { children: ((record === null || record === void 0 ? void 0 : record.children) || []).map(function (id) {
            return addChildren(treeRecordsById[id], id);
        }) })); };
    return rootRecords.map(function (record) { return addChildren(record, record.id); });
};
exports.default = getRecordTree;
