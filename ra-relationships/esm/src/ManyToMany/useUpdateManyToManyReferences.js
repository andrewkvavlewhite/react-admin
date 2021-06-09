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
import { useCallback } from 'react';
import { CREATE, DELETE_MANY, useDataProvider, useNotify, } from 'react-admin';
import { UsingRegexp } from './constants';
export var computeReferencesDiff = function (previousReferences, newReferences) {
    var removedReferences = previousReferences.filter(function (previousReference) { return !newReferences.includes(previousReference); });
    var addedReferences = newReferences.filter(function (referenceId) { return !previousReferences.includes(referenceId); });
    return {
        addedReferences: addedReferences,
        removedReferences: removedReferences,
    };
};
export var useUpdateManyToManyReferences = function () {
    var dataProvider = useDataProvider();
    var notify = useNotify();
    return useCallback(function (_a, _b) {
        var newReferences = _a.newReferences, resourceId = _a.resourceId, through = _a.through, using = _a.using;
        var onFailure = _b.onFailure;
        return __awaiter(void 0, void 0, void 0, function () {
            var _c, sourceField_1, targetField_1, throughManyReferences, previousReferences, _d, addedReferences, removedReferences_1, ids, error_1, errorMessage;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 6, , 7]);
                        _c = using.match(UsingRegexp), sourceField_1 = _c[1], targetField_1 = _c[2];
                        return [4 /*yield*/, dataProvider.getManyReference(through, {
                                target: sourceField_1,
                                id: resourceId,
                                filter: {},
                                sort: { field: 'id', order: 'ASC' },
                                pagination: { page: 1, perPage: 25 },
                            })];
                    case 1:
                        throughManyReferences = _e.sent();
                        previousReferences = throughManyReferences.data.map(function (throughManyReference) { return throughManyReference[targetField_1]; });
                        _d = computeReferencesDiff(previousReferences, newReferences), addedReferences = _d.addedReferences, removedReferences_1 = _d.removedReferences;
                        if (!(removedReferences_1.length > 0)) return [3 /*break*/, 3];
                        ids = throughManyReferences.data
                            .filter(function (throughManyReference) {
                            return removedReferences_1.includes(throughManyReference[targetField_1]);
                        })
                            .map(function (throughManyReference) { return throughManyReference.id; });
                        return [4 /*yield*/, dataProvider.deleteMany(through, {
                                ids: ids,
                            }, {
                                action: DELETE_MANY,
                            })];
                    case 2:
                        _e.sent();
                        _e.label = 3;
                    case 3:
                        if (!(addedReferences.length > 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, Promise.all(addedReferences.map(function (referenceId) {
                                var _a;
                                return dataProvider.create(through, {
                                    data: (_a = {},
                                        _a[sourceField_1] = resourceId,
                                        _a[targetField_1] = referenceId,
                                        _a),
                                }, {
                                    action: CREATE,
                                });
                            }))];
                    case 4:
                        _e.sent();
                        _e.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _e.sent();
                        if (onFailure) {
                            return [2 /*return*/, onFailure(error_1)];
                        }
                        errorMessage = typeof error_1 === 'string'
                            ? error_1
                            : // NOTE: We might have to introduce a new message instead of http_error
                                error_1.message || 'ra.notification.http_error';
                        notify(errorMessage, 'warning');
                        return [2 /*return*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    }, [dataProvider, notify]);
};
