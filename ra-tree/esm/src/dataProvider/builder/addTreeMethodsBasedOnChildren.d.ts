import { DataProvider } from 'react-admin';
import { TreeDataProvider } from '../../types';
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
declare const addTreeMethodsBasedOnChildren: (dataProvider: DataProvider, childrenField?: string, isRootField?: string, apiSupportBranchDeletion?: boolean) => DataProvider & TreeDataProvider;
export default addTreeMethodsBasedOnChildren;
