import { DataProvider } from 'react-admin';
import { TreeDataProvider } from '../../types';
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
declare const addTreeMethodsBasedOnParentAndPosition: (dataProvider: DataProvider, parentIdField?: string, positionField?: string, apiSupportBranchDeletion?: boolean) => DataProvider & TreeDataProvider;
export default addTreeMethodsBasedOnParentAndPosition;
