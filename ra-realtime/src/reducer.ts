import { Reducer } from 'redux';
import { LOCK, UNLOCK, GET_LOCK, GET_LOCKS } from './actions';
import { LocksReduxSubState } from './types';

const initialState = {};

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
const locksReducer: Reducer<LocksReduxSubState> = (
    state = initialState,
    { payload, meta }
) => {
    if (!meta || !meta.resource || !meta.fetchResponse) {
        return state;
    }

    const resourceState = state[meta.resource];

    // handling dataProvider response
    switch (meta.fetchResponse) {
        case LOCK:
        case GET_LOCK:
            if (!payload || !payload.data || !payload.data.recordId) {
                return state;
            }

            return {
                ...state,
                [meta.resource]: {
                    ...resourceState,
                    [payload.data.recordId]: {
                        ...payload.data,
                    },
                },
            };

        case GET_LOCKS:
            if (!payload || !payload.data || !payload.data.length) {
                return state;
            }

            return {
                ...state,
                [meta.resource]: {
                    ...resourceState,
                    ...payload.data.reduce((acc, lock) => {
                        if (!lock.recordId) {
                            return acc;
                        }
                        acc[lock.recordId] = {
                            ...lock,
                        };
                        return acc;
                    }, {}),
                },
            };

        case UNLOCK:
            if (!payload || !payload.data || !payload.data.recordId) {
                return state;
            }

            const newState = {
                ...state,
            };
            delete newState[meta.resource][payload.data.recordId];
            return newState;

        default:
            return state;
    }
};

export default locksReducer;
