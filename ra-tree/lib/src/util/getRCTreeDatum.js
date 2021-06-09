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
var constants_1 = require("../constants");
/**
 * Add key and title fields to a TreeRecord.
 *
 * These fields are required by rc-tree.
 *
 * Use the id field as source for the key, and turns it into a string
 * (since keys must be strings in rc-tree).
 *
 * @param {TreeRecord} treeRecord The record to augment
 * @param {string} titleField the name of the field to use for title (defaults to 'title')
 *
 * @returns {RCTreeDatum} A new record object with key and title
 *
 * @example
 *
 * getRCTreeDatum({ id: 1, name: 'hello', children: [] })
 * => {
 *   id: 1,
 *   name: 'hello',
 *   children: [],
 *   key: '1',
 *   title: 'hello',
 * }
 */
var getRCTreeDatum = function (treeRecord, titleField, new_node_title) {
    if (titleField === void 0) { titleField = 'title'; }
    if (new_node_title === void 0) { new_node_title = 'new node'; }
    return (__assign(__assign({}, treeRecord), { key: String(treeRecord.id), title: treeRecord.id === constants_1.UNSAVED_NEW_NODE
            ? new_node_title
            : treeRecord[titleField] }));
};
exports.default = getRCTreeDatum;
