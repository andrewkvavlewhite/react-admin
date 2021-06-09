import { TreeRecord, WithChildren } from '../types';
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
declare const getRecordTree: <T extends TreeRecord = TreeRecord>(treeRecords: T[]) => (WithChildren<T> & T)[];
export default getRecordTree;
