import { Reducer } from 'redux';
import { TreeReduxSubState } from './types';
/**
 * Reducer for Tree state
 *
 * Store, for each resource with a tree, 2 objects:
 *  - nodes: a list of nodes indexd by id, containing an array of child ids
 *  - expanded: an array of the expanded ids
 *
 * @example
 *
 * tree: {
 *   categories: {
 *     nodes: {
 *       '1': [2,6],
 *       '2': [3],
 *       '3': [4,5],
 *       '4': [],
 *       '5': [],
 *       '6': [7,10,11],
 *       '7': [8,9],
 *       '8': [],
 *       '9': [],
 *       '10': [],
 *       '11': []
 *     },
 *     expanded: []
 *   }
 */
declare const treeReducer: Reducer<TreeReduxSubState>;
export default treeReducer;
