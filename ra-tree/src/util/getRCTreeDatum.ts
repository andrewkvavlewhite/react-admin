import { TreeRecord, RCTreeDatum } from '../types';
import { UNSAVED_NEW_NODE } from '../constants';

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
const getRCTreeDatum = (
    treeRecord: TreeRecord,
    titleField = 'title',
    new_node_title = 'new node'
): RCTreeDatum => ({
    ...treeRecord,
    key: String(treeRecord.id), // rc-tree only works with string keys
    title:
        treeRecord.id === UNSAVED_NEW_NODE
            ? new_node_title
            : treeRecord[titleField],
});

export default getRCTreeDatum;
