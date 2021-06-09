"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../../src");
var data = [
    { id: 1, name: 'Clothing', isRoot: true, children: [2, 6] },
    { id: 2, name: 'Men', children: [3] },
    { id: 3, name: 'Suits', children: [4, 5] },
    { id: 4, name: 'Slacks', children: [] },
    { id: 5, name: 'Jackets', children: [] },
    { id: 6, name: 'Women', children: [7, 10, 11] },
    { id: 7, name: 'Dresses', children: [8, 9] },
    { id: 8, name: 'Evening Gowns', children: [] },
    { id: 9, name: 'Sun Dresses', children: [] },
    { id: 10, name: 'Skirts', children: [] },
    { id: 11, name: 'Blouses', children: [] },
];
exports.default = src_1.getRCTree(data, 'name');
