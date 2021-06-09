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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
/**
 * A helper function to create a `ra-search`-compatible `dataProvider` based
 * on a regular react-admin `dataProvider`. This helper add the `search` method
 * by calling the regular `getList()` method with a filter object containing
 * a `q` key on the configured resources. The value of the `q` filter will be
 * the search query.
 *
 * Be aware that this builder will call the regular `dataProvider` several times,
 * for each resource. We don't recommend using it in production - instead, you
 * should modify your API to support the search method, and return data structures
 * in the format expected by `ra-search`.
 *
 * The builder requires either an array of resources names or a map of the resources
 * specifying how to format their records for search results.
 *
 * If provided an array of resources, it will infer the records fields to use as
 * the content label and description:
 *
 * - label: Returns the record `label`, `name` or `title`
 * - description: Returns the record `description` or `body`
 *
 * If provided a map, each key being a resource name, the value can have the
 * following properties:
 *
 * - `label`: Either the field name to use as the label or a function which
 * will be called with a record and must return a string. Defaults to the
 * inference described above.
 * - `description`: Either the field name to use as the description or a
 * function which will be called with a record and must return a string.
 * Defaults to the inference described above.
 *
 * @example <caption>Example with an array of resources</caption>
 * import simpleRestProvider from 'ra-data-simple-rest';
 * import { addSearchMethod } from '@react-admin/ra-search';
 *
 * const dataProvider = simpleRestProvider('http://path.to.my.api/');
 *
 * const dataProviderWithSearch = addSearchMethod(dataProvider, ['artists', 'albums']);
 *
 * @example <caption>Example with a map of resources</caption>
 * import simpleRestProvider from 'ra-data-simple-rest';
 * import { addSearchMethod } from '@react-admin/ra-search';
 *
 * const dataProvider = simpleRestProvider('http://path.to.my.api/');
 *
 * const dataProviderWithSearch = addSearchMethod(dataProvider, {
 *     artists: {
 *         label: 'full_name',
 *         description: record => `${record.born_at}-${record.died_at} ${record.biography}`,
 *     },
 *     albums: {
 *         description: record => `${record.released_at.getFullYear()} by ${record.recordCompany}`,
 *     },
 * });
 *
 * @param dataProvider The dataProvider to augment
 * @param options The options, either a string array of resources names or a map of options where the key is the resource name
 */
export var addSearchMethod = function (dataProvider, options) {
    if (options === void 0) { options = {}; }
    var builderOptions = getBuilderOptions(options);
    var defaultTargets = getDefaultTargetsFromOptions(options);
    return __assign(__assign({}, dataProvider), { search: function (query, options) { return __awaiter(void 0, void 0, void 0, function () {
            var finalTargets, resultsByResource;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        finalTargets = (options && options.targets) || defaultTargets;
                        return [4 /*yield*/, Promise.all(finalTargets.map(function (resource) {
                                return searchInResource(dataProvider, resource, query, builderOptions[resource]);
                            }))];
                    case 1:
                        resultsByResource = _a.sent();
                        return [2 /*return*/, {
                                data: resultsByResource.reduce(function (acc, resultForResource) { return __spreadArrays(acc, resultForResource.data); }, []),
                                total: resultsByResource.reduce(function (acc, resultForResource) { return acc + resultForResource.total; }, 0),
                            }];
                }
            });
        }); } });
};
var getDefaultTargetsFromOptions = function (options) {
    if (Array.isArray(options)) {
        return options;
    }
    return Object.keys(options);
};
var getBuilderOptions = function (options) {
    if (Array.isArray(options)) {
        return buildOptionsFromArrayOfResources(options);
    }
    return options;
};
var buildOptionsFromArrayOfResources = function (resources) {
    return resources.reduce(function (acc, resource) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[resource] = {}, _a)));
    }, {});
};
var defaultGetLabel = function (record) {
    return record.label || record.name || record.title;
};
var defaultGetDescription = function (record) {
    return record.description || record.body;
};
var searchInResource = function (dataProvider, resource, query, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, data, total, _b, label, _c, description;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, dataProvider.getList(resource, {
                        filter: { q: query },
                        pagination: { page: 1, perPage: 10 },
                        sort: { field: 'id', order: 'ASC' },
                    })];
                case 1:
                    _a = _d.sent(), data = _a.data, total = _a.total;
                    _b = options.label, label = _b === void 0 ? defaultGetLabel : _b, _c = options.description, description = _c === void 0 ? defaultGetDescription : _c;
                    return [2 /*return*/, {
                            data: data.map(function (record) { return ({
                                id: resource + "/" + record.id,
                                type: resource,
                                url: "/" + resource + "/" + record.id,
                                content: {
                                    id: record.id,
                                    label: typeof label === 'string' ? record[label] : label(record),
                                    description: typeof description === 'string'
                                        ? record[description]
                                        : description(record),
                                },
                            }); }),
                            total: total,
                        }];
            }
        });
    });
};
