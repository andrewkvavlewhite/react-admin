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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { DefaultAuditLogResource } from '../constants';
import { buildMatchActionOnResource } from './buildMatchActionOnResource';
import { DefaultOptions } from './options';
export var addEventsForMutations = function (dataProvider, authProvider, options) {
    if (options === void 0) { options = DefaultOptions; }
    var _a = options.name, eventsResource = _a === void 0 ? DefaultAuditLogResource : _a, _b = options.shouldAudit, shouldAudit = _b === void 0 ? buildMatchActionOnResource(options) : _b;
    if (!authProvider.getIdentity) {
        throw new Error('The getIdentity method of the authProvider is required for audit logs. Please refer to the documentation to implement it: https://marmelab.com/react-admin/Authentication.html#building-your-own-auth-provider');
    }
    var proxy = new Proxy(defaultDataProvider, {
        get: function (_, name) {
            var _this = this;
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return __awaiter(_this, void 0, void 0, function () {
                    var action, result, resource, params, _a, _b, _c;
                    var _d, _e;
                    return __generator(this, function (_f) {
                        switch (_f.label) {
                            case 0:
                                action = name.toString();
                                return [4 /*yield*/, dataProvider[action].apply(dataProvider, args)];
                            case 1:
                                result = _f.sent();
                                resource = args[0], params = args[1];
                                if (!shouldAudit.apply(void 0, __spreadArrays([action], args))) return [3 /*break*/, 4];
                                _b = (_a = dataProvider).create;
                                _c = [eventsResource];
                                _d = {};
                                _e = {
                                    date: new Date().toISOString()
                                };
                                return [4 /*yield*/, authProvider.getIdentity()];
                            case 2: return [4 /*yield*/, _b.apply(_a, _c.concat([(_d.data = (_e.author = _f.sent(),
                                        _e.resource = typeof resource === 'string'
                                            ? resource
                                            : undefined,
                                        _e.action = action,
                                        _e.payload = action === 'create'
                                            ? result
                                            : params || resource,
                                        _e),
                                        _d)]))];
                            case 3:
                                _f.sent();
                                _f.label = 4;
                            case 4: return [2 /*return*/, result];
                        }
                    });
                });
            };
        },
    });
    return proxy;
};
var defaultDataProvider = {
    create: function () { return Promise.resolve(null); },
    delete: function () { return Promise.resolve(null); },
    deleteMany: function () { return Promise.resolve(null); },
    getList: function () { return Promise.resolve(null); },
    getMany: function () { return Promise.resolve(null); },
    getManyReference: function () { return Promise.resolve(null); },
    getOne: function () { return Promise.resolve(null); },
    update: function () { return Promise.resolve(null); },
    updateMany: function () { return Promise.resolve(null); },
};
