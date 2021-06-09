"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ra_data_fakerest_1 = __importDefault(require("ra-data-fakerest"));
var src_1 = require("../../src");
var dataProvider = ra_data_fakerest_1.default({
    categories: [
        { id: 1, name: 'Clothing', position: 0 },
        { id: 2, name: 'Men', parent_id: 1, position: 0 },
        { id: 3, name: 'Suits', parent_id: 2, position: 0 },
        { id: 4, name: 'Slacks', parent_id: 3, position: 0 },
        { id: 5, name: 'Jackets', parent_id: 3, position: 1 },
        { id: 6, name: 'Women', parent_id: 1, position: 1 },
        { id: 7, name: 'Dresses', parent_id: 6, position: 0 },
        { id: 8, name: 'Evening Gowns', parent_id: 7, position: 0 },
        { id: 9, name: 'Sun Dresses', parent_id: 7, position: 1 },
        { id: 10, name: 'Skirts', parent_id: 6, position: 1 },
        { id: 11, name: 'Blouses', parent_id: 6, position: 2 },
    ],
    products: [
        { id: 1, name: 'Cheap Tuxedo', category_id: 3 },
        { id: 2, name: 'Luxury Tuxedo', category_id: 3 },
        { id: 3, name: 'Windrunner jacket', category_id: 5 },
        { id: 4, name: 'Padded bomber jacket', category_id: 5 },
        { id: 5, name: 'Original bomber jacket', category_id: 5 },
        {
            id: 6,
            name: 'Extreme oversized jersey duster jacket',
            category_id: 5,
        },
        { id: 7, name: 'Washed jacket', category_id: 5 },
    ],
}, true);
var fixFakeRestDataProvider = function (dataProvider) { return (__assign(__assign({}, dataProvider), { getRootNodes: function (resource, params) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, data, total, filteredNodes;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, dataProvider.getRootNodes(resource, params)];
                case 1:
                    _a = _b.sent(), data = _a.data, total = _a.total;
                    filteredNodes = data.filter(function (node) { return typeof node.parent_id === 'undefined'; });
                    return [2 /*return*/, {
                            data: filteredNodes,
                            total: total,
                        }];
            }
        });
    }); }, getChildNodes: function (resource, params) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 2000); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, dataProvider.getChildNodes(resource, params)];
            }
        });
    }); } })); };
exports.default = fixFakeRestDataProvider(src_1.addTreeMethodsBasedOnParentAndPosition(dataProvider));