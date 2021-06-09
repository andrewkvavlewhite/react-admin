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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var LOCKS_RESOURCE_NAME = 'locks';
/**
 * Add locks methods to a dataProvider based on a lock resource which has been declared in the admin.
 *
 * A lock is a semaphore for the unique combinaison (resource, record id). For example "posts/12" is unique.
 *
 * Thanks to the methods provided by this helper, you can list, create and delete the semaphores on a resource.
 *
 * A lock is composed of the following keys:
 * - `id`: a unique identifier. For example "posts/28".
 * - `resource`: the resource to lock. For example "posts".
 * - `recordId`: the record id to lock. For example "28".
 * - `createdAt`: the creation date. For example "2020/09/29 23:00"
 * - `identity`: the lock's owner. For example "Adrien". It could be an auth token.
 *
 * @param {DataProvider} dataProvider The dataProvider to augment
 * @param {string} locksRessourceName The name of the resource used to store locks. Default to "locks".
 * @returns {DataProvider}
 *
 * @example
 *
 * const locksDataProvider = addLocksMethods(dataProvider);
 *
 * await locksDataProvider.lock('post', {
 *     recordId: 143,
 *     identity: 'adrien' // It could be an authentication token
 * });
 *
 * await locksDataProvider.unlock('post', {
 *     recordId: 143,
 *     identity: 'adrien'
 * });
 *
 */
var addLocksMethodsBasedOnALockResource = function (dataProvider, locksRessourceName) {
    if (locksRessourceName === void 0) { locksRessourceName = LOCKS_RESOURCE_NAME; }
    return __assign(__assign({}, dataProvider), { 
        /**
         * Create a lock on a record
         *
         * @param {string} resource A React-Admin resource name
         * @param {Lock} data The data used to create a lock
         *
         * @returns A promise resolved with the created lock
         *
         * @example
         *
         * const locksDataProvider = addLocksMethods(dataProvider);
         *
         * await locksDataProvider.lock('post', {
         *     recordId: 143,
         *     identity: 'adrien' // It could be an authentication token
         * });
         *
         */
        lock: function (resource, data) { return __awaiter(void 0, void 0, void 0, function () {
            var recordId, identity, createdAt, total;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        recordId = data.recordId, identity = data.identity;
                        createdAt = new Date();
                        return [4 /*yield*/, dataProvider.getList(locksRessourceName, {
                                pagination: { page: 1, perPage: 1 },
                                sort: { field: 'id', order: 'ASC' },
                                filter: {
                                    resource: resource,
                                    recordId: recordId,
                                },
                            })];
                    case 1:
                        total = (_a.sent()).total;
                        if (total > 0) {
                            return [2 /*return*/, Promise.reject(new Error('ra-realtime.error.lock.lockedBySomeoneElse'))];
                        }
                        return [2 /*return*/, dataProvider.create(locksRessourceName, {
                                data: {
                                    identity: identity,
                                    resource: resource,
                                    recordId: recordId,
                                    createdAt: createdAt,
                                },
                            })];
                }
            });
        }); }, 
        /**
         * Unlock a record
         *
         * @param {string} resource A React-Admin resource name
         * @param {Lock} data The data used to remove a lock
         *
         * @returns A promise resolved with the removed lock
         *
         * @example
         *
         * const locksDataProvider = addLocksMethods(dataProvider);
         *
         * await locksDataProvider.unlock('post', {
         *     recordId: 143,
         *     identity: 'adrien' // It could be an authentication token
         * });
         *
         */
        unlock: function (resource, data) { return __awaiter(void 0, void 0, void 0, function () {
            var recordId, identity, _a, locks, total, currentLock;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        recordId = data.recordId, identity = data.identity;
                        return [4 /*yield*/, dataProvider.getList(locksRessourceName, {
                                pagination: { page: 1, perPage: 1 },
                                sort: { field: 'id', order: 'ASC' },
                                filter: {
                                    resource: resource,
                                    recordId: recordId,
                                },
                            })];
                    case 1:
                        _a = _b.sent(), locks = _a.data, total = _a.total;
                        if (total === 0) {
                            return [2 /*return*/, Promise.reject(new Error('ra-realtime.error.lock.noLock'))];
                        }
                        if (locks[0].identity !== identity) {
                            return [2 /*return*/, Promise.reject(new Error('ra-realtime.error.lock.cannotUnlock'))];
                        }
                        currentLock = locks[0];
                        return [2 /*return*/, dataProvider.delete(locksRessourceName, {
                                id: currentLock.id,
                                previousData: __assign({}, currentLock),
                            })];
                }
            });
        }); }, 
        /**
         * Get an existing lock on a record
         *
         * @param {string} resource A React-Admin resource name
         * @param {Lock} data The data used to get a lock
         *
         * @returns A promise resolved with the lock
         *
         * @example
         *
         * const locksDataProvider = addLocksMethods(dataProvider);
         *
         * await locksDataProvider.getLock('post', {
         *     recordId: 143,
         * });
         *
         */
        getLock: function (resource, data) { return __awaiter(void 0, void 0, void 0, function () {
            var recordId, _a, locks, total;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        recordId = data.recordId;
                        return [4 /*yield*/, dataProvider.getList(locksRessourceName, {
                                pagination: { page: 1, perPage: 1 },
                                sort: { field: 'id', order: 'ASC' },
                                filter: {
                                    resource: resource,
                                    recordId: recordId,
                                },
                            })];
                    case 1:
                        _a = _b.sent(), locks = _a.data, total = _a.total;
                        if (total === 0) {
                            return [2 /*return*/, Promise.reject(new Error('ra-realtime.error.lock.noLock'))];
                        }
                        return [2 /*return*/, Promise.resolve({ data: locks[0] })];
                }
            });
        }); }, 
        /**
         * Get the list of locks for a resource
         *
         * @param {string} resource A React-Admin resource name
         *
         * @returns A promise resolved with the locks
         *
         * @example
         *
         * const locksDataProvider = addLocksMethods(dataProvider);
         *
         * await locksDataProvider.getLocks('post');
         *
         */
        getLocks: function (resource) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, dataProvider.getList(locksRessourceName, {
                        // "pagination" and "sort" field are required by getList
                        pagination: { page: 1, perPage: 1000 },
                        sort: { field: 'id', order: 'ASC' },
                        filter: {
                            resource: resource,
                        },
                    })];
            });
        }); } });
};
export default addLocksMethodsBasedOnALockResource;
