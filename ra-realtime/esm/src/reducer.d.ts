import { Reducer } from 'redux';
import { LocksReduxSubState } from './types';
/**
 * Reducer for Locks state
 *
 * Store a list of locks for each resource, indexed by their record id.
 * Each lock contains an object with the following keys:
 * - resource
 * - recordId
 * - identity
 * - createdAt
 *
 * @example
 *
 * locks: {
 *     comments: {
 *         '10': {
 *             resource: 'comments',
 *             recordId: '10',
 *             identity: 'adrien'
 *             createdAt: '2020-08-20'
 *         },
 *     },
 *     posts: {
 *         '5': {
 *             resource: 'posts',
 *             recordId: '5',
 *             identity: 'francois'
 *             createdAt: '2020-08-25'
 *         },
 *     }
 *   }
 */
declare const locksReducer: Reducer<LocksReduxSubState>;
export default locksReducer;
