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
import { LOCK, UNLOCK, GET_LOCK, GET_LOCKS } from './actions';
var initialState = {};
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
var locksReducer = function (state, _a) {
    var _b, _c, _d;
    if (state === void 0) { state = initialState; }
    var payload = _a.payload, meta = _a.meta;
    if (!meta || !meta.resource || !meta.fetchResponse) {
        return state;
    }
    var resourceState = state[meta.resource];
    // handling dataProvider response
    switch (meta.fetchResponse) {
        case LOCK:
        case GET_LOCK:
            if (!payload || !payload.data || !payload.data.recordId) {
                return state;
            }
            return __assign(__assign({}, state), (_b = {}, _b[meta.resource] = __assign(__assign({}, resourceState), (_c = {}, _c[payload.data.recordId] = __assign({}, payload.data), _c)), _b));
        case GET_LOCKS:
            if (!payload || !payload.data || !payload.data.length) {
                return state;
            }
            return __assign(__assign({}, state), (_d = {}, _d[meta.resource] = __assign(__assign({}, resourceState), payload.data.reduce(function (acc, lock) {
                if (!lock.recordId) {
                    return acc;
                }
                acc[lock.recordId] = __assign({}, lock);
                return acc;
            }, {})), _d));
        case UNLOCK:
            if (!payload || !payload.data || !payload.data.recordId) {
                return state;
            }
            var newState = __assign({}, state);
            delete newState[meta.resource][payload.data.recordId];
            return newState;
        default:
            return state;
    }
};
export default locksReducer;
