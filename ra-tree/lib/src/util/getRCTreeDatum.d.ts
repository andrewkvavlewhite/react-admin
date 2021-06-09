import { TreeRecord, RCTreeDatum } from '../types';
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
declare const getRCTreeDatum: (treeRecord: TreeRecord, titleField?: string, new_node_title?: string) => RCTreeDatum;
export default getRCTreeDatum;
